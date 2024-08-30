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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get("search") as string;
    const searchedJobStatus = formData.get("job-status") as string;
    console.log("submitting search", search, searchedJobStatus);
  }
  return (
    <form 
      className="bg-muted mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input type="text" placeholder="Search Jobs" name="search" />
      <Select
        onValueChange={(value) => console.log(value)}
        defaultValue={JobStatus.Applied}
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
