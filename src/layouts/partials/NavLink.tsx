"use client";

import { cn } from "@/lib/utils/shadcn";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({
  className,
  activeClassName,
  href,
  children,
  useInclude = false,
  ...rest
}: LinkProps & {
  className?: string;
  children: React.ReactNode;
  activeClassName?: string;
  useInclude?: boolean;
  [key: string]: any;
}) {
  const pathname = usePathname();
  const isAction = !useInclude
    ? pathname === href
    : pathname.includes(href.toString());

  return (
    <Link
      href={href}
      className={cn(className, isAction && activeClassName)}
      target={
        typeof href === "string" && href.startsWith("http") ? "_blank" : "_self"
      }
      rel={
        typeof href === "string" && href.startsWith("http")
          ? "noopener noreferrer nofollow"
          : undefined
      }
      {...rest}
    >
      {children}
    </Link>
  );
}
