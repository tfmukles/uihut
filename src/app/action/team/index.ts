"use server";

import { revalidateTag } from "next/cache";
import "server-only";
import { fetchApi, mutate } from "../utils";
import { ExtractVariables, SubmitFormState } from "../utils/types";
import { TTeam } from "./types";

export const getTeam = async (ownerId: string) => {
  return await mutate<TTeam>(async () => {
    return await fetchApi<TTeam>({
      endPoint: `/team/${ownerId}`,
      method: "GET",
      tags: ["team"],
    });
  });
};

export const getTeamByMemberId = async (memberId: string) => {
  return await mutate<TTeam & { owner: any }>(async () => {
    return await fetchApi<TTeam & { owner: any }>({
      endPoint: `/team/member/${memberId}`,
      method: "GET",
      tags: ["team"],
    });
  });
};

export const addTeamMember = async (
  prevState: SubmitFormState<TTeam>,
  data: ExtractVariables<TTeam>,
): Promise<SubmitFormState<TTeam>> => {
  return await mutate<TTeam>(async () => {
    const result = await fetchApi<TTeam>({
      endPoint: `/team/add-member`,
      method: "PATCH",
      body: data,
    });
    revalidateTag("team");
    return result;
  });
};

export const removeTeamMember = async (
  owner_id: string,
  member_email: string,
): Promise<SubmitFormState<TTeam>> => {
  return await mutate<TTeam>(async () => {
    const result = await fetchApi<TTeam>({
      endPoint: `/team/remove-member`,
      method: "PATCH",
      body: {
        owner_id,
        member_email,
      },
    });
    revalidateTag("team");
    return result;
  });
};
