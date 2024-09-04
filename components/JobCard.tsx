import { JobType } from "@/utils/types";
import { MapPin, Briefcase, CalendarDays, RadioTower } from "lucide-react";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import JobDetail from "./JobDetail";
import DeleteJobButton from "./DeleteJobButton";

function JobCard({ job }: { job: JobType }) {
  const date = new Date(job.createdAt).toLocaleDateString();

  return (
    <Card className="bg-muted">
      <input hidden data-id={job.id} data-uid={job.clerkId} />
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="mt-4 grid grid-cols-2 gap-4">
        <JobDetail icon={<Briefcase />} text={job.mode} />
        <JobDetail icon={<MapPin />} text={job.location} />
        <JobDetail icon={<CalendarDays />} text={date} />
        <Badge className="w-32 justify-center">
          <JobDetail icon={<RadioTower className="h-4 w-4"/>} text={job.status} />
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobButton id={job.id} />
      </CardFooter>
    </Card>
  )
}

export default JobCard