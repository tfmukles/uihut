"use server";

import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables } from "../utils/types";
import { TQuiz } from "./types";

export const createQuiz = async (data: ExtractVariables<TQuiz>) => {
  return mutate<TQuiz>(async () => {
    return await fetchApi<TQuiz>({
      endPoint: "/quiz",
      method: "POST",
      body: data,
      cache: "no-cache",
    });
  });
};

export const getQuiz = async (id: string) => {
  return await mutate<TQuiz>(async () => {
    return await fetchApi<TQuiz>({
      endPoint: `/quiz/${id}`,
      method: "GET",
      cache: "force-cache",
    });
  });
};
