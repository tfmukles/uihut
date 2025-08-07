"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import Link from "next/link";

const Button = ({
  label,
  link,
  rel,
  variant = "default",
  size = "default",
  className,
  glow,
  starryClass,
}: {
  label: string;
  link: string;
  style?: string;
  rel?: string;
  variant?: "default" | "starry";
  size?: "default" | "sm" | "lg" | "xl";
  className?: string;
  glow?: boolean;
  starryClass?: string;
}) => {
  return (
    <Link
      className={cn("relative no-underline text-text-light", buttonVariants({ variant, size, className }))}
      href={link}
      target="_blank"
      rel={`noopener noreferrer ${rel ? (rel === "follow" ? "" : rel) : "nofollow"}`}
    >
      {variant === "starry" && (
        <span className={cn("starry", starryClass)}></span>
      )}
      <span className="z-[1] flex items-center gap-2">{label}</span>
      {glow && <span className="glow"></span>}
    </Link>
  );
};

export default Button;
