import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Skeleton } from "./ui/skeleton";

type StatsCardsProps = {
  title: string;
  value: number;
};

function StatsCards({ title, value }: StatsCardsProps) {
  return (
    <Card className="bg-muted">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="capitalize">{title}</CardTitle>
        <CardDescription className="text-4xl font-extrabold text-primary mt-[0px!important]">
          {value}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export function StatsLoadingCard() {
  return (
    <Card className="w-[330px] h-[88px]">
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default StatsCards;