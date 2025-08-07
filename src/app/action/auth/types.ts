import { loginSchema, otpSchema, registerSchema } from "@/lib/validate";
import { z } from "zod";
import { UserStatusType } from "../user/types";

export type UserSession = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  accessToken: string;
  expiredAt: number;
  isPasswordExit: boolean;
  status: UserStatusType;
};

export type UserRegister = {
  variables: z.infer<typeof registerSchema> & { provider?: string };
} & UserSession;
export type UserLogin = {
  variables: z.infer<typeof loginSchema>;
} & UserSession;

export type UserVerified = {
  variables: z.infer<typeof otpSchema> & {
    email: string;
  };
} & UserSession;

export type ResetPassword = {
  variables: {
    password: string;
    email: string;
    currentDate: number;
  };
};

export type ResendOTP = {
  variables: {
    email: string;
    currentTime?: number;
  };
} & UserSession;

export type ForgetPassword = {
  variables: { email: string; currentTime?: number };
} & UserSession;

export type UserCheck = {
  variables: { email: string };
  isPassword: boolean;
};
