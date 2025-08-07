"use client";

import { useFilter } from "@/hooks/useFilter";
import { cn } from "@/lib/utils/shadcn";
import React, { JSX } from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const defaultIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.875 12.375C9.63642 12.375 11.875 10.1364 11.875 7.375C11.875 4.61358 9.63642 2.375 6.875 2.375C4.11358 2.375 1.875 4.61358 1.875 7.375C1.875 10.1364 4.11358 12.375 6.875 12.375Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.125 13.625L10.4062 10.9062"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface ExtendedInputProps extends InputProps {
  icon?: React.ReactNode;
  placeholder?: string;
  enableSearch?: boolean;
}

const IconInput = React.forwardRef<HTMLInputElement, ExtendedInputProps>(
  (
    {
      className,
      icon,
      enableSearch = false,
      placeholder = "Search...",
      id,
      ...props
    },
    ref,
  ) => {
    const { toggleSearchModal, openSearchModal } = useFilter();

    return (
      <>
        <div className="w-[inherit] flex-1 rounded-xl p-[3px]">
          <fieldset className={cn("relative flex items-center gap-3")}>
            <Label
              className="absolute left-0 top-0 inline-flex h-12 w-10 cursor-pointer items-center justify-center text-muted-foreground"
              htmlFor={id}
            >
              {(icon || defaultIcon) as JSX.Element}
            </Label>
            <Input
              {...props}
              id={id}
              ref={ref}
              placeholder={placeholder}
              onFocus={() => {
                if (!openSearchModal && enableSearch) {
                  toggleSearchModal();
                }
              }}
              className={cn(
                "input-gradient h-12 pl-10 focus:outline-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
                className,
              )}
            />
          </fieldset>
        </div>
      </>
    );
  },
);

IconInput.displayName = "IconInput";

export { IconInput };
