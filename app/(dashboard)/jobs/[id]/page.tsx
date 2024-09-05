// import { getSingleJobAction } from "@/utils/actions"

// const JobDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
//   const job = await getSingleJobAction(id);

//   return (
//     <div>
//       JobDetailPage {job?.position}
//     </div>
//   )
// }

// export default JobDetailPage

// @TODO: make sure you learn all of the page elements you didn't think about

import EditJobForm from "@/components/EditJobForm";
import { getSingleJobAction } from "@/utils/actions";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

async function JobDetailPage({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["job", params.id],
    queryFn: () => getSingleJobAction(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditJobForm jobId={params.id} />
    </HydrationBoundary>
  );
}
export default JobDetailPage;