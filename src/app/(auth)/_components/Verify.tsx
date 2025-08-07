import { resetPassword, verifyEmail } from "@/actions/auth";
import { ResetPassword, UserVerified } from "@/actions/auth/types";
import Spinner from "@/components/ui/spinner";
import { useSubmitForm } from "@/hooks/useSubmit";
import { Button } from "@/layouts/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/layouts/components/ui/form";
import { Input } from "@/layouts/components/ui/input";
import { Label } from "@/layouts/components/ui/label";
import { conformPasswordSchema, otpSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "./PasswordInput";
import { Timer } from "./Timer";

export default function Verify({
  email,
  password,
}: {
  email: string;
  password?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const { data: session, update } = useSession();
  const isUpdatePassword = searchparams.get("updatePassword") === "true";
  const from = searchparams.get("from") || "/";
  const isResetPassword =
    searchparams.get("resetPassword") === "true" ||
    searchparams.get("updatePassword") === "true";

  const [isPending, startTransition] = useTransition();
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const confirmPasswordForm = useForm<z.infer<typeof conformPasswordSchema>>({
    resolver: zodResolver(conformPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { action } = useSubmitForm<UserVerified>(verifyEmail, {
    onSuccess: ({ message }) => {
      if (message === "user token verified successfully") {
        if (password && pathname !== "/login") {
          signIn("credentials", {
            email: email,
            password: password,
          });
        } else {
          router.push(`${pathname}?resetPassword=true`);
        }
      }
    },
  });

  const { action: resetAction } = useSubmitForm<ResetPassword>(resetPassword, {
    onSuccess: async ({ message, data }) => {
      toast.success(message);
      if (isUpdatePassword) {
        update({ ...session?.user, isPasswordExit: true });
        router.refresh();
      } else {
        signIn("credentials", {
          email: email,
          password: confirmPasswordForm.getValues("password"),
        });
      }
    },
  });

  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    startTransition(async () => {
      try {
        action({ ...data, email });
      } catch (error: any) {
        toast.error(error.message || "Something went Wrong!");
      }
    });
  };

  return isResetPassword ? (
    <Form {...confirmPasswordForm}>
      <form
        onSubmit={confirmPasswordForm.handleSubmit((data) => {
          startTransition(() => {
            resetAction({
              email: isUpdatePassword ? session?.user?.email! : email,
              password: data.password,
              currentDate: Date.now(),
            });
          });
        })}
        className="space-y-3 text-left"
      >
        <FormField
          control={confirmPasswordForm.control}
          name={"password"}
          render={({ field }) => (
            <FormItem>
              <Label className="from-input inline-block">
                New Password
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <PasswordInput
                  type="password"
                  {...field}
                  placeholder="new password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={confirmPasswordForm.control}
          name={"confirmPassword"}
          render={({ field }) => (
            <FormItem className="mb-7">
              <Label className="from-input inline-block">
                Confirm new password
                <span className="text-red-500">*</span>
              </Label>
              <FormControl>
                <PasswordInput
                  type="password"
                  {...field}
                  placeholder="confirm new password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button
            disabled={isPending}
            type="submit"
            variant={"outline"}
            className="mt-3 bg-black text-text-dark"
          >
            {isPending ? (
              <>
                Submitting
                <Spinner className="size-4" />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  ) : (
    <Form {...otpForm}>
      <form
        onSubmit={otpForm.handleSubmit(onSubmit)}
        className="space-y-3 text-left"
      >
        <div className="mb-7 text-left">
          <FormField
            control={otpForm.control}
            name={"otp"}
            render={({ field }) => (
              <FormItem>
                <Label className="from-input mb-1 inline-block">
                  OTP
                  <span className="text-red-500">*</span>
                </Label>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Enter OTP"
                    type="number"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Timer email={email!} />
        <Button disabled={isPending} type="submit" className="w-full" size="xl">
          {isPending ? (
            <>
              Verifying
              <Spinner className="size-5" />
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
}
