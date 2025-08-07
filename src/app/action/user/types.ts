import { changePasswordSchema } from "@/lib/validate";
import { z } from "zod";
export enum UserStatusType {
  ACTIVE = "active",
  RESTRICTED = "restricted",
}

export type TUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image: string;
  country: string;
  state: string;
  createdAt: string;
  status: UserStatusType;
};

export type TUserUpdate = TUser & {
  variables: { userData: Partial<TUser> };
};

export type TUpdatePassword = {
  variables: z.infer<typeof changePasswordSchema> & {
    user_id?: string;
  };
};

export type TSaveProfilePicture = {
  variables: FormData;
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string;
  acl: string;
  contentType: string | null;
  contentDisposition: string | null;
  contentEncoding: string | null;
  storageClass: string;
  serverSideEncryption: string | null;
  location: string;
  etag: string;
};

export type TUserPersona = {
  user_id: string;
  image: string;
  gender: string;
  profession: string;
  company_size: string;
  usage: string;
  projects: string[];
  preferences: string[];
  purchase_reason: string;
  channel: string;
  website: string;
  website_type: string;
  social_medias: string[];
  variables: Omit<Partial<TUserPersona>, "variables">;
};
