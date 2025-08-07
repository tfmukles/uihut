"use client";

import config from "@/config/config.json";
import { cn } from "@/lib/utils/shadcn";
import Image from "next/image";
import Link from "next/link";

const Logo = ({ src, className }: { src?: string; className?: string }) => {
  // destructuring items from config object
  const {
    logo,
    logo_darkmode,
    logo_width,
    logo_height,
    logo_text,
    title,
  }: {
    logo: string;
    logo_darkmode: string;
    logo_width: any;
    logo_height: any;
    logo_text: string;
    title: string;
  } = config.site;

  return (
    <Link href={"/"} className={cn("navbar-brand inline-block", className)}>
      {logo_darkmode ? (
        <Image
          width={logo_width.replace("px", "") * 2}
          height={logo_height.replace("px", "") * 2}
          src={logo_darkmode}
          alt={title}
          priority
          style={{
            height: logo_height.replace("px", "") + "px",
            width: logo_width.replace("px", "") + "px",
          }}
        />
      ) : logo_text ? (
        logo_text
      ) : (
        title
      )}
    </Link>
  );
};

export default Logo;
