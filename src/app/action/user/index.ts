"use server";

import { changePasswordSchema } from "@/lib/validate";
import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import {
  TSaveProfilePicture,
  TUpdatePassword,
  TUser,
  TUserUpdate,
} from "./types";

export const getUserDetails = async (userId: string) => {
  return await mutate<TUser>(async () => {
    return await fetchApi<TUser>({
      endPoint: `/user/${userId}`,
      method: "GET",
      tags: ["user-details"],
    });
  });
};

export const updateUser = async (
  prevState: SubmitFormState<TUserUpdate> | null,
  data: ExtractVariables<TUserUpdate>,
): Promise<SubmitFormState<TUserUpdate>> => {
  return await mutate<TUser>(async () => {
    const user = await fetchApi<TUserUpdate>({
      endPoint: `/user/update/${data.userData.id}`,
      method: "PATCH",
      body: data,
    });
    revalidateTag("user-details");
    return user;
  });
};

export const updatePasswordByOldPass = async (
  prevState: SubmitFormState<TUpdatePassword>,
  data: ExtractVariables<TUpdatePassword>,
) => {
  const parsed = changePasswordSchema.safeParse(data);
  if (!parsed.success) {
    return {
      data: null,
      error: [],
      message: "Invalid form data",
      isError: true,
      isSuccess: false,
      statusCode: 500,
    };
  }

  return await mutate<TUpdatePassword>(async () => {
    return await fetchApi<TUpdatePassword>({
      endPoint: `/authentication/update-password`,
      method: "PATCH",
      body: {
        ...data,
      },
    });
  });
};

export const saveProfilePicture = async (
  prevState: SubmitFormState<TSaveProfilePicture>,
  data: ExtractVariables<TSaveProfilePicture>,
) => {
  const response = await mutate<TSaveProfilePicture>(async () => {
    return await fetchApi<TSaveProfilePicture>({
      endPoint: "/bucket/upload",
      method: "POST",
      body: data,
    });
  });

  if (!response?.data?.key) return response;
  const key = response?.data.key;
  return await updateUser(null, {
    userData: {
      image: key,
      id: data.get("id") as string,
    },
  });
};
