"use server";
import "server-only";

import { revalidateTag } from "next/cache";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TAccessToken } from "./type";

export const createAccessToken = async (
  prevState: SubmitFormState<TAccessToken>,
  data: ExtractVariables<TAccessToken>,
): Promise<SubmitFormState<TAccessToken>> => {
  return await mutate<TAccessToken>(async () => {
    const accessToken = await fetchApi<TAccessToken>({
      endPoint: "/access-token/",
      method: "POST",
      body: data,
    });
    revalidateTag("access-token");
    return accessToken;
  });
};

export const getAccessToken = async (userId: string) => {
  return await mutate<TAccessToken>(async () => {
    return await fetchApi<TAccessToken>({
      endPoint: `/access-token/${userId}`,
      method: "GET",
      cache: "no-cache",
      tags: ["access-token"],
    });
  });
};

export const deleteAccessToken = async (userId: string, tokenName: string) => {
  return await mutate<TAccessToken>(async () => {
    const res = await fetchApi<TAccessToken>({
      endPoint: `/access-token/${userId}/${tokenName}`,
      method: "PATCH",
      cache: "no-cache",
      tags: ["access-token"],
    });
    revalidateTag("access-token");
    return res;
  });
};
