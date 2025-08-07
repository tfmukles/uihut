import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { quizUserSchema } from "@/lib/validate";
import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

export default function UserInfo({
  userInfoForm,
  setIsQuizStarted,
}: {
  userInfoForm: UseFormReturn<z.infer<typeof quizUserSchema>, any>;
  setIsQuizStarted: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div>
      <p className="mb-6 text-2xl">Before we start...</p>
      <Form {...userInfoForm}>
        <form
          onSubmit={userInfoForm.handleSubmit((data) => {
            setIsQuizStarted(true);
          })}
        >
          <div className="space-y-4">
            <FormField
              control={userInfoForm.control as any}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark text-xl" htmlFor="name">
                    Name*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="name"
                      placeholder="John"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userInfoForm.control as any}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark text-xl" htmlFor="email">
                    Email*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="email"
                      id="email"
                      placeholder="yourname@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={userInfoForm.control as any}
              name={"phone_number"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text-dark text-xl" htmlFor="phone">
                    Phone*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="tel"
                      id="phone"
                      placeholder="+8801000000000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-10 inline-flex w-full text-[20px]"
            size={"xl"}
          >
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
}
