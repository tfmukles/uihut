import { cn } from "@/lib/utils/shadcn";
import React from "react";

function DiscountTag({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative ml-1.5 inline-block h-[22px] rounded-3xl bg-gradient-to-r from-primary from-[0%] via-[#FF808D] via-[64%] to-[#FFDE67] to-[100%] px-2.5 py-1 align-middle text-xs tracking-normal before:absolute before:inset-[1px] before:rounded-3xl before:bg-background before:content-['']",
        className,
      )}
    >
      <span className="clip-gradient relative bg-gradient-to-l from-[#FF808D] from-[-6%] to-primary to-[28.36%]">
        {children}
      </span>
    </div>
  );
}

export default DiscountTag;
