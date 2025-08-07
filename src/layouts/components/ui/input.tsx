import * as React from "react";

import { cn } from "@/lib/utils/shadcn";
import { VariantProps, cva } from "class-variance-authority";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  "form-input flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm   border-muted-foreground/50",
  {
    variants: {
      variant: {
        basic: "bg-background text-foreground",
        default:
          "input-gradient file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ring-offset-background",
        outline:
          "relative inline-flex items-center whitespace-nowrap text-sm font-medium gap-2 border border-light/20 bg-background hover:text-text-dark btn-outline relative before:opacity-0 hover:before:opacity-100 hover:border-transparent px-[22px] justify-start rounded-lg before:rounded-lg after:rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, ...props }, ref) => {
    if (variant === "outline") {
      return (
        <div className={cn(inputVariants({ variant, className }))}>
          <input
            className="absolute top-1/2 left-1/2 z-50 size-[calc(100%_-_16px)] -translate-x-1/2 -translate-y-1/2 rounded-none bg-transparent focus-within:border-0 focus-within:outline-none focus:border-0 focus:shadow-none focus:ring-0 focus-visible:ring-0"
            type={type}
            ref={ref}
            {...props}
            autoComplete="off"
          />
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, className }))}
        ref={ref}
        {...props}
        autoComplete="off"
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
