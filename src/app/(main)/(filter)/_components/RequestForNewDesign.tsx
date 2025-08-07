"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import Spinner from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import config from "@/config/config.json";
import { requestForNewDesignSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { budgets, categories } from "./data";

const { form_submit_email } = config.params;
export default function RequestForNewDesign() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Request Your Design</Button>
      </DialogTrigger>
      <DialogContent className="bg-dark inline-block w-auto [&>.close]:hidden">
        <NewDesignForm />
      </DialogContent>
    </Dialog>
  );
}

const NewDesignForm = () => {
  const { data: session } = useSession();
  const [isLoading, startLoading] = useTransition();
  const newDesignForm = useForm<z.infer<typeof requestForNewDesignSchema>>({
    resolver: zodResolver(requestForNewDesignSchema),
    defaultValues: {
      category: "",
      inspiration: "",
      subCategory: "",
      asService: "No",
      budget: "",
      description: "",
    },
  });

  const subCategories = useMemo(() => {
    if (newDesignForm.watch("category") === "") {
      return [];
    }
    return (
      categories.find(
        (category) => category.value === newDesignForm.watch("category"),
      )?.subCategories || []
    );
  }, [newDesignForm.watch("category")]);

  return (
    <div className="dark-gradient-bg border-border relative mx-auto w-full max-w-[360px] rounded-[10px] border p-5 -tracking-[0.2px]">
      <Form {...newDesignForm}>
        <form
          onSubmit={newDesignForm.handleSubmit(async (data) => {
            startLoading(async () => {
              try {
                const response = await axios.post(
                  form_submit_email,
                  {
                    name:
                      session?.user.firstName + " " + session?.user.lastName,
                    email: session?.user.email,
                    _subject: data.asService
                      ? "SERVICE: new design request"
                      : "REQUEST: new design request",
                    category: data.category,
                    sub_category: data.subCategory,
                    inspiration: data.inspiration,
                    description: data.description,
                    ...(data.asService === "Yes" && {
                      budget: data.budget,
                    }),
                  },
                  {
                    headers: { "Content-type": "application/json" },
                  },
                );
                if (response.status === 200) {
                  toast.success(response.data.message);
                } else {
                  toast.error(response.data.message);
                }
                newDesignForm.reset();
              } catch (error) {
                console.error("Error submitting form:", error);
              }
            });
          })}
          className="row justify-center"
        >
          <fieldset className="mb-4">
            <FormField
              control={newDesignForm.control}
              name={"category"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Category*</FormLabel>
                  <FormControl>
                    <Select
                      key={"category"}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-text-light">
                        {categories.map((category, i) => (
                          <SelectItem
                            key={i}
                            value={category.value}
                            className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="mb-4">
            <FormField
              control={newDesignForm.control}
              name={"subCategory"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="subCategory">Sub Category*</FormLabel>
                  <FormControl>
                    <Select
                      key={"subCategory"}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a sub category" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-text-light">
                        {subCategories.map((category, i) => (
                          <SelectItem
                            key={i}
                            value={category.value}
                            className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="mb-4">
            <FormField
              control={newDesignForm.control}
              name={"inspiration"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="subject">Inspiration</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="url"
                      id="subject"
                      placeholder="https://example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="mb-4">
            <FormField
              control={newDesignForm.control}
              name={"description"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description*</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      value={field.value}
                      id="description"
                      placeholder="Describe your idea"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="mb-4">
            <FormField
              control={newDesignForm.control}
              name={"asService"}
              render={({ field }) => (
                <FormItem>
                  <p className="text-text-light mb-4 text-sm">
                    <strong> Note:</strong> We will review your idea, and based
                    on our current priorities, we will decide whether to create
                    this or not
                  </p>
                  <div className="border-border flex items-center gap-x-5 rounded border p-3">
                    <FormLabel htmlFor="subject">
                      Would you like to hire us to create this for you right
                      away?
                    </FormLabel>
                    <FormControl>
                      <Switch
                        role="switch"
                        checked={field.value === "Yes"}
                        onCheckedChange={(value) => {
                          field.onChange(value ? "Yes" : "No");
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          {newDesignForm.watch("asService") === "Yes" && (
            <fieldset className="mb-4">
              <FormField
                control={newDesignForm.control}
                name={"budget"}
                render={({ field }) => (
                  <FormItem>
                    <Select
                      key={"budget"}
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a budget" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-text-light">
                        {budgets.map((budget, i) => (
                          <SelectItem
                            key={i}
                            value={budget.value}
                            className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          >
                            {budget.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
          )}

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
