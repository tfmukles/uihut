"use client";

import { updatePasswordByOldPass } from "@/actions/user";
import { TUpdatePassword } from "@/actions/user/types";
import PasswordInput from "@/app/(auth)/_components/PasswordInput";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { useSubmitForm } from "@/hooks/useSubmit";
import { changePasswordSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdatePassword = () => {
  const { data: session, update } = useSession();
  const userId = session?.user?.id;
  const [isLoading, startLoading] = useTransition();
  const passwordForm = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });
  const { action } = useSubmitForm<TUpdatePassword>(updatePasswordByOldPass);

  return (
    <div className="dark-gradient-bg border-border relative z-30 mx-auto w-full rounded-[20px] border p-5 -tracking-[0.2px]">
      <Form {...passwordForm}>
        <Heading className="mb-6" level={"h3"}>
          Update Password
        </Heading>
        <form
          onSubmit={passwordForm.handleSubmit((data) => {
            startLoading(() => {
              action({ ...data, user_id: userId });
            });
          })}
          className="row"
        >
          <fieldset className="mb-3 lg:col-6">
            <FormField
              control={passwordForm.control}
              name={"currentPassword"}
              render={({ field }) => (
                <FormItem>
                  <Label
                    className="from-input mb-2 inline-block"
                    htmlFor="currentPassword"
                  >
                    Current Password*
                  </Label>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id="currentPassword"
                      placeholder="Enter old password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="mb-3 lg:col-6">
            <FormField
              control={passwordForm.control}
              name={"newPassword"}
              render={({ field }) => (
                <FormItem>
                  <Label
                    className="from-input mb-2 inline-block"
                    htmlFor="newPassword"
                  >
                    New Password*
                  </Label>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      id="newPassword"
                      placeholder="Enter new password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="mt-4 text-right">
            <Button
              variant={"default"}
              className="rounded-full px-12 py-5 before:rounded-full after:rounded-full max-md:w-full"
            >
              {isLoading ? (
                <>
                  Updating <Spinner className="size-4" />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePassword;
