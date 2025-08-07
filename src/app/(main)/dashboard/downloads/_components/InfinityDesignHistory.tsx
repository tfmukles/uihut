"use client";

import { TDownload } from "@/actions/downloads/types";
import Heading from "@/components/ui/title";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import DesignItem from "./DesignItem";

const LIMIT = 20;

export default function InfinityDesignHistory({
  downloadHistory,
  isWebFlow,
}: {
  downloadHistory: TDownload["designs"] | TDownload["webflows"];
  isWebFlow?: boolean;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const convertedData = (
    downloadHistory.flatMap((item) =>
      item.downloads.map((download) => ({
        product_id: item.product_id,
        title: item.title,
        thumbnail: "preview" in item ? item.preview : item.thumbnail,
        category: "category" in item ? item.category : "",
        type: item.type,
        date: download.date,
      })),
    ) || []
  ).reverse();

  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        if (convertedData.length <= currentPage * LIMIT) return;
        setCurrentPage((currentPage) => currentPage + 1);
      }
    },
  });

  const data = convertedData.slice(0, (currentPage - 1) * LIMIT + LIMIT);

  return (
    <>
      {convertedData?.length > 0 ? (
        data?.map((item, index) => {
          return (
            <DesignItem
              isWebFlow={isWebFlow}
              {...(data.length === index + 1 && { ref })}
              key={index}
              item={item}
            />
          );
        })
      ) : (
        <Heading className="py-24 text-center" level={"h3"}>
          No download History found
        </Heading>
      )}
    </>
  );
}
