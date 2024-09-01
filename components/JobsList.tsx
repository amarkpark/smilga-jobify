"use client";

import { JobStatus } from "@/utils/types";
import JobCard from "./JobCard";
import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";

function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") as string || "";
  const jobStatus = searchParams.get("searchedJobStatus") as JobStatus || "all";

  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({search, jobStatus, page: pageNumber}),
  })

  const jobs = data?.jobs || [];

  if (isPending) {
    return (
      <h1 className="text-3xl">
        Loading...
      </h1>
    )
  }

  if (jobs.length < 1) {
    return (
      <h1 className="text-3xl">
        No jobs found.
      </h1>
    )
  }

  return <>
    {/* button container */}
    <div className="grid md:grid-cols-2 gap-8">
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />
      })}
    </div>
  </>
}

export default JobsList