"use client";

import { titleify } from "@/lib/utils/textConverter";
import { usePathname } from "next/navigation";
import { CustomLink } from "./ui/button";

const CategoriesTag = ({ allCategories }: { allCategories: string[] }) => {
  const pathname = usePathname();

  return (
    <div className="mx-auto mt-7 flex max-w-[600px] flex-wrap items-center justify-center gap-2">
      <CustomLink
        href="/blog"
        variant="tag"
        size="tag"
        className={
          pathname === `/blog`
            ? "btn-outline text-foreground before:opacity-100"
            : ""
        }
      >
        <span>All</span>
      </CustomLink>

      {allCategories.map((category: string, index: number) => (
        <CustomLink
          key={index}
          href={`/blog/categories/${encodeURIComponent(category.toLowerCase())}`}
          variant="tag"
          size="tag"
          className={
            pathname ===
            `/blog/categories/${encodeURIComponent(category.toLowerCase())}`
              ? "btn-outline text-foreground before:opacity-100"
              : ""
          }
        >
          {titleify(category)}
        </CustomLink>
      ))}
    </div>
  );
};

export default CategoriesTag;
