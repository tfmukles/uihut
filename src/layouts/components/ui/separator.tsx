"use client";

import { cn } from "@/lib/utils/shadcn";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    size?: "default" | "lg";
  }
>(
  (
    {
      className,
      orientation = "horizontal",
      size = "default",
      decorative = true,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-divider-lg shrink-0",
        orientation === "horizontal"
          ? "h-[1px] w-full"
          : "vertical h-full w-[1px]",
        size === "default" && "bg-divider",
        size === "lg" && "bg-divider-lg",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
