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
  return (
    <Card className="bg-muted">
      <CardHeader>
        <CardTitle>{job.position}</CardTitle>
        <CardDescription>{job.company}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent></CardContent>
      <CardFooter className="flex gap-4">
        <Button asChild size="sm">
          <Link href={`/jobs/${job.id}`}>Edit</Link>
        </Button>
        <DeleteJobButton job={job} />
      </CardFooter>
    </Card>
  )
}

export default JobCard