import { cn } from "@/lib/utils/shadcn";
import { ForwardedRef, forwardRef } from "react";
import { Skeleton } from "./ui/skeleton";

const ProductCardSkeleton = forwardRef<
  HTMLDivElement,
  { cardSize: "default" | "lg"; type: "Icon" | "Design" | "Webflow" }
>(({ cardSize, type = "Design" }, ref: ForwardedRef<HTMLDivElement>) => {
  if (type === "Icon") {
    return (
      <div
        ref={ref}
        className="border-border bg-muted relative border px-3 pt-2 pb-2"
      >
        <div className="mt-2 flex aspect-[4/3] flex-col items-center justify-center space-y-1 rounded bg-white p-3">
          <Skeleton className="bg-light h-12 w-12" />
          <Skeleton className="bg-light mt-px h-4 w-3/4" />
        </div>
        <div className="flex justify-between space-x-2.5 pt-2.5">
          <Skeleton className="bg-muted-foreground h-6 w-10 rounded" />
          <Skeleton className="bg-muted-foreground h-6 w-10 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className="group">
      <div className="relative from-[90%] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[60%] after:w-full after:bg-gradient-to-b after:content-['']">
        <Skeleton className={cn("aspect-[4/3]")} />
        <div className="text-text-dark absolute bottom-2 left-3 z-1 flex items-center gap-2.5 text-[9px]">
          <div className="inline-flex items-center gap-0.5">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-8" />
          </div>
          <div className="inline-flex items-center gap-0.5">
            <Skeleton className="h-3.5 w-3.5" />
            <Skeleton className="h-3 w-8" />
          </div>
        </div>
      </div>
      <div className="pt-2.5">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <Skeleton className="mb-2 h-5 w-1/2" />
            <div>
              <Skeleton className="inline-block h-3 w-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-4 translate-x-0 translate-y-0 transform transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </div>
      </div>
    </div>
  );
});

export default ProductCardSkeleton;
