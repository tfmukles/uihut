import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils/shadcn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        "secondary-outline":
          "border-secondary bg-transparent text-secondary hover:bg-secondary/80",
        success:
          "border-transparent bg-success text-success-foreground hover:bg-success/80",
        "success-outline": "border-success text-success",
        warning:
          "border-transparent bg-[#f59e0b] text-[#fff] hover:bg-[#f59e0b]/80",
        "warning-outline": "border-[#f59e0b] text-[#f59e0b]",
        accent:
          "border-transparent bg-accent text-accent-foreground hover:bg-accent/80",
        "accent-outline": "border-accent text-accent",
      },
      size: {
        default: "h-[22px]",
        sm: "h-[18px] text-xs px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
