"use client";

import { login, register } from "@/actions/auth";
import { UserLogin, UserRegister } from "@/actions/auth/types";
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
import { Separator } from "@/layouts/components/ui/separator";
import { registerSchema } from "@/lib/validate";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import googleIcon from "@/public/images/svgs/google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PasswordInput from "../_components/PasswordInput";

function Register() {
  let { action: loginAction } = useSubmitForm<UserLogin>(login, {
    onSuccess: ({ message }) => {
      toast.success(message);
    },
  });

  const [isLoading, starLoading] = useTransition();
  const { action } = useSubmitForm<UserRegister>(register, {
    onSuccess({ message }) {
      toast.success("registered successfully");
      loginAction({
        email: registerForm.getValues("email"),
        password: registerForm.getValues("password"),
      });
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  return (
    <>
      <SeoMeta
        title="Register"
        description="Join UIHUT to access over 26,000 UI design resources. Create an account to download premium and free UI Kits, illustrations, and more for your projects."
      />
      <BoxLayout
        headerTitle={"Signup"}
        headerDescription={"Please enter your details to Sign Up"}
        footerTitle={""}
        footerDescription={""}
      >
        <section>
          <div className="container">
            <div className="dark-gradient-bg 3xl:max-w-[500px] border-border relative mx-auto w-full max-w-[360px] rounded-[20px] border p-5 -tracking-[0.2px]">
              <div className="mb-4">
                <Button
                  className="border-border text-text-dark h-auto w-full border px-3 py-[11px]"
                  variant="basic"
                  onClick={() => signIn("google")}
                >
                  <Image src={googleIcon} alt="google" />
                  Start With Google
                </Button>
              </div>
              <div className="relative mb-3.5 py-3.5">
                <span className="bg-background/50 text-text-light absolute top-1/2 left-1/2 -mt-0.5 -translate-x-1/2 -translate-y-1/2 leading-none font-medium">
                  or
                </span>
                <Separator />
              </div>

              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(
                    async (data) => {
                      starLoading(async () => {
                        await action(data);
                      });
                    },
                    (error) => {
                      console.log(error);
                    },
                  )}
                >
                  <fieldset className="mb-3">
                    <FormField
                      control={registerForm.control}
                      name={"first_name"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="user">First Name*</FormLabel>
                          <FormControl>
                            <FormInput
                              {...field}
                              type="text"
                              id="user"
                              placeholder="Enter First Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>
                  <fieldset className="mb-3">
                    <FormField
                      control={registerForm.control}
                      name={"last_name"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="user">Last Name*</FormLabel>
                          <FormControl>
                            <FormInput
                              {...field}
                              type="text"
                              id="user"
                              placeholder="Enter Last Name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>
                  <fieldset className="mb-3">
                    <FormField
                      control={registerForm.control}
                      name={"email"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel htmlFor="user">Email*</FormLabel>
                          <FormControl>
                            <FormInput
                              {...field}
                              type="text"
                              id="user"
                              placeholder="Enter Email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </fieldset>
                  <fieldset className="mb-7">
                    <FormField
                      control={registerForm.control}
                      name={"password"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel
                            className="inline-block"
                            htmlFor="password"
                          >
                            Password*
                          </FormLabel>
                          <FormControl>
                            <PasswordInput {...field} name="password" />
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
                          Sign Up <Spinner className="size-4" />
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </Button>
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between gap-4 max-md:text-xs">
                    <span>Already have an account?</span>
                    <Link
                      className="text-primary py-0 underline underline-offset-2"
                      href="/login"
                    >
                      Log in
                    </Link>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}

export default Register;
