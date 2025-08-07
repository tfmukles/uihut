"use server";

import { auth } from "@/auth";
import { API_URL, TOKEN } from "@/lib/constant";
import { CustomApiError } from "@/lib/utils/error";
import "server-only";
import { ExtractVariables, HttpMethod, SubmitFormState } from "./types";

export async function fetchApi<T>({
  endPoint,
  cache = "reload",
  headers = {},
  tags = [],
  body,
  method = "GET",
  signal,
  credentials = true,
}: {
  endPoint: string;
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  body?: ExtractVariables<T> | FormData;
  method?: HttpMethod;
  signal?: AbortSignal;
  credentials?: boolean;
}): Promise<{ status: number; body: Omit<T, "variables"> }> {
  try {
    let accessToken;

    if (credentials) {
      const session = await auth();
      accessToken = session?.user.accessToken;
    }

    const headersObj = {
      "Content-Type": "application/json",
      ...(accessToken && {
        authorization: `Bearer ${accessToken}`,
      }),

      authorization_token: `Bearer ${TOKEN}`,
      ...headers,
    };

    if (body instanceof FormData) {
      // @ts-ignore
      delete headersObj["Content-Type"];
    }

    const requestBody =
      body instanceof FormData
        ? body
        : typeof body === "string"
          ? body
          : JSON.stringify(body);

    const result = await fetch(API_URL + endPoint, {
      method,
      headers: headersObj,
      ...(method !== "GET" && { body: requestBody }),
      cache,
      ...(tags.length > 0 && { next: { tags } }),
      ...(signal && { signal }),
    });

    const contentType = result.headers.get("content-type");

    let responseBody;
    if (contentType && contentType.includes("application/json")) {
      responseBody = await result.json();
    } else if (contentType && contentType.includes("text/")) {
      responseBody = await result.text();
    } else {
      responseBody = await result.blob();
    }

    if (!result.ok) {
      const customError = new CustomApiError(
        result.status,
        responseBody?.message,
        responseBody?.errorMessage ?? [],
      );
      throw customError;
    }

    return {
      status: result.status,
      body: responseBody,
    };
  } catch (error) {
    throw error;
  }
}

export async function mutate<T>(
  callback: () => Promise<any>,
): Promise<SubmitFormState<T>> {
  try {
    const { body, status } = (await callback()) || {};
    return {
      data: body?.result as T,
      error: [],
      message: body?.message,
      isError: false,
      isSuccess: true,
      statusCode: status,
    };
  } catch (err) {
    if (err instanceof CustomApiError) {
      return {
        data: null,
        isError: true,
        isSuccess: false,
        error: err.errorMessage,
        message: err.message,
        statusCode: err.statusCode,
      };
    }

    if (err instanceof Error) {
      return {
        data: null,
        isError: true,
        isSuccess: false,
        error: [],
        message: err.message,
        statusCode: 500,
      };
    }

    return {
      data: null,
      isError: true,
      isSuccess: false,
      error: [],
      message: "Something went wrong",
      statusCode: 500,
    };
  }
}

export const getCountries = async () => {
  const countries = await fetch(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      cache: "force-cache",
    },
  );
  return await countries.json();
};
