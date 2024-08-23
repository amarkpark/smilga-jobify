import CreateJobForm from "@/components/CreateJobForm"
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

function AddJobPage() {
  const queryClient = new QueryClient();

  return (
    // following is a workaround for error:
    // Unexpected token `HydrationBoundary`. Expected jsx identifier
    // @ts-ignore
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateJobForm />
    </HydrationBoundary>
  );
}

export default AddJobPage;