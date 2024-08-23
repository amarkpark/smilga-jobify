"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from "@/utils/types";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CustomFormField, CustomFormSelect } from "./FormComponents";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobAction } from "@/utils/actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
function CreateJobForm() {
  // 1. Define your form.
  const form = useForm<CreateAndEditJobType>({
    resolver: zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: "",
      company: "",
      location: "",
      status: JobStatus.Applied,
      mode: JobMode.FullTime,
    },
  });

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  
  const { mutate, isPending } = useMutation({
    mutationFn: (values: CreateAndEditJobType) => createJobAction(values),
    onSuccess: (data) => {
      if (!data) {
        toast({
          description: "Error creating job",
          variant: "destructive",
        });
        return;
      }
      toast({
        description: data?.position + " created",
      });

      queryClient.invalidateQueries({queryKey: ["jobs"]});
      queryClient.invalidateQueries({queryKey: ["stats"]});
      queryClient.invalidateQueries({queryKey: ["charts"]});

      // form.reset(); doesn't reset the `<select>`s
      router.push("/jobs");
    },
  });

  function onSubmit(values: CreateAndEditJobType) {
    console.log("CreateJobForm onSubmit",values);
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted p-8 rounded"
      >
        <h2 className="capitalize font-semibold text-4xl mb-6">add job</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 items-start">
          {/* position */}
          <CustomFormField name="position" control={form.control} />

          {/* company */}
          <CustomFormField name="company" control={form.control} />

          {/* location */}
          <CustomFormField name="location" control={form.control} />

          {/* job status */}
          <CustomFormSelect
            name="status"
            control={form.control}
            labelText="job status"
            items={Object.values(JobStatus)}
          />

          {/* job  type */}
          <CustomFormSelect
            name="mode"
            control={form.control}
            labelText="job mode"
            items={Object.values(JobMode)}
          />

          <Button
            className="self-end capitalize"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "pending..." : "create job"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateJobForm;