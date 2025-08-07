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
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import Heading from "@/components/ui/title";
import Axios from "@/lib/utils/axios";
import { authorOnboardingSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const OnboardingSteps = ({ status }: { status?: string }) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const showForm = searchParams.get("apply");
  const formSubmitted = searchParams.get("success");
  const [isLoading, startLoading] = useTransition();
  const authorOnboardingForm = useForm<z.infer<typeof authorOnboardingSchema>>({
    resolver: zodResolver(authorOnboardingSchema),
    defaultValues: {
      portfolio: "",
      best_work: "",
      anonymous: false,
    },
  });

  return status === "pending" && !formSubmitted ? (
    <div className="content text-center">
      <Image
        className="mx-auto mb-4"
        src={"/images/pending.svg"}
        alt="pending"
        width={48}
        height={48}
      />
      <Heading className="mb-2" level="h3" variant="gradient">
        Your application is under review.
      </Heading>
      <p>We've received your application and will be in touch soon.</p>
    </div>
  ) : showForm ? (
    <div className="dark-gradient-bg relative mx-auto w-full max-w-[780px] rounded-[20px] border border-border p-5 -tracking-[0.2px]">
      <Form {...authorOnboardingForm}>
        <form
          onSubmit={authorOnboardingForm.handleSubmit(
            async (data) => {
              startLoading(async () => {
                try {
                  const response = await Axios.post(
                    "/author",
                    {
                      author_id: session?.user.id,
                      portfolio: data.portfolio,
                      best_work: data.best_work,
                      anonymous: data.anonymous,
                      type: "designer",
                    },
                    {
                      headers: { "Content-type": "application/json" },
                    },
                  );
                  if (response.data.success) {
                    router.push("/dashboard/author?success=true");
                  }
                  authorOnboardingForm.reset();
                } catch (error) {
                  console.error("Error submitting form:", error);
                }
              });
            },
            (err) => {
              console.log(err);
            },
          )}
          className="row justify-center"
        >
          {/* portfolio */}
          <fieldset className="mb-4 md:col-6">
            <FormField
              control={authorOnboardingForm.control}
              name={"portfolio"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="portfolio">
                    Your Portfolio/Dribble/Behance Link*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="portfolio"
                      placeholder="https://yourportfoliolink.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          {/* Best Work */}
          <fieldset className="mb-4 md:col-6">
            <FormField
              control={authorOnboardingForm.control}
              name={"best_work"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="best_work">
                    Your Best Work Link*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="best_work"
                      placeholder="https://yourbestworklink.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          {/* anonymous */}
          <fieldset className="mb-4 md:col-12">
            <FormField
              control={authorOnboardingForm.control}
              name={"anonymous"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="anonymous">
                    Hide my identity (Anonymous)
                  </FormLabel>

                  {/* toggle */}
                  <Switch
                    onCheckedChange={(value) => field.onChange(value)}
                    checked={field.value}
                    className="ml-2 align-middle"
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          {/* Submit */}
          <div className="mt-4">
            <Button
              disabled={isLoading}
              variant={"default"}
              className="w-full border border-none px-12 py-5 before:rounded-full after:rounded-full"
            >
              {isLoading ? (
                <>
                  Submitting <Spinner className="size-4" />
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  ) : formSubmitted ? (
    <div className="content text-center">
      <Image
        className="mx-auto mb-4"
        src={"/images/success.svg"}
        alt="success"
        width={48}
        height={48}
      />
      <Heading className="mb-2" level="h3" variant="gradient">
        Thank you for applying!
      </Heading>
      <p>We've received your application and will be in touch soon. </p>
    </div>
  ) : (
    <div className="content">
      <Heading variant={"gradient"} className="mb-4" level="h3">
        Why sell your design to UIHut?
      </Heading>
      <ul>
        <li>Get paid upfront without waiting for sales</li>
        <li>Competitive compensation</li>
        <li>Choose to remain anonymous; we won’t share your identity</li>
        <li>Flexible deadlines and schedule to fit your lifestyle.</li>
      </ul>
      <Button
        variant={"default"}
        onClick={() => router.push("/dashboard/author?apply=true")}
      >
        Apply Now
      </Button>
    </div>
  );
};

export default OnboardingSteps;
