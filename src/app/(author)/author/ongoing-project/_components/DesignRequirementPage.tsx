"use client";

import { TAuthorChat } from "@/actions/author-chat/types";
import { TAuthorDesign } from "@/actions/author-design/types";
import { TAuthor } from "@/actions/author/types";
import { TDesignPipeline } from "@/actions/design-pipeline/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Heading from "@/components/ui/title";
import { useDialog } from "@/hooks/useDialog";
import { User } from "next-auth";
import Image from "next/image";
import { useState } from "react";
import CommentTab from "./CommentTab";
import FileSubmitForm from "./FileSubmitForm";
import GuidelineTab from "./GuidelineTab";
import InformationTab from "./InformationTab";

const DesignRequirementPage = ({
  requirement,
  chat,
  user,
  author,
  authorDesign,
}: {
  requirement: TDesignPipeline;
  chat: TAuthorChat;
  user: User;
  author: TAuthor;
  authorDesign: TAuthorDesign;
}) => {
  const [activeTab, setActiveTab] = useState("information");

  const { isOpen, onOpenChange } = useDialog();

  const FILTER_MENU = [
    {
      label: "Information",
      value: "information",
    },
    {
      label: "Guideline",
      value: "guideline",
    },
    {
      label: "Comments",
      value: "comments",
    },
  ];

  return (
    <>
      {authorDesign?.status === "pending" ? (
        <div className="relative mx-auto mt-4 w-full max-w-[600px] rounded-lg border border-border bg-dark p-6 text-center -tracking-[0.2px] sm:p-8">
          <Image
            className="mx-auto mb-4"
            src={"/images/success.svg"}
            alt="success"
            width={48}
            height={48}
          />
          <Heading level="h3" className="mb-3" variant={"gradient"}>
            Thank you for submitting!
          </Heading>
          <p>We've received your design and will be in touch soon.</p>
        </div>
      ) : (
        <>
          {requirement?.status === "reviewed" ? (
            <div className="relative mx-auto mt-4 w-full max-w-[600px] rounded-lg border border-border bg-dark p-6 -tracking-[0.2px] sm:p-8">
              <Heading level="h3" className="mb-3" variant={"gradient"}>
                Your Design Has Been Approved!
              </Heading>
              <p className="mb-6">
                Please submit the necessary files in order to publish your
                design.
              </p>
              <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                  <Button>Submit Form</Button>
                </DialogTrigger>
                <DialogContent className="max-h-screen max-w-4xl overflow-auto rounded-lg border border-border p-6 lg:max-h-[calc(100vh_-_86px)]">
                  <FileSubmitForm
                    onOpenChange={onOpenChange}
                    requirement={requirement}
                    price={author?.budget}
                    formType="insert"
                  />
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <>
              <ul className="flex items-center space-x-4 lg:space-x-6">
                {FILTER_MENU.map((item) => (
                  <li
                    key={item.value}
                    className="cursor-pointer py-2"
                    onClick={() => setActiveTab(item.value)}
                  >
                    <Heading
                      variant={
                        activeTab === item.value ? "gradient" : "default"
                      }
                      className={
                        activeTab !== item.value ? "text-muted-foreground" : ""
                      }
                      level={"h5"}
                    >
                      {item.label}
                    </Heading>
                  </li>
                ))}
              </ul>

              {activeTab === "comments" ? (
                <CommentTab user={user} chat={chat} />
              ) : activeTab === "guideline" ? (
                <GuidelineTab requirement={requirement} />
              ) : (
                <InformationTab requirement={requirement} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default DesignRequirementPage;
