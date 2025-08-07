"use server";

import {
  ExtractVariables,
  InsertionSuccess,
  SubmitFormState,
} from "@/actions/utils/types";
import { signIn } from "@/auth";
import {
  conformPasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
} from "@/lib/validate";
import { IErrorMessage } from "@/types";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import "server-only";
import { fetchApi, mutate } from "../utils";
import {
  ForgetPassword,
  ResendOTP,
  ResetPassword,
  UserCheck,
  UserLogin,
  UserRegister,
  UserVerified,
} from "./types";

export const updateUserProfile = async (
  userData: Record<string, unknown>,
): Promise<SubmitFormState<UserRegister>> => {
  const reqBody = {
    ...(userData as ExtractVariables<UserRegister>),
    currentDate: Date.now(),
  };

  return await mutate<UserRegister>(async () => {
    const updatedUser = await fetchApi<InsertionSuccess<UserRegister>>({
      endPoint: "/authentication/oauth-login",
      method: "POST",
      body: reqBody,
      cache: "no-cache",
    });

    return updatedUser;
  });
};

export const register = async (
  prevState: SubmitFormState<UserRegister>,
  data: ExtractVariables<UserRegister>,
): Promise<SubmitFormState<UserRegister>> => {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    return {
      data: null,
      error: [],
      message: null,
      isError: true,
      isSuccess: false,
      statusCode: null,
    };
  }

  return await mutate<UserRegister>(async () => {
    const user = await fetchApi<UserRegister>({
      endPoint: "/user",
      method: "POST",
      body: { ...parsed.data, provider: "credentials" },
      cache: "no-cache",
    });
    return user;
  });
};

export const login = async (
  prevState: SubmitFormState<UserLogin>,
  data: ExtractVariables<UserLogin>,
): Promise<SubmitFormState<UserLogin>> => {
  const validate = loginSchema.safeParse(data);

  if (validate.success) {
    try {
      return await signIn("credentials", data);
    } catch (error) {
      if (error instanceof AuthError) {
        const { message, errorMessage } = error.cause as {
          message: string;
          errorMessage: IErrorMessage[];
        };
        const isOtpSent = message === "OTP sent successfully";
        switch ((error.cause as { type: string }).type) {
          case "CredentialsSignin":
            return {
              data: null,
              error: errorMessage || [],
              message: message || "Invalid credentials!",
              isError: !isOtpSent,
              isSuccess: isOtpSent,
              statusCode: isOtpSent ? 200 : 500,
            };
          case "AccessDenied":
            return {
              data: null,
              error: [],
              message: "AccessDenied.",
              isError: true,
              isSuccess: false,
              statusCode: 500,
            };
        }
      }
      if (isRedirectError(error)) {
        function getFromValue(digest: string): string {
          const urlPattern = /NEXT_REDIRECT;(?:replace|push);(.*?);/;
          const match = digest.match(urlPattern);

          if (match) {
            try {
              const url = new URL(match[1]);
              return url.searchParams.get("from") || "/";
            } catch {
              // If URL construction fails, return "/"
            }
          }

          return "/";
        }

        redirect(getFromValue(error.digest));
      }
      return {
        // @ts-ignore
        data: error.cause.errorMessage || [],
        error: [],
        // @ts-ignore
        message: error.cause.message || "Something went wrong!",
        isError: true,
        isSuccess: false,
        statusCode: 500,
      };
    }
  } else {
    return {
      data: null,
      error: [],
      message: "Something went wrong!",
      isError: true,
      isSuccess: false,
      statusCode: 500,
    };
  }
};

// user login with credentials
export const findUserByEmail = async (
  prevState: SubmitFormState<UserCheck>,
  data: ExtractVariables<UserCheck>,
): Promise<SubmitFormState<UserCheck>> => {
  const encodeEmail = encodeURIComponent(data.email);
  return mutate<UserCheck>(async () => {
    return await fetchApi<UserCheck>({
      endPoint: `/authentication/check-user?email=${encodeEmail}`,
      method: "GET",
      body: data,
      cache: "no-cache",
    });
  });
};

