"use client";

import { forgetPassword } from "@/actions/auth";
import { ForgetPassword } from "@/actions/auth/types";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { useSubmitForm } from "@/hooks/useSubmit";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/layouts/components/ui/form";
import { forgotPasswordSchema } from "@/lib/validate";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Verify from "../_components/Verify";

function Page() {
  const [showVerify, setShowVerify] = useState(false);
  const [isLoading, startLoading] = useTransition();
  const forgetForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { action } = useSubmitForm<ForgetPassword>(forgetPassword, {
    onSuccess: () => {
      toast.success("OTP sent successfully");
      setShowVerify(true);
    },
  });

  return (
    <>
      <SeoMeta title="Forgot Password" />
      <BoxLayout
        headerTitle={"Forgot Password?"}
        headerDescription={
          "Enter your email or username, we will send you a link to Reset your password"
        }
        footerTitle={""}
        footerDescription={""}
      >
        <section>
          <div className="container">
            <div className="dark-gradient-bg 3xl:max-w-[500px] border-border relative mx-auto w-full max-w-[360px] rounded-[20px] border p-5 -tracking-[0.2px]">
              {showVerify ? (
                <Verify {...forgetForm.getValues()} />
              ) : (
                <Form {...forgetForm}>
                  <form
                    onSubmit={forgetForm.handleSubmit((data) => {
                      startLoading(() => {
                        action(data);
                      });
                    })}
                  >
                    <fieldset className="mb-7">
                      <FormField
                        control={forgetForm.control}
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
                    <div className="mb-3">
                      <Button disabled={isLoading} className="w-full" size="xl">
                        {isLoading ? (
                          <>
                            Sending
                            <Spinner className="size-4" />
                          </>
                        ) : (
                          "Send"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}

export default Page;
