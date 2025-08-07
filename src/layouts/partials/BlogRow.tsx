import { SubmitFormState } from "@/app/action/utils/types";
import BlogCard from "@/components/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "@/components/ui/title";
import { Separator } from "@/layouts/components/ui/separator";
import { cn } from "@/lib/utils/shadcn";
import { TBlog } from "@/types";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import React, { ForwardedRef, JSX, Suspense, forwardRef } from "react";

interface Props {
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  title?: string;
  description?: string;
  data: TBlog[];
  gradient?: boolean;
  gridClassName?: string;
  children?: React.ReactNode;
  containerClassName?: string;
  separator?: boolean;
  cardSize?: "default" | "lg";
  containerSize?: "default" | "full";
  isLoading?: boolean;
}

const BlogRow = forwardRef(
  (
    {
      className,
      isLoading,
      data: blogs,
      title,
      description,
      tag = "div",
      gradient,
      gridClassName,
      children,
      containerClassName,
      separator = true,
      cardSize = "default",
      containerSize = "default",
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const Comp = tag as any;
    const wrapperSize =
      containerSize === "default"
        ? "container-md"
        : containerSize === "full"
          ? "container-fluid"
          : "container-md";

    return (
      <Comp
        className={cn("relative", gradient && "overflow-hidden", className)}
      >
        {gradient && separator && <Separator />}
        <div
          className={cn(
            "relative py-[72px]",
            wrapperSize,
            !gradient && "pt-0",
            containerClassName,
          )}
        >
          {(title || description) && (
            <div className="mb-[26px] items-center justify-between gap-6 max-sm:text-center sm:flex">
              <div className="max-sm:mb-3">
                <Heading className="mb-1.5" level="h3" variant="gradient">
                  {title}
                </Heading>
                <p className="text-xs text-text-light">{description}</p>
              </div>
            </div>
          )}

          <div
            className={cn(
              "grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              gridClassName,
            )}
          >
            {typeof blogs === "function" ? (
              <Suspense
                fallback={[...Array(8)].map((_, i) => (
                  <BlogCardSkeleton key={i} cardSize={cardSize} />
                ))}
              >
                <RenderBlogs data={blogs} cardSize={cardSize} />
              </Suspense>
            ) : blogs.length <= 0 && !isLoading ? (
              <div className="col-span-4 min-h-screen py-10">
                <Heading className="mb-3" variant="gradient" level={"h2"}>
                  No Blogs Found!
                </Heading>
                <p className="text-xl text-muted-foreground">
                  We could not find any blog in this combination, try something
                  different
                </p>
              </div>
            ) : (
              blogs.map((blog, i) => (
                <BlogCard data={blog} key={i} size={cardSize} />
              ))
            )}
            {isLoading &&
              [...Array(4)].map((_, i) => (
                <BlogCardSkeleton
                  cardSize={cardSize}
                  key={i}
                  ref={i === 0 ? ref : null}
                />
              ))}
          </div>
        </div>
        {children}
      </Comp>
    );
  },
);

export default BlogRow;

const RenderBlogs = async ({
  data: blogs,
  cardSize,
}: {
  data: (() => Promise<SubmitFormState<TBlog[]>>) | TBlog[];
  cardSize: "default" | "lg";
}) => {
  blogs = typeof blogs === "function" ? (await blogs()).data! : [];
  return blogs?.map((blog, i) => (
    <BlogCard data={blog} key={i} size={cardSize} />
  ));
};

const BlogCardHeightVariants = cva("", {
  variants: {
    size: {
      default: "h-[230px]",
      lg: "h-[372px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const BlogCardSkeleton = forwardRef<
  HTMLDivElement,
  { cardSize: "default" | "lg" }
>(({ cardSize }, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className="group">
      <div className="relative from-[90%] after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-[60%] after:w-full after:bg-gradient-to-b after:from-[#0A0E1E00] after:to-[#0A0E1EE5] after:content-['']">
        <Skeleton
          className={clsx(
            BlogCardHeightVariants({
              size: cardSize,
            }),
          )}
        />
        <div className="absolute bottom-2 left-3 z-1 flex items-center gap-2.5 text-[9px] text-text-dark">
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
