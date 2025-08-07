"use server";
import "server-only";

import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";

export const redeemCode = async (
  prevState: SubmitFormState<TRedeem>,
  data: ExtractVariables<TRedeem>,
) => {
  return mutate<TRedeem>(async () => {
    return await fetchApi<TRedeem>({
      endPoint: "/redeem/redeem-code",
      method: "POST",
      body: data,
      cache: "no-cache",
    });
  });
};
