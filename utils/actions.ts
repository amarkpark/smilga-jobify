"use server";

import prisma from "./db";
import { auth } from "@clerk/nextjs/server";
import {
  JobType,
  CreateAndEditJobType, 
  createAndEditJobSchema 
} from "./types";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";

const { toast } = useToast();

function authenticateAndRiedirect(): string {
  const { userId } = auth();
  if (!userId) redirect("/");
  
  return userId;
};

export async function createJobAction(values: CreateAndEditJobType)
:Promise<JobType | null> {
  // Test of button states in dev
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const userId = authenticateAndRiedirect();

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
    toast({
      description: job.position + " created",
    })
    return job;
  } catch (error) {
    console.error(error);
    toast({
      description: "Error creating job",
      variant: "destructive",
    })
    return null;
  }
};