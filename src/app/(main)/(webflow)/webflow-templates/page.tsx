"use client";

import { getWebFlowThemeBySlug, getWebFlowThemes } from "@/actions/webflow";
import { TWebflowTheme, WebflowThemeCollection } from "@/actions/webflow/types";
import { buttonVariants } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import { useFilter } from "@/hooks/useFilter";
import { cn } from "@/lib/utils/shadcn";
import ProductRow from "@/partials/ProductRow";
import SeoMeta from "@/partials/SeoMeta";
import { ChevronLeft, Copy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { INITIAL_FILTER } from "../../(filter)/_components/data";

export default function WebFlow() {
  const pathname = usePathname();
  const { filter, query, setFilter, setQuery, groupByData } = useFilter();
  const [styleGuideUrl, setStyleGuide] = useState<string>();
  const [isLoading, startLoading] = useTransition();
  const params = filter.params.find((param) =>
    ["page", "section", "themes"].includes(param.type),
  );

  const [products, setProducts] = useState<
    | TWebflowTheme[]
    | WebflowThemeCollection["pages"]
    | WebflowThemeCollection["sections"]
  >();

  useEffect(() => {
    startLoading(async () => {
      if (params?.value.length) {
        const { data } = await getWebFlowThemeBySlug(params?.label);
        const key = params.type === "page" ? "pages" : "sections";
        // @ts-ignore
        setProducts(data![key]);
        setStyleGuide(data?.style_guide);
      } else {
        const { data } = await getWebFlowThemes();
        setProducts(data!);
      }
    });
  }, [params?.type, params?.label, params?.value]);

  const filterProducts = products?.filter((product) => {
    const searchQuery = query.toLowerCase();
    const licenses = filter.params.filter((param) => param.type === "license");

    // Apply search filtering to title
    const matchesSearch =
      product.title?.toLowerCase().includes(searchQuery) ?? true;

    // Check license matching
    const matchesLicense =
      licenses.length && params?.value
        ? licenses.some((license) => {
            if (license.value === "free") {
              // @ts-ignore
              return product.premium === false;
            } else if (license.value === "premium") {
              // @ts-ignore
              return product.premium === true;
            }
            return false;
          })
        : true; // If no licenses are provided, include all products.

    if (params?.type === "page") {
      const matchesPage =
        // @ts-ignore
        product?.page?.toLowerCase() === params?.value?.toLowerCase();
      return matchesPage && matchesSearch && matchesLicense;
    }

    if (params?.type === "section") {
      const matchesSection =
        // @ts-ignore
        product?.category?.toLowerCase() === params?.value.toLowerCase();
      return matchesSection && matchesSearch && matchesLicense;
    }

    return matchesSearch && matchesLicense;
  });

  useEffect(() => {
    return () => {
      const nextUrl = window.location.pathname;
      if (nextUrl !== pathname) {
        setFilter(INITIAL_FILTER);
        setQuery("");
      }
    };
  }, []);

  return (
    <>
      <SeoMeta
        title={"WebFlow Templates"}
        meta_title={"Webflow Templates for Modern Websites - UIHut"}
        description={
          "Discover premium Webflow templates at UIHut for responsive and modern websites. Perfect for designers and businesses to build websites effortlessly!"
        }
      />

      <div id="products" className="flex flex-1 flex-col">
        <div className="h-full text-left">
          {params?.type && (
            <div className="flex items-center justify-between px-4 py-3">
              {params?.label && (
                <button
                  onClick={() => {
                    setFilter(INITIAL_FILTER);
                    setQuery("");
                  }}
                  aria-label="Back to all templates"
                >
                  <Heading level={"h4"} className="capitalize">
                    <ChevronLeft className="-mt-1 mr-2 inline-block size-6" />
                    {params?.label}
                  </Heading>
                </button>
              )}
              {styleGuideUrl && (
                <div className="ml-auto flex items-center justify-between space-x-3">
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                      className: cn("h-auto py-2.5"),
                    })}
                    href={styleGuideUrl! ?? ""}
                    {...(styleGuideUrl ? { target: "_blank" } : {})}
                  >
                    <Copy className="relative z-10 h-4 w-4 text-text-dark" />
                    <span className="relative z-10">Clone Style guide</span>
                  </Link>
                </div>
              )}
            </div>
          )}
          <ProductRow
            title={""}
            description={""}
            containerClassName="pt-7"
            containerSize="full"
            headingLevel="h1"
            // @ts-ignore
            data={filterProducts ?? []}
            gradient
            separator={false}
            isLoading={
              isLoading || !products || groupByData?.status === "loading"
            }
            hasMore={true}
            type={"Webflow"}
          />
        </div>
      </div>
    </>
  );
}
