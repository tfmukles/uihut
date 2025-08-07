"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { useFilter } from "@/hooks/useFilter";
import { cn } from "@/lib/utils/shadcn";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    role?: "toggle" | "switch";
  }
>(({ className, role = "switch", ...props }, ref) => {
  const { setFilter } = useFilter();

  return (
    <SwitchPrimitives.Root
      className={cn(
        "data-[state=unchecked]:bg-input peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary",
        role === "toggle" && "bg-primary",
        role === "switch" &&
          "border border-border data-[state=checked]:border-primary",
        className,
      )}
      {...props}
      ref={ref}
      onCheckedChange={(value) => {
        if (role === "switch") {
          props.onCheckedChange?.(value);
          return;
        }

        setFilter((prev) => ({
          ...prev,
          params: prev.params
            .filter((param) => param.type !== "license")
            .concat(
              value
                ? [
                    {
                      label: "Free",
                      value: "free",
                      type: "license",
                    },
                  ]
                : [],
            ),
        }));
      }}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
          role === "switch" &&
            "data-[state=checked]:translate-x-[21px] data-[state=unchecked]:translate-x-px",
        )}
      />
    </SwitchPrimitives.Root>
  );
});

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
