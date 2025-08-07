"use client";
import { IconInput } from "@/components/ui/icon-input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Heading from "@/components/ui/title";
import { useFilter } from "@/hooks/useFilter";
import useOs from "@/hooks/useOs";
import { cn } from "@/lib/utils/shadcn";
import { motion, useMotionValue } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import FilterSidebarMobile from "./FilterSidebarMobile";
import { SORT_OPTIONS } from "./data";

export default function FilterTop({
  isFiltered = true,
  categories,
  title,
  description,
}: {
  isFiltered?: boolean;
  categories: any[];
  description?: string;
  title: string;
}) {
  const pathname = usePathname();
  const isMacOs = useOs();
  const {
    isVisible,
    height,
    toggleSidebar,
    setQuery,
    query,
    setFilter,
    filter,
  } = useFilter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFiltered) {
      setFilter((prev) => ({ ...prev, search: query }));
      setQuery("");
    }
  };

  const top = useMotionValue(height);

  useEffect(() => {
    top.set(height);
  }, [height, top]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isMacOs && event.metaKey && event.key === "k") {
      inputRef.current?.focus();
    }

    if (event.ctrlKey && event.key === "k") {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMacOs]);

  const isWebflowPage = pathname === "/webflow-templates";

  return (
    <motion.div
      style={{ top }}
      transition={{ duration: 0.3, type: "tween" }}
      className={cn(
        "bg-background sticky left-0 z-30 transition-all",
        pathname === "/icons" && "static",
      )}
    >
      <div className="flex">
        {isFiltered && (
          <motion.div
            className="border-border hidden h-24 w-[344px] items-center justify-between gap-6 border-r border-b p-6 lg:flex"
            initial={{ width: 344 }}
            animate={isVisible ? { width: 344 } : { width: 80 }}
          >
            {isVisible && (
              <div>
                <Heading level="h3" className="!text-lg" variant="gradient">
                  {title}
                </Heading>
                {description && (
                  <p className="text-text-light text-sm capitalize">
                    {description}
                  </p>
                )}
              </div>
            )}
            <button
              className="ml-auto justify-self-end"
              type="button"
              onClick={toggleSidebar}
            >
              <svg
                width="25"
                height="13"
                viewBox="0 0 25 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 0L25 0V1H9V0Z" fill="#60677F" />
                <path
                  d="M1.94922 6H25V7H1.87891L4.24219 9.36395L3.53516 10.0711L0 6.53552L3.53516 3L4.24219 3.70709L1.94922 6Z"
                  fill="#60677F"
                />
                <path d="M25 12H9V13H25V12Z" fill="#60677F" />
              </svg>
            </button>
          </motion.div>
        )}
        <div className="border-border flex flex-1 flex-col justify-center border-b py-6 lg:h-24">
          {/* header */}

          <div className="container-fluid flex w-full flex-col items-baseline justify-between gap-4 md:flex-row">
            <form
              onSubmit={handleSubmit}
              className={cn(
                "relative flex-1 max-md:w-full",
                isWebflowPage && "max-lg:flex max-lg:space-x-3",
              )}
            >
              <IconInput
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                ref={inputRef}
                className="focus:border-muted-foreground/50 focus:outline-none"
              />

              {isWebflowPage && (
                <div className="flex flex-1 flex-grow-0 items-center gap-2 rounded-xl max-md:w-full">
                  <FilterSidebarMobile themes={categories} />
                </div>
              )}

              {query && (
                <button
                  type="button"
                  className={cn(
                    "bg-light/40 absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center rounded-full",
                    isWebflowPage && "max-lg:right-12",
                  )}
                  onClick={handleClearSearch}
                >
                  <svg
                    className="text-dark h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </form>

            {!isWebflowPage && (
              <div className="flex flex-1 items-center gap-2 rounded-xl max-md:w-full sm:flex-grow-0">
                <Select
                  onValueChange={(value) => {
                    setFilter((filter) => ({ ...filter, sort: value }));
                  }}
                  value={filter.sort}
                >
                  <SelectTrigger
                    id="sort-button"
                    title="sort"
                    className="input-gradient relative flex h-12 w-[230px] flex-1 items-center justify-normal space-x-3 focus:ring-0 focus:ring-offset-0 focus:outline-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none [&>span]:inline-block [&>span]:flex-1 [&>span]:text-left"
                  >
                    <span className="text-muted-foreground">Sort by</span>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-background text-text-light">
                    <SelectGroup>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem
                          className="data-[highlighted]:bg-dark data-[slate=checked]:bg-dark data-[highlighted]:text-text-dark data-[slate=checked]:text-text-light"
                          key={option.value}
                          value={option.value}
                        >
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Filter Menus For Mobile */}
                <FilterSidebarMobile categories={categories} />
              </div>
            )}
          </div>
          {/* header ends */}
        </div>
      </div>
    </motion.div>
  );
}
