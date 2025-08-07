"use client";

import { addTeamMember } from "@/actions/team";
import { TTeam } from "@/actions/team/types";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { useSubmitForm } from "@/hooks/useSubmit";
import { teamMemberSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AddMember = () => {
  const { data: session } = useSession();
  const [isLoading, startLoading] = useTransition();

  const teamMemberForm = useForm<z.infer<typeof teamMemberSchema>>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      member_email: "",
    },
  });

  const { action } = useSubmitForm<TTeam>(addTeamMember, {
    onSuccess: () => {
      toast.success("member added successfully");
      teamMemberForm.reset({
        member_email: "",
      });
    },
  });

  return (
    <div className="dark-gradient-bg relative mx-auto w-full rounded-[20px] border border-border p-6 -tracking-[0.2px]">
      <Heading level="h4" className="mb-4" variant="gradient">
        Add Team Member
      </Heading>
      <FormProvider {...teamMemberForm}>
        <form
          className="row items-center"
          onSubmit={teamMemberForm.handleSubmit(async (data) => {
            startLoading(async () => {
              const res = await action({
                owner_id: session?.user?.id!,
                member_email: data.member_email,
              });
              if (res) {
                teamMemberForm.reset({
                  member_email: "",
                });
              }
            });
          })}
        >
          <fieldset className="mb-3 md:col-9">
            <FormField
              control={teamMemberForm.control}
              name={"member_email"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="member_email">Email*</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="email"
                      id="member_email"
                      placeholder="john.doe@email.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="mt-4 text-right md:col-3">
            <Button size={"lg"} className="w-full rounded-lg">
              {isLoading ? (
                <>
                  Adding <Spinner className="size-5" />
                </>
              ) : (
                "Add Now"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddMember;
