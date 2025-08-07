"use client";

import {
  FilterParam,
  INITIAL_FILTER,
  TFilter,
} from "@/app/(main)/(filter)/_components/data";
import { usePathname } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export type context = {
  isVisible: boolean;
  toggleSidebar: () => void;
  filter: TFilter;
  setFilter: Dispatch<SetStateAction<TFilter>>;
  categories: FilterParam[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  openSearchModal: boolean;
  toggleSearchModal: () => void;
  groupByData: {
    selectedWebflowTheme: string;
    status: "loading" | "success" | "error";
    pages: { page: string; variant: number }[];
    sections: { section: string; variant: number }[];
  } | null;
  setGroupByData: React.Dispatch<
    React.SetStateAction<{
      selectedWebflowTheme: string;
      status: "loading" | "success" | "error";
      pages: { page: string; variant: number }[];
      sections: { section: string; variant: number }[];
    } | null>
  >;
};

export const filterContext = React.createContext<context | null>(null);

export function FilterProvider({
  children,
  categories = [],
}: {
  children: React.ReactNode;
  categories: FilterParam[];
}) {
  const [height, setHeight] = useState(0);
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const toggleSidebar = () => {
    setIsVisible(!isVisible);
  };
  const [filter, setFilter] = useState<TFilter>(INITIAL_FILTER);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const toggleSearchModal = () => {
    setOpenSearchModal(!openSearchModal);
  };
  const [groupByData, setGroupByData] = useState<{
    selectedWebflowTheme: string;
    status: "loading" | "success" | "error";
    pages: { page: string; variant: number }[];
    sections: { section: string; variant: number }[];
  } | null>(null);

  useEffect(() => {
    setOpenSearchModal(false);
  }, [pathname]);

  return (
    <filterContext.Provider
      value={{
        isVisible,
        toggleSidebar,
        openSearchModal: openSearchModal,
        toggleSearchModal,
        filter,
        setFilter,
        categories,
        query,
        setQuery,
        height,
        setHeight,
        groupByData,
        setGroupByData,
      }}
    >
      {children}
    </filterContext.Provider>
  );
}
