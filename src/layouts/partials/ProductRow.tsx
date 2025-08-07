import { TDesign } from "@/actions/designs/types";
import { SubmitFormState } from "@/actions/utils/types";
import RequestForNewDesign from "@/app/(main)/(filter)/_components/RequestForNewDesign";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { CustomLink } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import { Separator } from "@/layouts/components/ui/separator";
import { cn } from "@/lib/utils/shadcn";
import Product from "@/partials/Product";
import { Button } from "@/types";
import { cva } from "class-variance-authority";
import React, { ForwardedRef, JSX, Suspense, forwardRef } from "react";

interface Props {
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  headingLevel?: "h1" | "h2";
  title?: string;
  description?: string;
  data: (() => Promise<SubmitFormState<TDesign[]>>) | TDesign[];
  gradient?: boolean;
  gridClassName?: string;
  children?: React.ReactNode;
  containerClassName?: string;
  separator?: boolean;
  cardSize?: "default" | "lg";
  containerSize?: "default" | "full";
  isLoading?: boolean;
  button?: Button;
  sort?: string;
  hasMore?: boolean;
  type?: "Icon" | "Design" | "Webflow";
}

const variants = cva("", {
  variants: {
    variant: {
      default: "container-md",
      full: "container-fluid",
    },
  },
});

const ProductRow = forwardRef(
  (
    {
      className,
      isLoading,
      data: products,
      headingLevel = "h2",
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
      button,
      sort,
      hasMore = false,
      type = "Design",
    }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const Comp = tag as keyof JSX.IntrinsicElements;

    return (
      <Comp
        className={cn("relative", gradient && "overflow-hidden", className)}
      >
        {separator && <Separator />}
        <div
          className={cn(
            "relative py-[72px]",
            variants({ variant: containerSize }),
            containerClassName,
          )}
        >
          {(title || description) && (type !== "Webflow" || description) && (
            <div className="mb-[26px] items-center justify-between gap-6 max-sm:text-center sm:flex">
              <div className="max-sm:mb-3">
                <Heading
                  className="sr-only mb-1.5 !text-h3 capitalize"
                  level={"h1"}
                  variant="gradient"
                >
                  {title}
                </Heading>
                <Heading
                  className="mb-1.5 !text-h3 capitalize"
                  level={headingLevel}
                  variant="gradient"
                >
                  {title}
                </Heading>
                <p className="text-sm capitalize text-text-light">
                  {description}
                </p>
              </div>
              {button && button.enable && (
                <CustomLink
                  href={button.link}
                  size="lg"
                  variant="outline-gradient"
                  glow
                  sort={sort}
                >
                  {button.label}
                </CustomLink>
              )}
            </div>
          )}

          <div
            className={cn(
              "grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              gridClassName,
            )}
          >
            {typeof products === "function" ? (
              <Suspense
                fallback={[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton
                    type={type}
                    key={i}
                    cardSize={cardSize}
                  />
                ))}
              >
                <RenderProducts
                  data={products}
                  cardSize={cardSize}
                  type={type}
                />
              </Suspense>
            ) : products.length <= 0 && !isLoading ? (
              <div className="min-h-screen py-10 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <Heading className="mb-3" variant="gradient" level={"h2"}>
                  No Product Found!
                </Heading>
                <p className="text-xl text-muted-foreground">
                  We could not find any product in this combination, try
                  something different
                </p>
              </div>
            ) : (
              <>
                {products.map((product, i) => (
                  <Product data={product} key={i} size={cardSize} type={type} />
                ))}
                {hasMore && type !== "Webflow" && (
                  <div
                    className={cn(
                      "py-10 text-center sm:col-span-2 lg:col-span-3 xl:col-span-4",
                      type === "Icon" &&
                        "col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-6 xl:col-span-8",
                    )}
                  >
                    <Heading className="mb-3" variant="gradient" level={"h4"}>
                      NO MORE PRODUCT
                    </Heading>
                    <RequestForNewDesign />
                  </div>
                )}
              </>
            )}

            {isLoading &&
              [...Array(type === "Design" ? 20 : 8)].map((_, i) => (
                <ProductCardSkeleton
                  type={type}
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

export default ProductRow;

const RenderProducts = async ({
  data: products,
  cardSize,
  type,
}: {
  data: (() => Promise<SubmitFormState<TDesign[]>>) | TDesign[];
  cardSize: "default" | "lg";
  type: "Icon" | "Design" | "Webflow";
}) => {
  products = typeof products === "function" ? (await products()).data! : [];
  return products?.map((product, i) => (
    <Product data={product} key={i} size={cardSize} type={type} />
  ));
};
