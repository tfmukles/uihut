import Link from "next/link";

const A = ({
  href,
  rel,
  children,
}: {
  href: string;
  rel?: string;
  children: any;
}) => {
  return (
    <Link
      href={href}
      passHref
      target="_blank"
      rel={`noopener ${
        href.match(/^http/)
          ? rel
            ? rel === "follow"
              ? ""
              : rel
            : "nofollow"
          : rel
            ? rel === "nofollow"
              ? "nofollow"
              : ""
            : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default A;
