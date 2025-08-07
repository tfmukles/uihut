"use server";

import "server-only";
import { fetchApi, mutate } from "../utils";
import { TDesign } from "./types";

// get products
export const getDesigns = async (params: string, signal?: boolean) => {
  const abortController = new AbortController();
  if (signal) {
    abortController.abort();
  }
  return await mutate<TDesign[]>(async () => {
    return await fetchApi<TDesign>({
      endPoint: `/design?${params}`,
      method: "GET",
      signal: abortController.signal,
    });
  });
};

// get recent products
export const getRecentDesigns = async () => {
  return await mutate<TDesign[]>(async () => {
    return await fetchApi<TDesign>({
      endPoint: `/design/recent`,
      method: "GET",
    });
  });
};

// get trending products
export const getTrendingDesigns = async () => {
  return await mutate<TDesign[]>(async () => {
    return await fetchApi<TDesign>({
      endPoint: `/design/trending`,
      method: "GET",
    });
  });
};

// get handpicked products
export const getHandpickedDesigns = async () => {
  return await mutate<TDesign[]>(async () => {
    return await fetchApi<TDesign>({
      endPoint: `/design/handpicked`,
      method: "GET",
    });
  });
};

// get product by category
export const getDesignsByCategory = async (category: string) => {
  return await mutate<TDesign[]>(async () => {
    return await fetchApi<TDesign>({
      endPoint: `/design/category/${category}`,
      method: "GET",
      cache: "force-cache",
    });
  });
};

// get single product
export const getSingleDesign = async (id: string) => {
  return await mutate<TDesign>(async () => {
    return await fetchApi<TDesign>({
      endPoint: `/design/${id}`,
      method: "GET",
    });
  });
};

// get design categories
export const getDesignCategories = async () => {
  return await mutate<any[]>(async () => {
    return await fetchApi<any>({
      endPoint: `/design/categories`,
      method: "GET",
      cache: "force-cache",
      credentials: false,
    });
  });
};

// update product views
export const updateDesignViews = async (id: string) => {
  return await fetchApi<TDesign>({
    endPoint: `/design/view/${id}`,
    method: "PATCH",
  });
};

// get design file as blob to copy
export const getDesignFileBlob = async (key: string) => {
  return await mutate(async () => {
    const blob = await fetchApi({
      method: "GET",
      endPoint: `/bucket/fetch/${key}`,
      cache: "no-store",
    });

    const text =
      typeof blob.body === "string"
        ? blob.body
        : await (blob.body as any).text();
    return { ...blob, body: { ...blob.body, result: text } };
  });
};
