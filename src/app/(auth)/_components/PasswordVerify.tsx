import { login } from "@/actions/auth";
import { UserLogin } from "@/actions/auth/types";
import { ExtractVariables } from "@/actions/utils/types";
import { signIn } from "@/auth";
import Spinner from "@/components/ui/spinner";
import { useSubmitForm } from "@/hooks/useSubmit";
import { Button } from "@/layouts/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/layouts/components/ui/form";
import { passwordSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "./PasswordInput";

export default function PasswordVerify({ email }: ExtractVariables<UserLogin>) {
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();
  const passwordVerifyForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  // login user
  let { action } = useSubmitForm<UserLogin>(login, {
    onSuccess: ({ message }) => {
      toast.success(message);
      signIn("credentials", {
        email: email,
        password: passwordVerifyForm.getValues("password"),
      });
    },
  });

  return (
    <Form {...passwordVerifyForm}>
      <form
        onSubmit={passwordVerifyForm.handleSubmit(
          (data) => {
            startLoading(() => {
              action({ ...data, email });
            });
          },
          (error) => {
            console.log(error);
          },
        )}
      >
        <fieldset className="mb-4" key={"password"}>
          <FormField
            control={passwordVerifyForm.control}
            name={"password"}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password*</FormLabel>
                <FormControl>
                  <PasswordInput {...field} name="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <div className="mb-7 flex items-center justify-end gap-4 text-accent max-md:text-xs">
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
                Login <Spinner className="size-4" />
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
