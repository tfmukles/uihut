"use client";

import { TDesign } from "@/actions/designs/types";
import { TIcon } from "@/actions/icons/types";
import { getWebFlowThemeBySlug } from "@/actions/webflow";
import { TWebflowTheme } from "@/actions/webflow/types";
import CopyButton from "@/components/CopyButton";
import CopyIcon from "@/components/CopyIcon";
import DownloadIcon from "@/components/DownloadIcon";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import BlurImage from "@/helpers/BlurImage";
import { useFilter } from "@/hooks/useFilter";
import { usePackage } from "@/hooks/usePackage";
import { BUCKET_URL } from "@/lib/constant";
import { groupByTheme } from "@/lib/groupByTheme";
import { cn } from "@/lib/utils/shadcn";
import { titleify } from "@/lib/utils/textConverter";
import { ClipboardCheck, Copy, Download, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

// Webflow product
function WebflowProduct({
  data,
  size,
}: {
  data: TWebflowTheme & {
    preview?: string;
    demo?: string;
    category?: string;
    product_id?: string;
    code?: string;
    premium?: boolean;
  };
  size: string;
}) {
  const router = useRouter();
  const { filter, setFilter, setGroupByData } = useFilter();
  const activeFilter = filter.params.find((param) =>
    ["page", "section", "themes"].includes(param.type),
  );
  const { thumbnail, title, slug } = data;
  const [isPending, startLoading] = useTransition();
  const currentPackage = usePackage();

  const handleViewTheme = async () => {
    router.push(`/webflow-templates`);
    try {
      setGroupByData((prev) => ({
        ...prev!,
        status: "loading",
      }));
      const { data: themes } = await getWebFlowThemeBySlug(slug);
      const groups = groupByTheme({
        selectedWebflowTheme: themes!,
      });
      setGroupByData({
        selectedWebflowTheme: slug!,
        ...groups,
        status: "success",
      });
      setFilter({
        ...filter,
        params: [
          {
            label: slug,
            type: "page",
            value: groups.pages[0].page,
          },
        ],
      });
    } catch (error) {
      setGroupByData((prev) => ({
        ...prev!,
        status: "error",
      }));
    }
  };

  return (
    <div className={`relative h-full ${!activeFilter?.type && "pb-14"}`}>
      <div className="group bg-background relative block">
        <BlurImage
          containerClass={cn("block aspect-[4/3] w-full bg-muted")}
          className={`bg-muted size-full ${
            activeFilter?.type === "section"
              ? "object-contain"
              : "object-cover object-top"
          }`}
          src={`${BUCKET_URL}/${thumbnail || data.preview}`}
          alt={title}
          width={370}
          height={size === "default" ? 275 : 400}
        />
        {data.demo && (
          <div className="absolute inset-0 z-30 bg-black/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full items-center justify-center">
              <Link
                target="_blank"
                className={buttonVariants({})}
                href={`${data.demo}`}
              >
                View Demo
              </Link>
            </div>
          </div>
        )}
        {!activeFilter?.type && (
          <div className="absolute inset-0 z-30 bg-black/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex h-full items-center justify-center">
              <Button
                className={buttonVariants({})}
                disabled={isPending}
                onClick={() => startLoading(handleViewTheme)}
              >
                View Theme
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="pt-2.5">
        <Heading
          className="stretched-link mb-2 line-clamp-1 text-base font-normal"
          level="h5"
        >
          {title}
        </Heading>
        {data.description && (
          <p className="text-foreground/75 text-sm">{data.description}</p>
        )}
        {activeFilter?.type && (
          <div className="text-text flex items-center justify-between text-xs">
            {data.category && (
              <span className="mr-2">{titleify(data.category)}</span>
            )}
            {data?.premium ? (
              <Badge className="mr-auto" variant="accent-outline" size="sm">
                Pro
              </Badge>
            ) : (
              <Badge className="mr-auto" variant="success-outline" size="sm">
                Free
              </Badge>
            )}
            {currentPackage !== "free" || !data?.premium ? (
              <CopyButton
                product_id={data.product_id}
                premium={data.premium}
                type={activeFilter.type}
                theme={activeFilter.label}
                files={[
                  {
                    type: "figma_code",
                    file: data.code!,
                  },
                ]}
                format="application/json"
                className="hover:bg-background relative z-50 ml-auto h-8 w-auto flex-none rounded py-1"
                variant={"ghost"}
                size={"icon"}
                loadingComponent={<Spinner className="size-4" />}
                successComponent={<ClipboardCheck className="size-4" />}
              >
                <Copy className="size-4" />
              </CopyButton>
            ) : (
              <Link
                className={buttonVariants({
                  variant: "link",
                  className:
                    "clip-gradient btn-gradient relative z-50 w-auto from-[10%] !px-0",
                })}
                href={`/pricing`}
              >
                <Lock className="size-4" />
                Unlock
              </Link>
            )}
          </div>
        )}
      </div>
      {!activeFilter?.type && (
        <Button
          className="border-border from-primary to-secondary absolute bottom-0 z-30 h-auto w-full border from-[70%] py-2.5 hover:bg-gradient-to-r hover:text-white md:hidden"
          variant={"basic"}
          disabled={isPending}
          onClick={() => startLoading(handleViewTheme)}
        >
          View theme
        </Button>
      )}
    </div>
  );
}

// Icon product
function IconProduct({ data, size }: { data: TIcon; size: string }) {
  const { figma_code, product_id, thumbnail, title } = data;
  return (
    <div className="border-border bg-muted/50 relative border px-3 pt-3.5 pb-1">
      <div className="flex aspect-[4/3] flex-col items-center justify-center space-y-1 rounded bg-white p-3">
        <Image
          className="mx-auto h-12 w-12"
          src={`${BUCKET_URL}/${thumbnail}`}
          alt={title}
          width={43}
          height={48}
          loading="lazy"
        />
        <p className="text-dark mt-px line-clamp-1 text-center text-xs">
          {title}
        </p>
      </div>
      <div className="flex justify-between space-x-2.5 pt-2.5">
        <CopyIcon
          className="hover:bg-background h-8 flex-1 rounded py-1"
          variant={"ghost"}
          size={"icon"}
          product_id={product_id}
          figma_code={figma_code}
          loadingComponent={<Spinner className="size-4" />}
          successComponent={<ClipboardCheck className="size-4" />}
        >
          <Copy className="size-4" />
        </CopyIcon>
        <DownloadIcon
          className="hover:bg-background h-8 flex-1 rounded py-1"
          variant={"ghost"}
          size={"icon"}
          product={data}
          loadingComponent={<Spinner className="size-4" />}
        >
          <Download className="size-4" />
        </DownloadIcon>
      </div>
    </div>
  );
}

// Design product
function DesignProduct({ data, size }: { data: TDesign; size: string }) {
  const { category, premium, product_id, thumbnail, title } = data;
  return (
    <div className="relative">
      <BlurImage
        containerClass={cn("block aspect-[4/3] w-full bg-white")}
        className="h-full w-full object-cover"
        src={`${BUCKET_URL}/${thumbnail}`}
        alt={title}
        width={370}
        height={size === "default" ? 275 : 400}
      />
      <div className="pt-2.5">
        <Heading className="mb-2 text-base font-normal" level="h3">
          <Link
            className="stretched-link group text-text flex w-full justify-between text-base"
            href={`/designs/${product_id}`}
          >
            <span className="line-clamp-1 pr-3">{title}</span>
          </Link>
        </Heading>
        <div className="text-text text-xs">
          <span className="text-muted-foreground">Design in</span>{" "}
          {titleify(category)}
          {premium ? (
            <Badge className="ml-2" variant="accent-outline" size="sm">
              Pro
            </Badge>
          ) : (
            <Badge className="ml-2" variant="success-outline" size="sm">
              Free
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}

// main component
function Product({
  data,
  size,
  type = "Design",
}: {
  data: TIcon | TDesign | TWebflowTheme;
  size: string;
  type: "Icon" | "Design" | "Webflow";
}) {
  if (type === "Webflow")
    return <WebflowProduct data={data as TWebflowTheme} size={size} />;
  if (type === "Icon") return <IconProduct data={data as TIcon} size={size} />;
  return <DesignProduct data={data as TDesign} size={size} />;
}

export default Product;
