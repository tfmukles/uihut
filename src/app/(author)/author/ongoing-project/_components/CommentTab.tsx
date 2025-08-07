"use client";

import { addAuthorComment } from "@/actions/author-chat";
import { TAuthorChat, TComment } from "@/actions/author-chat/types";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormTextArea,
} from "@/components/ui/form";
import Spinner from "@/components/ui/spinner";
import { useSubmitForm } from "@/hooks/useSubmit";
import dateFormat from "@/lib/utils/dateFormat";
import { markdownify } from "@/lib/utils/textConverter";
import { authorCommentSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import Image from "next/image";
import { useTransition } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CommentTab = ({ user, chat }: { user: User; chat: TAuthorChat }) => {
  const [isLoading, startLoading] = useTransition();

  const authorCommentForm = useForm<z.infer<typeof authorCommentSchema>>({
    resolver: zodResolver(authorCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const { action } = useSubmitForm<TAuthorChat>(addAuthorComment, {
    onSuccess: ({ message }) => {
      toast.success("Comment added successfully");
      authorCommentForm.reset({
        comment: "",
      });
    },
  });

  return (
    <div className="relative mx-auto mt-4 w-full rounded-lg border border-border bg-dark p-6 -tracking-[0.2px] sm:p-8">
      <div className="mb-8 space-y-4">
        {chat?.comments?.map((comment: TComment) => (
          <div className="flex rounded bg-background p-4" key={comment.user_id}>
            <div className="mt-1 flex-shrink-0">
              {comment.role === "author" ? (
                <Avatar
                  src={user.image!}
                  alt={user.name!}
                  email={user.email!}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={"/images/favicon.png"}
                  alt={"admin"}
                  width={40}
                  height={40}
                  className="rounded-full bg-dark"
                />
              )}
            </div>
            <div className="ml-3">
              <div className="flex items-center space-x-2">
                <strong>{comment.name}</strong>
                <span
                  className={`rounded px-2 text-sm capitalize ${comment.role === "author" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}
                >
                  {comment.role === "author" ? "You" : "Admin"}
                </span>
              </div>
              <small className="text-muted-foreground">
                {dateFormat(comment.time)}
              </small>
              <div
                className="content"
                dangerouslySetInnerHTML={markdownify(comment.comment)}
              />
            </div>
          </div>
        ))}
      </div>
      <FormProvider {...authorCommentForm}>
        <form
          onSubmit={authorCommentForm.handleSubmit(async (data) => {
            startLoading(async () => {
              const res = await action({
                pipeline_id: chat?.pipeline_id,
                user_id: user.id!,
                comment: data.comment,
                time: new Date(),
                role: "author",
              });
            });
          })}
        >
          <fieldset className="mb-4">
            <FormField
              control={authorCommentForm.control}
              name={"comment"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="comment">Comment</FormLabel>
                  <FormControl>
                    <FormTextArea {...field} id="comment" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
          <div className="space-x-2">
            <Button size={"lg"}>
              {isLoading ? (
                <>
                  Please Wait <Spinner className="size-5" />
                </>
              ) : (
                "Add Comment"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CommentTab;
