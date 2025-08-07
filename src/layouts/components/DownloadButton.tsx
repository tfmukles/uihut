"use client";

import { getSingleDesign } from "@/actions/designs";
import { TDesign } from "@/actions/designs/types";
import { updateDownloadHistory } from "@/actions/downloads";
import { fetchApi } from "@/actions/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { packageContext } from "@/helpers/PackageProvider";
import { cn } from "@/lib/utils/shadcn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX, useContext, useState } from "react";
import { toast } from "sonner";

interface DownloadButtonProps extends ButtonProps {
  product: Partial<TDesign>;
  loadingComponent?: JSX.Element;
  isIcon?: boolean;
}

const DownloadButton = ({
  asChild,
  product,
  children,
  className,
  loadingComponent,
  ...buttonProps
}: DownloadButtonProps) => {
  const { data: session, status } = useSession();
  const { packageName, teamPackageName } = useContext(packageContext) || {};
  let { files, product_id, type, category, premium } = product;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = session || {};

  const currentPackage = packageName !== "free" ? packageName : teamPackageName;

  const getPresignedUrl = async (key: string) => {
    try {
      const encodedKey = encodeURIComponent(key);
      const endpoint = `/bucket/download/${encodedKey}`;
      const { body } = await fetchApi<any>({
        endPoint: endpoint,
        method: "GET",
      });
      router.push(body.url);
    } catch (error) {
      console.error("Failed to get presigned URL", error);
    }
  };

  const Comp = asChild ? Slot : Button;

  const handleDownload = async () => {
    setLoading(true);
    if (!user || !product_id) {
      toast.error("Missing required information for download");
      return;
    }

    const { statusCode, message } = await updateDownloadHistory(
      user.id!,
      currentPackage!,
      "design",
      {
        product_id: product_id,
        type: type!,
        category: category,
        premium: premium!,
      },
    );

    if (statusCode !== 200) {
      toast.error(message);
      setLoading(false);
      return;
    }

    try {
      if (!Array.isArray(files)) {
        const { data } = await getSingleDesign(product_id);
        files = data?.files;
      }

      const fileUrl = files?.find((file) =>
        ["illustration", "figma"].includes(file.type),
      )?.file;

      if (!fileUrl) {
        setLoading(false);
        toast.error("Download failed");
        return;
      }

      await getPresignedUrl(fileUrl);
      setLoading(false);
    } catch (error) {
      toast.error("Download failed");
    } finally {
      router.refresh();
    }
  };

  return (
    <Comp
      {...buttonProps}
      onClick={handleDownload}
      disabled={loading}
      className={cn(className)}
    >
      <Slottable>
        {loading ? loadingComponent : (children as JSX.Element)}
      </Slottable>
    </Comp>
  );
};

export default DownloadButton;
