"use client";

import { updateAuthor } from "@/actions/author";
import { UpdateAuthor } from "@/actions/author/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmitForm } from "@/hooks/useSubmit";
import { bankFormSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import bankList from "./data/bank-list.json";

export default function BankForm() {
  const { data: session } = useSession();
  const bankForm = useForm<z.infer<typeof bankFormSchema>>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      bank_account_name: "",
      bank_account_number: "",
      bank_branch: "",
      bank_district: "",
      bank_name: "",
      bank_routing_number: "",
      mobile_number: "",
    },
  });
  const { action } = useSubmitForm<UpdateAuthor>(updateAuthor);
  const [isLoading, startLoading] = useTransition();

  return (
    <div>
      <Form {...bankForm}>
        <form
          onSubmit={bankForm.handleSubmit((data) => {
            const {
              bank_account_name,
              bank_account_number,
              bank_branch,
              bank_district,
              bank_name,
              bank_routing_number,
              mobile_number,
            } = data;
            startLoading(() => {
              const author_id = session?.user.id!;
              action({
                author_id,
                bank_ac_name: bank_account_name,
                bank_ac_no: bank_account_number,
                bank_branch: bank_branch,
                bank_district: bank_district,
                bank_name: bank_name,
                bank_routing_no: bank_routing_number,
                mobile_number: mobile_number,
              });
            });
          })}
          className="grid grid-cols-2 gap-14"
        >
          <div className="space-y-9">
            <FormField
              control={bankForm.control}
              name={"bank_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bank_name">Bank Name*</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-text-light">
                        {bankList.map((bank, i) => (
                          <SelectItem
                            key={i}
                            value={bank.BankName}
                            className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          >
                            {bank.BankName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={bankForm.control}
              name={"bank_branch"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bank_branch">Bank Branch* </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="bank_branch"
                      placeholder="Shyamoli"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={bankForm.control}
              name={"bank_account_number"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bank_account_number">
                    Back Account Number*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="number"
                      placeholder="1212123242332324"
                      id="bank_account_number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={bankForm.control}
              name={"bank_account_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bank_account_name">
                    Account Holder Name*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      placeholder="Account Name"
                      id="bank_account_name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-9">
            <FormField
              control={bankForm.control}
              name={"bank_routing_number"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bank_routing_number">
                    Bank Routing Number*
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="number"
                      id="bank_routing_number"
                      placeholder="1212121212"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={bankForm.control}
              name={"bank_district"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="bank_district">Bank District*</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="bank_district"
                      placeholder="Dhaka"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={bankForm.control}
              name={"mobile_number"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="mobile_number">Mobile Number*</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="number"
                      id="mobile_number"
                      placeholder="+8801111-121212"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2">
            <Button disabled={isLoading} size={"lg"}>
              Submit Information
              {isLoading && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
