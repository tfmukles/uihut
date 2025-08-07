"use client";

import { updateDesignPipeline } from "@/actions/design-pipeline";
import { TDesignPipeline } from "@/actions/design-pipeline/types";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { useSubmitForm } from "@/hooks/useSubmit";
import { figmaLinkSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const ApplyForm = ({
  pipelineId,
  authorId,
}: {
  pipelineId: string;
  authorId: string;
}) => {
  const [isLoading, startLoading] = useTransition();
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const figmaLinkForm = useForm<z.infer<typeof figmaLinkSchema>>({
    resolver: zodResolver(figmaLinkSchema),
    defaultValues: {
      figma: "",
    },
  });

  const { action } = useSubmitForm<TDesignPipeline>(updateDesignPipeline, {
    onSuccess: ({ message }) => {
      toast.success("Applied for the project");
      setShowForm(false);
      router.replace("/author/ongoing-project");
    },
  });

  return (
    <div className="mt-6 border-t border-border pt-8">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>Apply For The Project</Button>
      ) : (
        <FormProvider {...figmaLinkForm}>
          <Heading level="h4" className="mt-0">
            Add A Figma Link
          </Heading>
          <p>
            Create a new figma file where you will work on the project and add
            the link
          </p>
          <form
            onSubmit={figmaLinkForm.handleSubmit(async (data) => {
              startLoading(async () => {
                const res = await action({
                  pipeline_id: pipelineId,
                  author_id: authorId,
                  figma: data.figma,
                  status: "in-progress",
                  work_start: new Date(),
                });
              });
            })}
          >
            <fieldset className="mb-4">
              <FormField
                control={figmaLinkForm.control}
                name={"figma"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="figma">Figma Link*</FormLabel>
                    <FormControl>
                      <FormInput
                        {...field}
                        type="text"
                        id="figma"
                        placeholder="https://figma.com/YOUR-PROJECT-ID"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            <div>
              <Button size={"lg"}>
                {isLoading ? (
                  <>
                    Please wait <Spinner className="size-5" />
                  </>
                ) : (
                  "Start Design"
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ApplyForm;
