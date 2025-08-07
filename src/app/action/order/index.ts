"use server";

import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { TOrder } from "./types";

// get orders
export const getOrders = async (userId: string) => {
  return await mutate<TOrder[]>(async () => {
    return await fetchApi<TOrder>({
      endPoint: `/order/${userId}`,
      method: "GET",
      tags: ["orders"],
    });
  });
};

// revalidate orders
export const revalidateOrders = async (tag: string) => {
  revalidateTag(tag);
};
