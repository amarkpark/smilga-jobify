"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import {
  JobStatus,
  JobType,
  GetAllJobsActionTypes,
  CreateAndEditJobType, 
  createAndEditJobSchema 
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";

function authenticateAndRedirect(): string {
  const { userId } = auth();
  if (!userId) redirect("/");
  
  return userId;
};

export async function createJobAction(values: CreateAndEditJobType)
:Promise<JobType | null> {
  // Test of button states in dev
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const userId = authenticateAndRedirect();

  try {
    // values already validated on front end
    // this is secondary validation for the back end
    createAndEditJobSchema.parse(values);
    console.log("prisma client", prisma);
    console.log("values to pass into prisma", values);

    const job:JobType = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId,
      },
    });
    console.log("job returned",job);
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function getAllJobsAction({
  search, jobStatus, page=1, limit=20
}: GetAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedirect();
  console.log("getAllJobsAction jobStatus: ", jobStatus);

  try {
    let whereClause: Prisma.JobWhereInput = {
      clerkId: userId,
    };

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          {
            position: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            company: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            location: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (jobStatus && jobStatus !== "all") {
      whereClause = {
        ...whereClause,
        status: jobStatus,
      };
    }

    console.log("getAllJobsAction whereClause: ", whereClause);

    const skip = (page - 1) * limit;

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      }
    });

    const count: number = await prisma.job.count({
      where: whereClause,
    });

    const totalPages: number = Math.ceil(count / limit);

    return {
      jobs,
      count,
      page: 1,
      totalPages,
    }
  } catch (error) {
    console.error(error);
    return {
      jobs: [],
      count: 0,
      page: 1,
      totalPages: 0,
    }
  }
};

export async function getSingleJobAction(id: string): Promise<JobType | null> {
  let job: JobType | null = null;
  const userId = authenticateAndRedirect();

  try {
    job = await prisma.job.findUnique({
      where: {
        id,
        clerkId: userId,
      },
    });
  } catch (error) {
    console.error(error);
    job = null;
  }

  if (!job) {
    redirect("/jobs");
  }

  return job;
}

export async function updateJobAction(
  id: string,
  values: CreateAndEditJobType
): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.update({
      where: {
        id,
        clerkId: userId,
      },
      data: {
        ...values,
      },
    });
    return job;
  } catch (error) {
    return null;
  }
}

export async function deleteJobAction(id: string): Promise<JobType | null> {
  const userId = authenticateAndRedirect();

  try {
    const job: JobType = await prisma.job.delete({
      where: {
        id,
        clerkId: userId,
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getStatsAction(): Promise<{
  [JobStatus.Applied]: number;
  [JobStatus.InitialInterview]: number;
  [JobStatus.TechInterview]: number;
  [JobStatus.FinalInterview]: number;
  [JobStatus.Offer]: number;
  [JobStatus.Rejected]: number;
}> {
  const userId = authenticateAndRedirect();
  // just to show Skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  try {
    const stats = await prisma.job.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
      where: {
        clerkId: userId, // replace userId with the actual clerkId
      },
    });

    console.log("getStatsAction stats", stats);

    const statsObject = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.status;
      return acc;
    }, {} as Record<string, number>);
    console.log("getStatsAction statsObject", statsObject);

    const defaultStats = {
      [JobStatus.Applied]: 0,
      [JobStatus.InitialInterview]: 0,
      [JobStatus.TechInterview]: 0,
      [JobStatus.FinalInterview]: 0,
      [JobStatus.Offer]: 0,
      [JobStatus.Rejected]: 0,
      ...statsObject,
    };

    console.log("getStatsAction defaultStats", defaultStats);
    return defaultStats;
  } catch (error) {
    console.error(error);
    redirect("/jobs");
  }
}

export async function getChartsDataAction(): Promise<
  Array<{ date: string; count: number }>
> {
  const userId = authenticateAndRedirect();
  const sixMonthsAgo = dayjs().subtract(6, "month").toDate();
  try {
    const jobs = await prisma.job.findMany({
      where: {
        clerkId: userId,
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    let applicationsPerMonth = jobs.reduce((acc, job) => {
      const date = dayjs(job.createdAt).format("MMM YY");

      const existingEntry = acc.find((entry) => entry.date === date);

      if (existingEntry) {
        existingEntry.count += 1;
      } else {
        acc.push({ date, count: 1 });
      }

      return acc;
    }, [] as Array<{ date: string; count: number }>);

    // console.log("getChartsDataAction jobs", jobs);
    console.log("getChartsDataAction applicationsPerMonth", applicationsPerMonth);

    return applicationsPerMonth;
  } catch (error) {
    redirect("/jobs");
  }
}