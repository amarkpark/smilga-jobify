import { getStatsAction } from "@/utils/actions"

async function AnalysisPage() {
  const stats = await getStatsAction();
  console.log("app/(dashboard)/analysis/page.tsx stats", stats);

  return (
    <div>
      <h1 className="text-3xl">AnalysisPage</h1>
    </div>
  )
}

export default AnalysisPage
