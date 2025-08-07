"use client";

import { TDesign } from "@/actions/designs/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilter } from "@/hooks/useFilter";
import { API_URL, TOKEN } from "@/lib/constant";
import { mergeWithPipe } from "@/lib/utils/mergeWithPipe";
import BlurSvg from "@/partials/BlurSvg";
import ProductRow from "@/partials/ProductRow";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { INITIAL_FILTER } from "./data";

export default function InFinityProductLoader({
  category,
  license,
  title,
  type = "Design",
  search,
}: {
  category?: string;
  license?: string;
  title: string;
  search?: string;
  type?: "Icon" | "Design";
}) {
  const LIMIT = type === "Design" ? 40 : 128;
  const pathname = usePathname();
  const [totalProductFound, setProductTotalFound] = useState(0);
  const { filter, query, setFilter, setQuery } = useFilter();
  const debounceSearch = useDebounce<string>(query, 500);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, startLoading] = useTransition();
  const [currentPage, setPage] = useState<number>(0);
  // const { packageName, teamPackageName } = useContext(packageContext) || {};

  const [products, setProducts] = useState<TDesign[]>([]);
  const [controller, setController] = useState<AbortController | null>(null);
  const [preloadedProducts, setPreloadedProducts] = useState<TDesign[]>([]);
  const [preloadedPage, setPreloadedPage] = useState<number | null>(null);
  const usePreloadedForNextPage = useRef(false);

  const { ref } = useInView({
    threshold: 0,
    onChange(inView) {
      if (inView && hasMore) {
        if (preloadedProducts.length > 0 && preloadedPage !== null) {
          usePreloadedForNextPage.current = true;
          setPage(preloadedPage);
        } else {
          setPage((page) => page + 1);
        }
      }
    },
  });

  // Modify generateParams to accept an optional page parameter.
  const generateParams = (page?: number) => {
    const params = new URLSearchParams();
    const categories = filter.params
      .filter((param) => param.type === "category")
      .map((param) => param.value)
      .join(",");

    const type = filter.params
      .filter((param) => param.type === "type")
      .map((param) => param.value)
      .join(",");

    const licenses = filter.params
      .filter((param) => param.type === "license")
      .map((param) => param.value)
      .join(",");

    if (categories.length) {
      params.set("category", categories);
    }

    if (category?.length) {
      params.set("category", category);
    }

    if (type) {
      params.set("type", type);
    }

    if (licenses) {
      params.set("license", licenses);
    }

    if (license?.length) {
      params.set("license", license);
    }

    if (debounceSearch || filter.search || search) {
      params.set(
        "search",
        mergeWithPipe(
          !search?.length! ? debounceSearch : search!,
          !search?.length ? filter.search : "",
        ),
      );
    }

    if (search) {
      params.set("sub_search", mergeWithPipe(debounceSearch, filter.search));
    }

    if (filter.sort) {
      params.set("sortBy", filter.sort.split("-")[0]);
      params.set("sortOrder", filter.sort.split("-")[1]);
    }

    // set default sort order for premium users
    // if (packageName && packageName !== "free" && teamPackageName !== "free") {
    //   if (!filter.sort) {
    //     params.set("sortBy", "premium");
    //     params.set("sortOrder", "desc");
    //   }
    // }

    params.set("active", "true");
    params.set("page", (page !== undefined ? page : currentPage).toString());
    params.set("limit", LIMIT.toString());

    return params;
  };

  useEffect(() => {
    setProducts([]);
    setPage(0);
    setHasMore(true);
    setPreloadedProducts([]);
    setPreloadedPage(null);
    window.scroll(0, 0);
  }, [filter, debounceSearch]);

  useEffect(() => {
    // Use preloaded products for this page if available
    if (
      usePreloadedForNextPage.current &&
      preloadedProducts.length > 0 &&
      preloadedPage === currentPage
    ) {
      setProducts((prev) => [...prev, ...preloadedProducts]);
      // Clear preloaded state so next batch can be preloaded
      setPreloadedProducts([]);
      setPreloadedPage(null);
      usePreloadedForNextPage.current = false;
      return;
    }
    const params = generateParams();
    const abortController = new AbortController();
    setController(abortController);

    // if (!packageName) return;

    // Abort the previous request
    if (controller) {
      controller.abort();
    }

    startLoading(async () => {
      try {
        const url = type === "Design" ? "/design" : "/icon";

        const response = await fetch(API_URL + `${url}?${params}`, {
          headers: {
            "Content-Type": "application/json",
            authorization_token: `Bearer ${TOKEN}`,
          },
          method: "GET",
          signal: abortController.signal,
        });

        const data = await response.json();
        const result = data.result;
        if (result.length === 0) {
          setHasMore(false);
          setProductTotalFound(0);
        } else {
          const total = data.meta.total;
          setHasMore(!(total === products.length + data.result.length));
          setProductTotalFound(total);
          setProducts((prevProducts) => {
            const newProducts = [...prevProducts, ...data.result];
            return newProducts;
          });
        }
      } catch (error) {
        // @ts-ignore
        if (error.name !== "AbortError") {
          console.log(error);
        }
      }
    });

    return () => {
      abortController.abort();
    };
  }, [currentPage, debounceSearch, filter, search]);

  useEffect(() => {
    const url = type === "Design" ? "/design" : "/icon";
    const nextPage = currentPage + 1;
    // Only skip if we already have preloaded data for the next page
    if (!hasMore || preloadedPage === nextPage) return;
    const preloadParams = generateParams(nextPage);
    fetch(API_URL + `${url}?${preloadParams}`, {
      headers: {
        "Content-Type": "application/json",
        authorization_token: `Bearer ${TOKEN}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((preloadData) => {
        if (preloadData.result?.length) {
          setPreloadedProducts(preloadData.result);
          setPreloadedPage(nextPage);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.log(error);
        }
      });
  }, [
    currentPage,
    hasMore,
    preloadedPage,
    preloadedProducts,
    type,
    debounceSearch,
    filter,
    search,
  ]);

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
    <div className="flex flex-1 flex-col">
      <div className="h-full text-left">
        <ProductRow
          title={
            (pathname === "/icons"
              ? title
              : filter.params.length
                ? filter.params.map((param) => param.value).join(" & ")
                : `${title}`) + ` (${totalProductFound})`
          }
          description={`Browse ${title} Resources`}
          containerClassName="pt-7"
          containerSize="full"
          headingLevel="h2"
          data={products}
          gradient
          separator={false}
          isLoading={isLoading || hasMore}
          ref={ref}
          hasMore={!hasMore}
          gridClassName={
            type === "Icon"
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
              : ""
          }
          type={type}
        >
          {type === "Design" && (
            <BlurSvg
              className="absolute -top-[5%] right-[5%] -z-10 opacity-70 blur-[60px] max-md:w-[300px] md:right-[10%] md:top-0 md:blur-[100px]"
              width="607"
              height="175"
              viewBox="0 0 607 175"
              cx="303.5"
              cy="49"
              rx="303.5"
              ry="126"
            >
              <linearGradient
                id="paint0_linear_104_17271_1ereklr"
                x1="621.865"
                y1="101.92"
                x2="83.2028"
                y2="196.692"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FFDE67" />
                <stop offset="0.487258" stopColor="#FF808D" />
                <stop offset="1" stopColor="#AC5EFA" />
              </linearGradient>
            </BlurSvg>
          )}
        </ProductRow>
      </div>
    </div>
  );
}
