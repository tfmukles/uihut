"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextArea,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import config from "@/config/config.json";
import { contactUsSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const { form_submit_email } = config.params;

const ContactForm = () => {
  const [isLoading, startLoading] = useTransition();
  const userContactForm = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  return (
    <div className="dark-gradient-bg border-border relative mx-auto w-full max-w-[540px] rounded-[20px] border p-5 -tracking-[0.2px]">
      <Form {...userContactForm}>
        <form
          onSubmit={userContactForm.handleSubmit(async (data) => {
            startLoading(async () => {
              try {
                const response = await axios.post(
                  form_submit_email,
                  {
                    _subject: data.subject,
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                  },
                  {
                    headers: { "Content-type": "application/json" },
                  },
                );
                if (response.data.status === "success") {
                  toast.success(response.data.message);
                } else {
                  toast.error(response.data.message);
                }
                userContactForm.reset();
              } catch (error) {
                console.error("Error submitting form:", error);
              }
            });
          })}
          className="row justify-center"
        >
          <fieldset className="mb-4">
            <FormField
              control={userContactForm.control}
              name={"name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name*</FormLabel>
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
          </fieldset>

          <fieldset className="mb-4">
            <FormField
              control={userContactForm.control}
              name={"email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email*</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="email"
                      id="email"
                      placeholder="hello@info.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="mb-4">
            <FormField
              control={userContactForm.control}
              name={"subject"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="subject">Subject*</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="subject"
                      placeholder="Subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="mb-4">
            <FormField
              control={userContactForm.control}
              name={"message"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="message">Message*</FormLabel>
                  <FormControl>
                    <FormTextArea
                      {...field}
                      id="message"
                      placeholder="Message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <div className="mt-4">
            <Button
              disabled={isLoading}
              variant={"default"}
              className="w-full border border-none px-12 py-5 before:rounded-full after:rounded-full"
            >
              {isLoading ? (
                <span>
                  Sending <Spinner className="inline-block size-4" />
                </span>
              ) : (
                "Send Your Message"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
