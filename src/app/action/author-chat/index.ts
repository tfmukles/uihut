"use server";

import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TAuthorChat } from "./types";

export const getAuthorChat = async (pipelineId: string) => {
  return await mutate<TAuthorChat>(async () => {
    return await fetchApi<TAuthorChat>({
      endPoint: `/author-chat/${pipelineId}`,
      method: "GET",
      tags: ["author-chat"],
    });
  });
};

// add comment
export const addAuthorComment = async (
  prevState: SubmitFormState<TAuthorChat>,
  data: ExtractVariables<TAuthorChat>,
): Promise<SubmitFormState<TAuthorChat>> => {
  return await mutate<TAuthorChat>(async () => {
    const result = await fetchApi<TAuthorChat>({
      endPoint: `/author-chat/${data.pipeline_id}`,
      method: "PATCH",
      body: data,
    });
    revalidateTag("author-chat");
    return result;
  });
};
