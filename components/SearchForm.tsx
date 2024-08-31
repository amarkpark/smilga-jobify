"use client";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/utils/types";

function SearchForm() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") as string || "";
  const jobStatus = searchParams.get("searchedJobStatus") as JobStatus || "all";

  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let params = new URLSearchParams();

    const formData = new FormData(event.currentTarget);
    const search = formData.get("search") as string;
    const searchedJobStatus = formData.get("job-status") as string;
    console.log("submitting search:", search, searchedJobStatus);
    params.set("search", search);
    params.set("jobStatus", searchedJobStatus);
    console.log(params.toString());

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form 
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Search Jobs"
        name="search" 
        defaultValue={search}
      />
      <Select
        onValueChange={(value) => console.log(value)}
        defaultValue={jobStatus}
        name="job-status"
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {
            ["all", ...Object.values(JobStatus)].map((searchedJobStatus) => {
              return (
                <SelectItem key={searchedJobStatus} value={searchedJobStatus}>
                  {searchedJobStatus}
                </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit" name="submit-search">Search</Button>
    </form>
  )
}

export default SearchForm