// send otp
export const sendOtp = async (
  data: ExtractVariables<ResendOTP>,
): Promise<SubmitFormState<ResendOTP>> => {
  return await mutate<ResendOTP>(async () => {
    const otp = await fetchApi<{
      variables: {
        email: string;
        currentTime: number;
      };
    }>({
      endPoint: "/authentication/verify-user",
      method: "POST",
      cache: "no-cache",
      body: {
        email: data.email,
        currentTime: Date.now(),
      },
    });
    return otp;
  });
};

// user login
export const loginUser = async (credentials: ExtractVariables<UserLogin>) => {
  const validate = loginSchema.safeParse(credentials);
  if (!validate.success) {
    return {
      data: null,
      error: [],
      message: "Something went wrong!",
      isError: true,
      isSuccess: false,
      statusCode: 500,
    };
  }
  const reqBody = { ...credentials, currentDate: Date.now() };
  try {
    return await mutate<UserLogin>(async () => {
      return await fetchApi<InsertionSuccess<UserLogin>>({
        endPoint: "/authentication/password-login",
        method: "POST",
        body: reqBody,
        cache: "no-cache",
      });
    });
  } catch (error: any) {
    redirect("/");
  }
};

// verify user
export const verifyEmail = async (
  prevState: SubmitFormState<UserVerified>,
  data: ExtractVariables<UserVerified>,
) => {
  const verifyUser = await mutate<UserVerified>(async () => {
    return await fetchApi<{
      variables: {
        otp: string;
        email: string;
        currentTime: number;
      };
    }>({
      endPoint: "/authentication/verify-otp",
      method: "POST",
      body: {
        otp: data.otp,
        email: data.email,
        currentTime: Date.now(),
      },
      cache: "no-cache",
    });
  });

  return verifyUser;
};

export const resetPassword = async (
  prevState: SubmitFormState<ResetPassword>,
  data: ExtractVariables<ResetPassword>,
): Promise<SubmitFormState<ResetPassword>> => {
  const parsed = conformPasswordSchema.safeParse({
    ...data,
    confirmPassword: data.password,
  });
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
  return await mutate<ResetPassword>(async () => {
    return await fetchApi<InsertionSuccess<ResetPassword>>({
      endPoint: "/authentication/recovery-password",
      method: "PATCH",
      cache: "no-cache",
      body: {
        email: data.email,
        password: data.password,
        currentDate: Date.now(),
      },
    });
  });
};

// resend otp
export const resendOTP = async (
  prevState: SubmitFormState<ResendOTP>,
  data: ExtractVariables<ResendOTP>,
): Promise<SubmitFormState<ResendOTP>> => {
  return await mutate<ResendOTP>(async () => {
    return await fetchApi<ResendOTP>({
      endPoint: "/authentication/resend-otp",
      method: "POST",
      body: {
        email: data.email,
        currentTime: Date.now(),
      },
      cache: "no-cache",
    });
  });
};

export const forgetPassword = async (
  prevState: SubmitFormState<ForgetPassword>,
  data: ExtractVariables<ForgetPassword>,
): Promise<SubmitFormState<ForgetPassword>> => {
  const parsed = forgotPasswordSchema.safeParse(data);
  if (!parsed.success) {
    return {
      data: null,
      error: [],
      message: null,
      isError: true,
      isSuccess: false,
      statusCode: 500,
    };
  }

  return await mutate<ForgetPassword>(async () => {
    const isUserExit = await fetchApi<InsertionSuccess<ForgetPassword>>({
      endPoint: "/authentication/verify-user",
      method: "POST",
      cache: "no-cache",
      body: {
        email: data.email,
        currentTime: Date.now(),
      },
    });
    return isUserExit;
  });
};
