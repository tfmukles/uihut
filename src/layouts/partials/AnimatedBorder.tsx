import { cn } from "@/lib/utils/shadcn";
import React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

function AnimatedBorder({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        "animated-border before:conic-gradient-lg relative overflow-hidden rounded-xl border border-border p-[3px] before:absolute before:left-1/2 before:top-1/2 before:aspect-video before:h-[999px] before:origin-center before:rounded-xl after:absolute after:inset-[1px] after:rounded-xl after:bg-background after:content-['']",
        className,
      )}
      {...props}
    >
      <div className="relative z-1">{children}</div>
    </div>
  );
}

export default AnimatedBorder;
