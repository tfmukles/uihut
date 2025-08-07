"use client";

import { useFilter } from "@/hooks/useFilter";
import { cn } from "@/lib/utils/shadcn";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:[&_.glow]:opacity-[40%] gap-2 -tracking-[0.62px]",
  {
    variants: {
      variant: {
        basic: "bg-background text-foreground",
        default:
          "btn-gradient text-primary-foreground hover:bg-primary/90 relative ",
        starry: "btn-gradient text-text-dark btn-starry relative",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-light/20 bg-background hover:text-text-dark btn-outline relative before:rounded-lg after:rounded-lg before:opacity-0 hover:before:opacity-100 hover:border-transparent",
        "outline-gradient":
          "border border-transparent bg-transparent btn-outline relative rounded-3xl text-foreground",
        secondary: "bg-light text-light-foreground hover:bg-light/80",
        ghost: "hover:bg-dark hover:text-text-light",
        link: "text-primary underline-offset-4 hover:underline",
        tag: "bg-muted border text-[10px] lg:text-xs rounded-full border-muted-foreground/10 text-muted-foreground btn-outline relative before:opacity-0 hover:before:opacity-100 cursor-pointer before:transition-opacity hover:text-foreground after:bg-muted hover:border-transparent",
      },
      size: {
        default: "h-9 px-[22px] py-2",
        sm: "h-8 rounded-md px-[22px]",
        lg: "h-[38px] rounded-md px-[26px]",
        xl: "h-11 px-[22px] rounded-lg",
        icon: "h-10 w-10",
        tag: "h-8 px-3.5",
        filter: "h-8  px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { glow?: boolean; starryClass?: string; isProtected?: boolean }
>(
  (
    {
      className,
      variant,
      size,
      value,
      asChild = false,
      glow,
      isProtected,
      starryClass,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const { setFilter } = useFilter();
    const Comp = asChild ? Slot : "button";
    const pathname = usePathname();

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        {...((value || isProtected) && {
          onClick: (e) => {
            if (value) {
              setFilter((prev) => ({ ...prev, search: value as string }));
              router.push("/designs");
            }

            if (isProtected) {
              router.push(`/login?from=${pathname}`);
            }

            if (props.onClick) props.onClick(e as any);
          },
        })}
      >
        <>
          {variant === "starry" && (
            <span className={cn("starry", starryClass)}></span>
          )}
          <span className="z-[1] flex items-center gap-2 text-inherit">
            <Slottable>{props.children as React.JSX.Element}</Slottable>
          </span>
          {glow && <span className="glow"></span>}
        </>
      </Comp>
    );
  },
);
Button.displayName = "Button";

interface CustomLinkProps extends VariantProps<typeof buttonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  starryClass?: string;
  glow?: boolean;
  target?: string;
  rel?: string;
  sort?: string;
}

const CustomLink = React.forwardRef<any, CustomLinkProps>(
  (
    {
      href,
      sort,
      children,
      variant,
      size,
      className,
      starryClass,
      glow,
      ...rest
    },
    ref,
  ) => {
    const { setFilter, filter } = useFilter();
    return (
      <Link
        onClick={() => {
          if (sort) {
            setFilter({
              ...filter,
              sort: sort,
            });
          }
        }}
        className={cn("relative", buttonVariants({ variant, size, className }))}
        href={href}
        ref={ref}
        {...rest}
      >
        {variant === "starry" && (
          <span className={cn("starry", starryClass)}></span>
        )}
        <span className="z-[1] flex items-center gap-2">{children}</span>
        {glow && <span className="glow"></span>}
      </Link>
    );
  },
);

export { Button, buttonVariants, CustomLink };
