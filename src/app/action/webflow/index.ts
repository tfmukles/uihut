"use server";
import "server-only";

import { cache } from "react";
import { fetchApi, mutate } from "../utils";
import { TWebflowTheme, WebflowThemeCollection } from "./types";

export const getWebFlowThemes = cache(async () => {
  return await mutate<TWebflowTheme[]>(async () => {
    return await fetchApi({
      endPoint: "/webflow-theme?limit=100",
      method: "GET",
    });
  });
});

export async function getWebFlowAllNames() {
  return await mutate<Pick<TWebflowTheme, "slug" | "title">[]>(async () => {
    return await fetchApi({
      endPoint: "/webflow-theme/names",
      method: "GET",
    });
  });
}

export const getWebFlowThemeBySlug = cache(async (slug: string) => {
  return await mutate<WebflowThemeCollection>(async () => {
    return await fetchApi({
      endPoint: `/webflow-theme/${slug}`,
      method: "GET",
    });
  });
});

export default async function getTrendingWebflowThemes() {
  return await mutate<TWebflowTheme[]>(async () => {
    return await fetchApi({
      endPoint: "/webflow-page/trending",
      method: "GET",
    });
  });
}

export async function getWebflowPageById(id: string) {
  return await mutate<WebflowThemeCollection["pages"]["0"]>(async () => {
    return await fetchApi({
      endPoint: `/webflow-page/${id}`,
      method: "GET",
    });
  });
}

export async function getWebflowSectionById(id: string) {
  return await mutate<WebflowThemeCollection["sections"]["0"]>(async () => {
    return await fetchApi({
      endPoint: `/webflow-section/${id}`,
      method: "GET",
    });
  });
}
