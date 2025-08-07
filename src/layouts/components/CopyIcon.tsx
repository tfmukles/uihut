"use client";
import { getDesignFileBlob } from "@/actions/designs";
import { TIcon } from "@/actions/icons/types";
import { UserStatusType } from "@/actions/user/types";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRestartSetTimeout } from "@/hooks/useRestartTimeout";
import { cn } from "@/lib/utils/shadcn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX, useState, useTransition } from "react";
import { toast } from "sonner";

interface CopyIconProps extends Omit<ButtonProps, "type"> {
  product_id?: TIcon["product_id"];
  figma_code?: TIcon["figma_code"];
  loadingComponent?: React.ReactNode;
  successComponent?: React.ReactNode;
}

const CopyIcon = ({
  product_id,
  figma_code,
  className,
  asChild,
  loadingComponent,
  successComponent,
  children,
  ...props
}: CopyIconProps) => {
  console;
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();
  const [copied, setCopied] = useState(false);
  const restartTimeout = useRestartSetTimeout();
  const { data: session, status } = useSession();
  const { user } = session || {};

  const Comp = asChild ? Slot : Button;
  children = children;

  if (isLoading) {
    children = loadingComponent;
  }

  if (copied) {
    children = successComponent;
  }

  const shouldDisable = !user?.accessToken;

  const handleCopy = async () => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    setCopied(false);

    if (session?.user.status === UserStatusType.RESTRICTED) {
      toast.message("Your account is restricted. Please contact support.");
      return;
    }
    startLoading(async () => {
      try {
        const key = encodeURIComponent(figma_code!);
        const text = (await getDesignFileBlob(key)).data as string;
        if (!text) {
          toast.message("File not found");
          return;
        }

        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              "text/html": new Blob([text], { type: "text/html" }),
            }),
          ]);
        } catch (err) {
          toast.message("Failed to copy");
          return;
        }

        setCopied(true);
        restartTimeout(setTimeout(() => setCopied(false), 2000));
      } catch (error) {
        toast.message("Something went wrong");
      }
    });
  };

  return (
    <Comp
      {...props}
      onClick={handleCopy}
      disabled={isLoading}
      className={cn(className, shouldDisable && "cursor-default opacity-50")}
    >
      <Slottable>{children as JSX.Element}</Slottable>
    </Comp>
  );
};

export default CopyIcon;
