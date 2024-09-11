"use client";
import { useQuery } from "@tanstack/react-query";
import { getStatsAction } from "@/utils/actions";
import { JobStatus } from "@/utils/types";
import StatsCard from "./StatsCard";

function StatsContainer() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  return (
    <div className="grid md:grid-cols-2 gap-4 lg:grid-cols-3 md:mb-8 sm:mb-4">
      <StatsCard title={JobStatus.Applied} value={data?.[JobStatus.Applied] || 0} />
      <StatsCard title={JobStatus.InitialInterview} value={data?.[JobStatus.InitialInterview] || 0} />
      <StatsCard title={JobStatus.TechInterview} value={data?.[JobStatus.TechInterview] || 0} />
      <StatsCard title={JobStatus.FinalInterview} value={data?.[JobStatus.FinalInterview] || 0} />
      <StatsCard title={JobStatus.Offer} value={data?.[JobStatus.Offer] || 0} />
      <StatsCard title={JobStatus.Rejected} value={data?.[JobStatus.Rejected] || 0} />
    </div>
  );
}

export default StatsContainer;