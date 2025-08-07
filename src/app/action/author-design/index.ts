"use server";

import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TAuthorDesign } from "./types";

// get all author design
export const getAuthorDesigns = async (authorId: string) => {
  return await mutate<TAuthorDesign[]>(async () => {
    return await fetchApi<TAuthorDesign>({
      endPoint: `/author-design/author/${authorId}`,
      method: "GET",
      tags: ["author-design"],
    });
  });
};

// get author design
export const getAuthorDesign = async (pipelineId: string) => {
  return await mutate<TAuthorDesign>(async () => {
    return await fetchApi<TAuthorDesign>({
      endPoint: `/author-design/${pipelineId}`,
      method: "GET",
      tags: ["author-design"],
    });
  });
};

// add design
export const addAuthorDesign = async (
  prevState: SubmitFormState<TAuthorDesign>,
  data: ExtractVariables<TAuthorDesign>,
) => {
  return await mutate<TAuthorDesign>(async () => {
    const result = await fetchApi<TAuthorDesign>({
      endPoint: `/author-design`,
      method: "POST",
      body: data,
    });
    revalidateTag("author-design");
    return result;
  });
};
