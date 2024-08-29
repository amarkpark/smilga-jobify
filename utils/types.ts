import { Control } from "react-hook-form";
import * as z from "zod";

export type JobType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
  position: string;
  company: string;
  location: string;
  status: string;
  mode: string;
};

export enum JobStatus {
  Applied = "applied",
  InitialInterview = "initial interview",
  TechInterview = "tech interview",
  FinalInterview = "final interview",
  Offer = "offer",
  Rejected = "rejected",
}

export enum JobMode {
  FullTime = "full-time",
  PartTime = "part-time",
  Contract = "contract",
  Internship = "internship",
}

export const createAndEditJobSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  status: z.nativeEnum(JobStatus),
  mode: z.nativeEnum(JobMode),
});

export type GetAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number;
  limit?: number;
}

export type CreateAndEditJobType = z.infer<typeof createAndEditJobSchema>;

export type CustomFormFieldProps = {
  name: string;
  control: Control<any>;
};

export type CustomFormSelectProps = {
  name: string;
  control: Control<any>;
  items: string[];
  labelText: string;
};