"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { TCreateProductDownload, TDownload } from "./types";

export const getDownloadHistory = async (userId: string) => {
  return await mutate<TDownload>(async () => {
    return await fetchApi<TDownload>({
      endPoint: `/download-history/${userId}`,
      method: "GET",
      tags: ["downloads"],
    });
  });
};

// update download history function
export const updateDownloadHistory = async (
  user_id: string,
  package_name: string,
  product_type: string,
  product: TCreateProductDownload,
) => {
  const currentDate = new Date().toISOString();
  const data = mutate(async () => {
    return await fetchApi<TDownload>({
      endPoint: `/download-history/`,
      method: "POST",
      body: {
        user_id,
        package_name,
        product_type,
        current_date: currentDate,
        license: product.premium ? "premium" : "free",
        design: product_type === "design" ? product : undefined,
        webflow: product_type === "webflow" ? product : undefined,
      },
    });
  });

  revalidateTag("downloads");
  revalidatePath("/dashboard/downloads");

  return data;
};
