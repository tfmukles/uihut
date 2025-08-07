"use client";

import { updateDesignPipeline } from "@/actions/design-pipeline";
import { TDesignPipeline } from "@/actions/design-pipeline/types";
import { Button } from "@/components/ui/button";
import { useSubmitForm } from "@/hooks/useSubmit";
import { useState } from "react";

const DesignSubmitRequest = ({
  pipelineId,
  status,
}: {
  pipelineId: string;
  status: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { action } = useSubmitForm<TDesignPipeline>(updateDesignPipeline);

  // handle submit for review
  const handleSubmitForReview = async () => {
    setIsLoading(true);
    const result = await action({
      pipeline_id: pipelineId!,
      status: "in-review",
    });
    if (result.isSuccess) {
      setIsLoading(false);
    }
  };

  return (
    <>
      {status === "in-progress" ? (
        <Button disabled={isLoading} onClick={handleSubmitForReview}>
          {isLoading ? "Submitting..." : "Submit for Review"}
        </Button>
      ) : (
        <Button disabled={true}>Submitted for Review</Button>
      )}
    </>
  );
};

export default DesignSubmitRequest;
