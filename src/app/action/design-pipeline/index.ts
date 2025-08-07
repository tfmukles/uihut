"use server";

import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TDesignPipeline } from "./types";

// get design pipelines
export const getDesignPipelines = async () => {
  return await mutate<TDesignPipeline[]>(async () => {
    return await fetchApi<TDesignPipeline>({
      endPoint: `/design-pipeline?status=open`,
      method: "GET",
    });
  });
};

// get design pipeline by author id
export const getDesignPipelineByAuthor = async (id: string) => {
  return await mutate<TDesignPipeline[]>(async () => {
    return await fetchApi<TDesignPipeline[]>({
      endPoint: `/design-pipeline/author/${id}`,
      method: "GET",
      tags: ["design-pipeline"],
    });
  });
};

// get single design pipeline
export const getDesignPipeline = async (id: string) => {
  return await mutate<TDesignPipeline>(async () => {
    return await fetchApi<TDesignPipeline>({
      endPoint: `/design-pipeline/${id}`,
      method: "GET",
    });
  });
};

// update single design pipeline
export const updateDesignPipeline = async (
  prevState: SubmitFormState<TDesignPipeline>,
  data: ExtractVariables<TDesignPipeline>,
): Promise<SubmitFormState<TDesignPipeline>> => {
  return await mutate<TDesignPipeline>(async () => {
    const result = await fetchApi<TDesignPipeline>({
      endPoint: `/design-pipeline/${data.pipeline_id}`,
      method: "PATCH",
      body: data,
    });
    revalidateTag("design-pipeline");
    return result;
  });
};
