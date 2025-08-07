"use server";

import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TFigmaToken } from "./type";

export const createFigmaToken = async (
  prevState: SubmitFormState<TFigmaToken>,
  data: ExtractVariables<TFigmaToken>,
): Promise<SubmitFormState<TFigmaToken>> => {
  return await mutate<TFigmaToken>(async () => {
    const figmaToken = await fetchApi<TFigmaToken>({
      endPoint: "/figma-token/",
      method: "POST",
      body: data,
    });
    revalidateTag("figma-token");
    return figmaToken;
  });
};
