import ChartsContainer from "@/components/ChartsContainer";
import StatsContainer from "@/components/StatsContainer";
import { getStatsAction, getChartsDataAction } from "@/utils/actions"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function AnalysisPage() {
  const queryClient = new QueryClient();

  // const chartData = await getChartsDataAction();
  // console.log("app/(dashboard)/analysis/page.tsx data", chartData);

  // const stats = await getStatsAction();
  // console.log("app/(dashboard)/analysis/page.tsx stats", stats);

  await queryClient.prefetchQuery({
    queryKey: ['stats'],
    queryFn: () => getStatsAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['charts'],
    queryFn: () => getChartsDataAction(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StatsContainer />
      <ChartsContainer />
    </HydrationBoundary>
  );
}

export default AnalysisPage
