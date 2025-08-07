import { plainify } from "@/lib/utils/textConverter";
import { TBlog } from "@/types";
import Link from "next/link";
import React from "react";
import Heading from "./ui/title";

interface BlogCardProps {
  data: TBlog;
  size: "default" | "lg";
}

const BlogCard: React.FC<BlogCardProps> = ({ data, size }) => {
  return (
    <div className="relative z-20">
      {data.frontmatter.image && (
        <div>
          <img
            src={data.frontmatter.image}
            alt={data.frontmatter.title}
            className="h-[200px] w-full object-cover"
          />
        </div>
      )}
      <div>
        <Heading
          className="mb-2 mt-3 font-normal text-text-dark"
          level="h4"
          variant="default"
        >
          <Link className="stretched-link" href={`/blog/${data.slug}`}>
            {data.frontmatter.title}
          </Link>
        </Heading>
        <p className="line-clamp-4 text-base text-text-light">
          {plainify(data.content!)}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
