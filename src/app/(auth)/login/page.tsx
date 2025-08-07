"use client";

import { UserLogin } from "@/actions/auth/types";
import { ExtractVariables } from "@/actions/utils/types";
import { Button } from "@/layouts/components/ui/button";
import { Separator } from "@/layouts/components/ui/separator";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import googleIcon from "@/public/images/svgs/google.svg";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { use, useState } from "react";
import EmailVerify from "../_components/EmailVerify";
import PasswordVerify from "../_components/PasswordVerify";
import Verify from "../_components/Verify";
export const dynamic = "force-dynamic";

export default function Login({
  searchParams,
}: {
  searchParams: Promise<{
    otpVerified: string;
    resetPassword: string;
    updatePassword: string;
    isUserExit: string;
  }>;
}) {
  const [loginInfo, setLoginInfo] = useState<ExtractVariables<UserLogin>>({
    email: "",
    password: "",
  });

  const searchparams = use(searchParams);
  const isUserExit = searchparams.isUserExit === "true";
  const showVerify =
    searchparams.otpVerified === "true" ||
    searchparams.resetPassword === "true" ||
    searchparams.updatePassword === "true";

  const title =
    searchparams.resetPassword === "true"
      ? "Set Password"
      : searchparams.otpVerified
        ? "Enter OTP"
        : searchparams.updatePassword === "true"
          ? "Set Password"
          : "Login";

  return (
    <>
      <SeoMeta
        title={title}
        description="Log in to UIHUT to access your favorite UI design resources. Get instant access to 26,000+ UI Kits, 3D assets, icons, and more for your ongoing projects."
      />
      <BoxLayout
        headerTitle={title}
        headerDescription={
          searchparams.updatePassword === "true"
            ? "Set a password for your account"
            : "Please enter your details to Login"
        }
        footerTitle={""}
        footerDescription={""}
      >
        <section>
          <div className="container">
            <div className="dark-gradient-bg border-border 3xl:max-w-[500px] relative mx-auto w-full max-w-[360px] rounded-[20px] border p-5 -tracking-[0.2px]">
              {showVerify ? (
                <Verify {...loginInfo} />
              ) : (
                <>
                  <div className="mb-4">
                    <Button
                      className="border-border text-text-dark h-auto w-full border px-3 py-[11px]"
                      variant="basic"
                      onClick={() => signIn("google")}
                    >
                      <Image src={googleIcon} alt="google" />
                      Login with Google
                    </Button>
                  </div>
                  <div className="relative mb-3.5 py-3.5">
                    <span className="bg-background/50 text-text-light absolute top-1/2 left-1/2 -mt-0.5 -translate-x-1/2 -translate-y-1/2 leading-none font-medium">
                      or
                    </span>
                    <Separator />
                  </div>
                  {!isUserExit ? (
                    <EmailVerify setLoginInfo={setLoginInfo} />
                  ) : (
                    <PasswordVerify {...loginInfo} />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
