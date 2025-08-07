"use client";

import { TDownload } from "@/actions/downloads/types";
import { useState } from "react";
import InfinityDesignHistory from "./InfinityDesignHistory";

const DownloadFilter = ({ allDownloads }: { allDownloads: any }) => {
  const [activeButton, setActiveButton] = useState("design");
  const [filterDownloads, setFilterDownloads] = useState<
    TDownload["designs" | "webflows"]
  >(allDownloads.designs);

  const filterHandler = (type: string) => {
    if (type === "design") {
      setFilterDownloads(allDownloads.designs);
      setActiveButton("design");
    } else if (type === "webflow") {
      setFilterDownloads(allDownloads.webflows);
      setActiveButton("webflow");
    }
  };

  return (
    <div className="dark-gradient-bg relative mx-auto mb-8 w-full space-y-6 rounded-[20px] border border-border p-6 -tracking-[0.2px] sm:space-y-8 sm:p-8">
      <ul className="inline-flex rounded bg-background p-1">
        <li>
          <button
            onClick={() => filterHandler("design")}
            className={`rounded px-3 py-2 text-sm ${
              activeButton === "design" && "btn-gradient text-text-dark"
            }`}
          >
            Design
          </button>
        </li>
        <li>
          <button
            onClick={() => filterHandler("webflow")}
            className={`rounded px-3 py-2 text-sm ${
              activeButton === "webflow" && "btn-gradient text-text-dark"
            }`}
          >
            Webflow
          </button>
        </li>
      </ul>

      {activeButton === "design" ? (
        <InfinityDesignHistory
          downloadHistory={filterDownloads as TDownload["designs"]}
        />
      ) : (
        <InfinityDesignHistory
          isWebFlow={true}
          downloadHistory={filterDownloads as TDownload["webflows"]}
        />
      )}
    </div>
  );
};

export default DownloadFilter;
