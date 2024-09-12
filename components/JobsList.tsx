"use client";

import JobCard from "./JobCard";
import PaginationBar from "./PaginationBar";
import { useSearchParams } from "next/navigation";
import { getAllJobsAction } from "@/utils/actions";
import { useQuery } from "@tanstack/react-query";

function JobsList() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const jobStatus = searchParams.get("jobStatus") || "all";

  const pageNumber = Number(searchParams.get("page")) || 1;

  const { data, isPending } = useQuery({
    queryKey: ["jobs", search, jobStatus, pageNumber],
    queryFn: () => getAllJobsAction({search, jobStatus, page: pageNumber}),
  })

  const jobs = data?.jobs || [];

  const count = data?.count || 0;
  const page = data?.page || 0;
  const totalPages = data?.totalPages || 0;

  console.log("components/JobsList.tsx count: ", count);
  console.log("components/JobsList.tsx page: ", page);
  console.log("components/JobsList.tsx totalPages: ", totalPages);

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
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-semibold">{count} Jobs</h2>
      <PaginationBar currentPage={page} totalPages={totalPages} />
    </div>
    <div className="grid md:grid-cols-2 gap-8">
      {jobs.map((job) => {
        return <JobCard key={job.id} job={job} />
      })}
    </div>
  </>
}

export default JobsList