"use client";

import { findUserByEmail, sendOtp } from "@/actions/auth";
import { UserCheck } from "@/actions/auth/types";
import Spinner from "@/components/ui/spinner";
import { useSubmitForm } from "@/hooks/useSubmit";
import { Button } from "@/layouts/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/layouts/components/ui/form";
import { emailSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function EmailVerify({
  setLoginInfo,
}: {
  setLoginInfo: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}) {
  const router = useRouter();
  const searchparams = useSearchParams();
  const [isLoading, startLoading] = useTransition();
  let emailVerifyForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  let { action: findUserAction } = useSubmitForm<UserCheck>(findUserByEmail, {
    onSuccess: ({ data }) => {
      const params = new URLSearchParams();

      if (data?.isPassword) {
        if (searchparams.get("from")) {
          params.set("from", searchparams.get("from")!);
        }
        params.set("isUserExit", "true");
      } else {
        params.set("otpVerified", "true");
        // sent otp
        startLoading(async () => {
          const { message } = await sendOtp({
            email: emailVerifyForm.getValues("email"),
          });
          toast.message(message);
        });
      }

      router.push(`/login?${params.toString()}`);
    },
  });

  let onSubmit = (data: z.infer<typeof emailSchema>) => {
    startLoading(() => {
      setLoginInfo((prev) => ({ ...prev, ...data }));
      findUserAction(data);
    });
  };

  return (
    <Form {...emailVerifyForm}>
      <form onSubmit={emailVerifyForm.handleSubmit(onSubmit)}>
        <fieldset key={"email"}>
          <FormField
            control={emailVerifyForm.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="user">Email*</FormLabel>
                <FormControl>
                  <FormInput
                    {...field}
                    type="email"
                    id="user"
                    placeholder="Enter Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="flex items-center justify-end gap-4 py-4 text-accent max-md:text-xs">
          <Link
            className="py-0 text-primary underline underline-offset-2"
            href="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <div className="my-3">
          <Button disabled={isLoading} className="w-full" size="xl">
            {isLoading ? (
              <>
                Login
                <Spinner className="size-4" />
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between gap-4 text-muted-foreground max-md:text-xs">
          <span>Don't have an account?</span>
          <Link
            className="py-0 text-primary underline underline-offset-2"
            href="/register"
          >
            Create account
          </Link>
        </div>
      </form>
    </Form>
  );
}
