"use client";
import { getDesignFileBlob, getSingleDesign } from "@/actions/designs";
import { TDesign } from "@/actions/designs/types";
import { updateDownloadHistory } from "@/actions/downloads";
import { getWebflowPageById, getWebflowSectionById } from "@/actions/webflow";
import { Button, ButtonProps } from "@/components/ui/button";
import { packageContext } from "@/helpers/PackageProvider";
import { useRestartSetTimeout } from "@/hooks/useRestartTimeout";
import { cn } from "@/lib/utils/shadcn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX, useContext, useState, useTransition } from "react";
import { toast } from "sonner";

interface CopyButtonProps extends Omit<ButtonProps, "type"> {
  files?: TDesign["files"];
  product_id?: TDesign["product_id"];
  category?: TDesign["category"];
  type?: TDesign["type"];
  loadingComponent?: React.ReactNode;
  successComponent?: React.ReactNode;
  premium?: boolean;
  format?: string;
  theme?: string;
}

const CopyButton = ({
  files,
  product_id,
  type,
  category,
  className,
  asChild,
  premium,
  loadingComponent,
  successComponent,
  children,
  format,
  theme,
  ...props
}: CopyButtonProps) => {
  const router = useRouter();
  const [isLoading, startLoading] = useTransition();
  const [copied, setCopied] = useState(false);
  const restartTimeout = useRestartSetTimeout();
  const { data: session, status } = useSession();
  const { user } = session || {};
  const { packageName, teamPackageName } = useContext(packageContext) || {};

  const Comp = asChild ? Slot : Button;
  children = children;

  if (isLoading) {
    children = loadingComponent;
  }

  if (copied) {
    children = successComponent;
  }

  const currentPackage =
    packageName && packageName !== "free"
      ? packageName
      : teamPackageName && teamPackageName !== "free"
        ? teamPackageName
        : "free";

  const handleCopy = async () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    setCopied(false);
    startLoading(async () => {
      try {
        if (!Array.isArray(files)) {
          const { data } = await getSingleDesign(product_id!);
          files = data?.files;
        }

        const fileUrl = files?.find((file) => file.type === "figma_code")?.file;
        const key = encodeURIComponent(fileUrl!);

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
          console.error("Failed to copy: ", err);
          toast.message("Failed to copy");
          return;
        }

        const { statusCode, message } = await updateDownloadHistory(
          user?.id!,
          currentPackage!,
          "design",
          {
            product_id: product_id!,
            type: type!,
            category: category,
            premium: premium!,
          },
        );
        if (statusCode !== 200) {
          toast.error(message);
          return;
        }
        setCopied(true);
        restartTimeout(setTimeout(() => setCopied(false), 2000));
      } catch (error) {
        toast.message("Something went wrong");
      }
    });
  };

  const handleCopyWebFlow = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }

    setCopied(false);
    startLoading(async () => {
      try {
        let key = "";
        if (!Array.isArray(files)) {
          const { data } =
            type === "page"
              ? await getWebflowPageById(product_id!)
              : await getWebflowSectionById(product_id!);
          key = encodeURIComponent(data?.code!);
        } else {
          const fileUrl = files?.find(
            (file) => file.type === "figma_code",
          )?.file;
          key = encodeURIComponent(fileUrl!);
        }

        const text = (await getDesignFileBlob(key)).data as string;
        const { statusCode, message } = await updateDownloadHistory(
          user?.id!,
          currentPackage!,
          "webflow",
          {
            product_id: product_id!,
            type: type!,
            category: category,
            theme: theme,
            premium: premium!,
          },
        );

        if (statusCode !== 200) {
          toast.error(message);
          return;
        }

        // Create a temporary element
        const tempElement = document.createElement("textarea");
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        // Trigger native copy event
        document.execCommand("copy");
        document.body.removeChild(tempElement);
        toast.message("Copied to clipboard");
        // (Optional) Listen to native 'copy' event for advanced control
        document.addEventListener("copy", (event) => {
          try {
            event.clipboardData?.setData("application/json", text);
            event.preventDefault();
          } catch (error) {
            console.error("Copy event failed:", error);
          }
        });
      } catch (error) {
        toast.message("Something went wrong");
      }
    });
  };

  return (
    <Comp
      {...props}
      onClick={format === "application/json" ? handleCopyWebFlow : handleCopy}
      disabled={isLoading}
      className={cn(className)}
    >
      <Slottable>{children as JSX.Element}</Slottable>
    </Comp>
  );
};

export default CopyButton;
