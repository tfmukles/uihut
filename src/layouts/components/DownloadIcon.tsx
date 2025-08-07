"use client";

import { TIcon } from "@/actions/icons/types";
import { UserStatusType } from "@/actions/user/types";
import { fetchApi } from "@/actions/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { JSX, useState } from "react";
import { toast } from "sonner";

interface DownloadIconProps extends ButtonProps {
  product: Partial<TIcon>;
  loadingComponent?: JSX.Element;
}

const DownloadIcon = ({
  asChild,
  product,
  children,
  className,
  loadingComponent,
  ...buttonProps
}: DownloadIconProps) => {
  const { data: session, status } = useSession();
  const { illustration, product_id } = product;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = session || {};

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

  const shouldDisable = !user?.accessToken;

  const handleDownload = async () => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    setLoading(true);
    if (!user || !product_id) {
      toast.error("Missing required information for download");
      setLoading(false);
      return;
    }

    if (user.status === UserStatusType.RESTRICTED) {
      toast.error("Your account is restricted. Please contact support.");
      setLoading(false);
      return;
    }

    try {
      await getPresignedUrl(illustration!);
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
      className={cn(className, shouldDisable && "cursor-default opacity-50")}
    >
      <Slottable>
        {loading ? loadingComponent : (children as JSX.Element)}
      </Slottable>
    </Comp>
  );
};

export default DownloadIcon;
