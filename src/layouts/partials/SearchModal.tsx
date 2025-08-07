"use client";

import { getDesigns } from "@/actions/designs";
import { TDesign } from "@/actions/designs/types";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-input";
import { Separator } from "@/components/ui/separator";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { useDebounce } from "@/hooks/useDebounce";
import { useFilter } from "@/hooks/useFilter";
import useOs from "@/hooks/useOs";
import { BUCKET_URL } from "@/lib/constant";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useTransition } from "react";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const SearchModal: React.FC<Props> = ({ isOpen, toggle }) => {
  const isMacOs = useOs();
  const pathname = usePathname();
  const params = new URLSearchParams();
  const router = useRouter();
  const { query, setQuery } = useFilter();
  const [searchString, setSearchString] = useState(query);
  const [isLoading, startLoading] = useTransition();
  const [searchResult, setSearchResult] = useState<TDesign[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceSearch = useDebounce<string>(searchString, 500);

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggle();
      setSearchString("");
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (pathname === "/designs" || pathname === "/icons") {
      return;
    }

    if (isMacOs && event.metaKey && event.key === "k" && !isOpen) {
      toggle();
      setSearchString("");
    }

    if (event.ctrlKey && event.key === "k" && !isOpen) {
      toggle();
      setSearchString("");
    }

    if (event.key === "Escape" && isOpen) {
      toggle();
      setSearchString("");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    if (isOpen) {
      inputRef.current?.focus();
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isMacOs]);

  const handleClearSearch = () => {
    setSearchString("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (debounceSearch.length >= 3) {
      startLoading(async () => {
        params.set("search", debounceSearch);
        params.set("limit", "20");
        const res = await getDesigns(params.toString());
        setSearchResult(res.data!);
      });
    } else {
      setSearchResult([]);
    }
  }, [debounceSearch]);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    setQuery(searchString);
    // setFilter((prev) => ({ ...prev, search: searchString }));
    toggle();
    router.push("/designs");
  };

  const content = () => {
    if (searchString.length === 0) {
      return (
        <p className="text-text-light py-10 text-center">
          Type something to search
        </p>
      );
    } else if (searchString.length < 3) {
      return (
        <p className="text-text-light py-10 text-center">
          Type at least 3 characters to search
        </p>
      );
    } else if (searchString !== debounceSearch || isLoading) {
      return (
        <div className="text-text-light flex items-center justify-center py-10 text-center">
          <Spinner />
        </div>
      );
    } else if (searchResult?.length === 0 && !isLoading) {
      return (
        <p className="text-text-light py-10 text-center">No search found</p>
      );
    } else {
      return (
        <div>
          {searchResult?.map((searchProduct, index) => (
            <div
              key={index}
              className={`bg-muted hover:bg-background relative cursor-pointer space-y-4 px-3 pt-4`}
            >
              <div className="flex">
                <div className="mr-4">
                  <img
                    src={`${BUCKET_URL}/${searchProduct.thumbnail}`}
                    alt={searchProduct.title}
                    width={80}
                    height={64}
                    className="h-[64px] w-[80px] bg-white object-cover"
                  />
                </div>
                <div>
                  <Heading level={"h6"}>{searchProduct.title}</Heading>
                  <p className="text-sm">{searchProduct.category}</p>
                </div>

                <Link
                  className="stretched-link"
                  href={`/designs/${searchProduct.product_id}`}
                />
              </div>

              <Separator className="w-full" />
            </div>
          ))}
          {searchResult?.length > 0 && (
            <div className="w-full py-3 text-center">
              <Button onClick={handleSubmit} className="mx-auto">
                See More
              </Button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div
      className={`bg-background/75 fixed inset-0 z-50 flex items-start justify-center p-4 pt-24 backdrop-blur-sm transition-opacity ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div
        ref={modalRef}
        className="relative z-50 w-full max-w-xl rounded-[8px] bg-transparent text-left shadow-lg"
      >
        <div className="mb-0.5 flex w-full items-center justify-between">
          <form className="relative flex-1" onSubmit={handleSubmit}>
            <IconInput
              type="text"
              icon={<Search className="text-text/50 h-5 w-5" />}
              className="bg-background focus:border-border w-full flex-1 py-2 pr-8 pl-10 text-gray-300 placeholder-gray-400 focus:outline-none"
              placeholder="Search..."
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
                setSearchResult([]);
              }}
              ref={inputRef}
            />

            {searchString && (
              <button
                type="button"
                className="bg-light/40 absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 transform items-center justify-center rounded-full"
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
        </div>
        <div className="p-[3px]">
          <div className="input-gradient border-border max-h-[calc(100vh-250px)] overflow-y-auto rounded-[9px] border">
            {content()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
