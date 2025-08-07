"use client";

import { saveProfilePicture, updateUser } from "@/actions/user";
import { TSaveProfilePicture, TUser, TUserUpdate } from "@/actions/user/types";
import { getCountries } from "@/actions/utils";
import Avatar from "@/components/Avatar";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { useSubmitForm } from "@/hooks/useSubmit";
import { saveProfilePictureSchema, updateUserSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type State = {
  name: string;
  state_code: string;
};

type Country = {
  name: string;
  iso3: string;
  iso2: string;
  states: State[];
};

const UpdateProfile = ({
  id,
  first_name,
  last_name,
  state,
  image,
  email,
  country,
}: TUser) => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const cachedCountries = JSON.parse(
      localStorage.getItem("countries") || "[]",
    );

    if (cachedCountries.length > 0) {
      setCountries(cachedCountries);
    } else {
      getCountries().then(({ data }: { data: Country[] }) => {
        const index = data.findIndex(({ name }: any) => name === "Congo");
        data.splice(index, index + 1, {
          ...data[index],
          states: [...data[index].states, ...data[index + 1].states],
        });
        localStorage.setItem("countries", JSON.stringify(data));
        setCountries(data);
      });
    }
  }, []);

  const [isLoading, startLoading] = useTransition();
  const { action } = useSubmitForm<TUserUpdate>(updateUser, {
    onSuccess: ({ data, message }) => {
      // update(data);
      toast.success(message);
    },
  });

  const userDetailsForm = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      first_name,
      last_name,
      state,
      image,
      country,
      email,
    },
  });

  const selectedCountry = userDetailsForm.watch("country");
  const states = useMemo(() => {
    return countries.find((country) => country.name === selectedCountry)
      ?.states;
  }, [selectedCountry, countries.length]);

  return (
    <div className="dark-gradient-bg relative mx-auto mb-8 w-full rounded-[20px] border border-border p-6 -tracking-[0.2px] sm:p-8">
      <Heading className="mb-6" level={"h3"}>
        Update Profile
      </Heading>
      <UpdateProfilePictureForm />
      <Form {...userDetailsForm}>
        <form
          onSubmit={userDetailsForm.handleSubmit((data) => {
            startLoading(() => {
              action({
                userData: {
                  ...data,
                  id: id,
                },
              });
            });
          })}
          className="row"
        >
          <fieldset className="mb-3 md:col-6">
            <FormField
              control={userDetailsForm.control}
              name={"first_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">First Name*</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="firstName"
                      placeholder="John"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <fieldset className="mb-3 md:col-6">
            <FormField
              control={userDetailsForm.control}
              name={"last_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormControl>
                    <FormInput
                      {...field}
                      type="text"
                      id="lastName"
                      placeholder="Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>

          <fieldset className="mb-3 md:col-6">
            <FormField
              control={userDetailsForm.control}
              name={"country"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="country">Country*</FormLabel>

                  <FormControl>
                    <Select
                      key={"country"}
                      onValueChange={(value) => {
                        field.onChange(value);
                        userDetailsForm.setValue("state", "");
                      }}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-text-light">
                        {countries.map((country, i) => (
                          <SelectItem
                            key={i}
                            value={country.name}
                            className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          >
                            {country.name}
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

          <fieldset className="mb-3 md:col-6">
            <FormField
              control={userDetailsForm.control}
              name={"state"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="state">State*</FormLabel>
                  <FormControl>
                    <Select
                      key={"states"}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-text-light">
                        {states?.map((state, i) => (
                          <SelectItem
                            key={i}
                            value={state.name}
                            className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          >
                            {state.name}
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

export default UpdateProfile;

const UpdateProfilePictureForm = () => {
  const { data: session, update } = useSession();
  const { user } = session || {};
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState<string>();
  const [isUploadLoading, startUploading] = useTransition();

  const { action: savePictureAction } = useSubmitForm<TSaveProfilePicture>(
    // @ts-ignore
    saveProfilePicture,
    {
      onSuccess: ({ data }) => {
        toast.success("Profile picture updated successfully");
        setPreviewSrc("");
        saveProfilePictureForm.reset();
        update(data);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    },
  );

  const saveProfilePictureForm = useForm<
    z.infer<typeof saveProfilePictureSchema>
  >({
    resolver: zodResolver(saveProfilePictureSchema),
    defaultValues: {},
  });

  return (
    <Form {...saveProfilePictureForm}>
      <form
        onSubmit={saveProfilePictureForm.handleSubmit((data) => {
          startUploading(async () => {
            const formData = new FormData();
            formData.append("permission", "public-read");
            formData.append("folder", "uihut/users");
            formData.append("file", data.image[0]);
            formData.append("id", user?.id!);
            await savePictureAction(formData);
          });
        })}
      >
        <fieldset className="col-12 mb-6">
          <div className="flex w-full items-center space-x-3 rounded-lg border border-border p-4">
            <Avatar
              email={user?.email!}
              src={previewSrc ? previewSrc : user?.image!}
              width={66}
              height={66}
              preview={!!previewSrc}
              alt={user?.firstName + " " + user?.lastName}
              className="h-[66px] w-[66px] rounded-full object-cover"
            />

            <FormField
              control={saveProfilePictureForm.control}
              name={"image"}
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel
                    className="w-full flex-1 text-left"
                    htmlFor="image"
                  >
                    Update Profile Picture
                  </FormLabel>
                  <div className="flex w-full space-x-3">
                    <Button
                      type="button"
                      variant={"outline"}
                      size={"sm"}
                      className="rounded-full before:rounded-full after:rounded-full"
                      onClick={() => inputRef.current?.click()}
                      disabled={isUploadLoading}
                    >
                      Change Picture
                    </Button>
                    {previewSrc && (
                      <Button
                        type="submit"
                        size={"sm"}
                        className="rounded-full px-8"
                        disabled={
                          !saveProfilePictureForm.formState.isValid ||
                          isUploadLoading
                        }
                      >
                        {isUploadLoading ? (
                          <>
                            Uploading
                            <Spinner className="size-4" />
                          </>
                        ) : (
                          "Upload"
                        )}
                      </Button>
                    )}
                  </div>
                  <FormControl>
                    <Input
                      ref={inputRef}
                      accept="image/jpg, image/jpeg, image/png, image/webp"
                      type="file"
                      className="invisible m-0 h-0 w-0 border-none bg-white p-0 opacity-0"
                      onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        const fileReader = new FileReader();
                        fileReader.onload = (event) => {
                          setPreviewSrc(event?.target?.result as string);
                        };
                        fileReader.readAsDataURL(files[0]);
                        saveProfilePictureForm.setValue("image", files!);
                        saveProfilePictureForm.trigger();
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </fieldset>
      </form>
    </Form>
  );
};
