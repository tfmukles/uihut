import * as React from "react";

import { cn } from "@/lib/utils/shadcn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "border-input focus:ring-none ring-offset-background placeholder:text-muted-foreground border-muted-foreground/50 bg-background flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
