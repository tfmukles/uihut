"use server";

import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TAuthor, UpdateAuthor } from "./types";

export const getAuthor = async (authorId: string) => {
  return await mutate<TAuthor>(async () => {
    return await fetchApi<TAuthor>({
      endPoint: `/author/${authorId}`,
      method: "GET",
      tags: ["author"],
    });
  });
};

export const updateAuthor = async (
  prevState: SubmitFormState<UpdateAuthor>,
  data: ExtractVariables<UpdateAuthor>,
): Promise<SubmitFormState<UpdateAuthor>> => {
  return await mutate<UpdateAuthor>(async () => {
    return await fetchApi<UpdateAuthor>({
      endPoint: `/author/${data.author_id}`,
      method: "PATCH",
    });
  });
};
