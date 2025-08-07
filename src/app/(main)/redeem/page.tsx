"use client";

import { redeemCode } from "@/actions/redeem";
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
import Heading from "@/components/ui/title";
import { packageContext } from "@/helpers/PackageProvider";
import { useSubmitForm } from "@/hooks/useSubmit";
import BoxLayout from "@/partials/BoxLayout";
import SeoMeta from "@/partials/SeoMeta";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const redeemSchema = z.object({
  code: z.string().min(1, "Code is required"),
});

export default function RedeemPage(props: {
  params: Promise<{ [key: string]: string }>;
}) {
  const { setPackageName } = useContext(packageContext) || {};
  const router = useRouter();

  const { data: session } = useSession();
  const redeemForm = useForm<z.infer<typeof redeemSchema>>({
    resolver: zodResolver(redeemSchema),
    defaultValues: {
      code: "",
    },
  });

  // @ts-ignore
  const { action } = useSubmitForm<TRedeem>(redeemCode, {
    onSuccess: ({ data }) => {
      if (setPackageName) setPackageName(data?.package || "");
      toast.success("Code redeemed successfully");
      router.push("/thank-you");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong");
    },
  });

  const handleRedeem = async (data: z.infer<typeof redeemSchema>) => {
    await action({
      userId: session?.user?.id!,
      code: data.code,
    });
  };

  return (
    <>
      <SeoMeta title="Redeem Code" />
      <BoxLayout
        headerTitle="Redeem Code"
        headerDescription="Enter your code below to redeem your offer."
        disableBgStars
      >
        <section>
          <div className="container">
            <div className="mx-auto max-w-[725px]">
              <div className="dark-gradient-bg border-border relative mx-auto mb-8 w-full rounded-[20px] border px-6 py-9 -tracking-[0.2px]">
                <div className="dark-gradient-bg border-border relative mx-auto w-full rounded-[20px] border p-6 -tracking-[0.2px]">
                  <Heading level="h4" className="mb-4" variant="gradient">
                    Redeem Your Code
                  </Heading>
                  <Form {...redeemForm}>
                    <form
                      onSubmit={redeemForm.handleSubmit(handleRedeem)}
                      className="row items-center"
                    >
                      <fieldset className="mb-3 md:col-9">
                        <FormField
                          control={redeemForm.control}
                          name={"code"}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="code">Code*</FormLabel>
                              <FormControl>
                                <FormInput
                                  {...field}
                                  type="text"
                                  id="code"
                                  placeholder="Enter your redeem code"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </fieldset>
                      <div className="mt-4 text-right md:col-3">
                        <Button size={"lg"} className="w-full rounded-lg">
                          {false ? (
                            <>
                              Redeeming <Spinner className="size-5" />
                            </>
                          ) : (
                            "Redeem Now"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BoxLayout>
    </>
  );
}
