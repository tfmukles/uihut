"use client";

import { cn } from "@/lib/utils/shadcn";
import React from "react";

function BoxedIcon({
  children,
  className,
}: {
  children: React.ReactElement;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "boxed-icon relative inline-flex h-[65px] w-[65px] items-center justify-center overflow-hidden rounded-[22px]",
        className,
      )}
    >
      <span className="relative z-1 inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border border-[#3A3F51]">
        <span className="inline-block h-5 w-5">{children}</span>
      </span>
    </div>
  );
}

export default BoxedIcon;
