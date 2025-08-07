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
import dateFormat from "@/lib/utils/dateFormat";
import { figmaLinkSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const InformationTab = ({ requirement }: { requirement: TDesignPipeline }) => {
  // add days to a date
  const futureDate = (date: Date, addDay: number) => {
    const modifiedDate = new Date(date);
    modifiedDate.setDate(modifiedDate.getDate() + addDay);
    return modifiedDate;
  };

  const [isLoading, startLoading] = useTransition();
  const [showForm, setShowForm] = useState(false);

  const figmaLinkForm = useForm<z.infer<typeof figmaLinkSchema>>({
    resolver: zodResolver(figmaLinkSchema),
    defaultValues: {
      figma: "",
    },
  });

  const { action } = useSubmitForm<TDesignPipeline>(updateDesignPipeline, {
    onSuccess: ({ message }) => {
      toast.success("Updated");
      setShowForm(false);
    },
  });

  return (
    <div className="content">
      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Overview
      </Heading>
      <p>{requirement?.description}</p>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Work Started
      </Heading>
      <p>{dateFormat(requirement?.work_start)}</p>

      <Heading level="h4" variant={"gradient"} className={"mb-2"}>
        Work End Date
      </Heading>
      <p>
        {dateFormat(
          futureDate(requirement?.work_start, requirement?.work_duration),
        )}
      </p>

      <Heading level="h4" className="mt-0">
        Project Figma Link
      </Heading>
      <div>
        {!showForm ? (
          <div className="flex items-center">
            <Link
              href={requirement?.figma}
              rel="noopener noreferrer"
              target="_blank"
            >
              {requirement?.figma}
            </Link>
            <Edit
              onClick={() => setShowForm(true)}
              className="h-3.5 w-8 cursor-pointer px-2"
            />
          </div>
        ) : (
          <FormProvider {...figmaLinkForm}>
            <form
              onSubmit={figmaLinkForm.handleSubmit(async (data) => {
                startLoading(async () => {
                  const res = await action({
                    pipeline_id: requirement?.pipeline_id,
                    figma: data.figma,
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
              <div className="space-x-2">
                <Button size={"lg"}>
                  {isLoading ? (
                    <>
                      Updating <Spinner className="size-5" />
                    </>
                  ) : (
                    "Update"
                  )}
                </Button>
                <Button
                  size={"lg"}
                  variant={"outline"}
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </FormProvider>
        )}
      </div>
    </div>
  );
};

export default InformationTab;
