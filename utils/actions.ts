"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import {
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

    const jobs: JobType[] = await prisma.job.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      }
    })

    return {
      jobs,
      count: 0,
      page: 1,
      totalPages: 1,
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
    redirect('/jobs');
  }

  return job;
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