"use server";

import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TUserPersona } from "./types";

export const userPersona = async (userId: string) => {
  return await mutate<TUserPersona>(async () => {
    return await fetchApi<TUserPersona>({
      endPoint: `/user-persona/public/${userId}`,
      method: "GET",
    });
  });
};

export const createPersona = async (
  prevState: SubmitFormState<TUserPersona>,
  data: ExtractVariables<TUserPersona>,
): Promise<SubmitFormState<TUserPersona>> => {
  return await mutate<TUserPersona>(async () => {
    return await fetchApi<TUserPersona>({
      endPoint: `/user-persona/`,
      method: "POST",
      body: data,
    });
  });
};
