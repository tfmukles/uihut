"use client";

import { FacebookCircle, Linkedin, Pinterest, Twitter } from "@/assets/icons";
import config from "@/config/config.json";
import { ClipboardCheckIcon, Link as LinkIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CustomLink } from "./ui/button";

const Share = ({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) => {
  // destructuring items from config object
  const { base_url } = config.site;
  const pathName = usePathname();
  // copy link
  const [copyLink, setCopyLink] = useState(false);
  const copyLinkHandler = () => {
    const copyLinkButton = document.getElementById("copyLinkButton");
    if (
      copyLinkButton instanceof HTMLInputElement ||
      copyLinkButton instanceof HTMLTextAreaElement
    ) {
      copyLinkButton.select();
      copyLinkButton.setSelectionRange(0, 99999);
      setTimeout(() => {
        navigator.clipboard.writeText(copyLinkButton.value);
      }, 100);
      setCopyLink(true);
      setTimeout(() => {
        setCopyLink(false);
      }, 2000);
    }
  };

  return (
    <ul className={`flex ${className}`}>
      <li className="inline-block">
        <CustomLink
          className="px-3.5 py-1"
          variant="tag"
          aria-label="facebook share button"
          href={`https://facebook.com/sharer/sharer.php?u=${
            base_url + pathName
          }`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <FacebookCircle /> Share
        </CustomLink>
      </li>
      <li className="inline-block">
        <CustomLink
          className="px-3.5 py-1"
          variant="tag"
          aria-label="twitter share button"
          href={`https://twitter.com/intent/tweet/?text=${title}&amp;url=${
            base_url + pathName
          }`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Twitter /> Post
        </CustomLink>
      </li>
      <li className="inline-block">
        <CustomLink
          className="px-3.5 py-1"
          variant="tag"
          aria-label="linkedin share button"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${
            base_url + pathName
          }&title=${title}&summary=${description}&source=${base_url}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Linkedin /> Share
        </CustomLink>
      </li>
      <li className="inline-block">
        <CustomLink
          className="px-3.5 py-1"
          variant="tag"
          aria-label="pinterest share button"
          href={`https://pinterest.com/pin/create/button/?url=${
            base_url + pathName
          }&media=&description=${description}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Pinterest /> Pin
        </CustomLink>
      </li>
      <li
        className="btn-outline border-muted-foreground/10 bg-muted text-muted-foreground ring-offset-background after:bg-muted hover:text-foreground focus-visible:ring-ring relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-3.5 py-1 text-[10px] whitespace-nowrap transition-colors before:opacity-0 before:transition-opacity hover:before:opacity-100 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:text-xs [&_.glow]:hover:opacity-[40%]"
        onClick={() => copyLinkHandler()}
      >
        <span className="relative z-1">
          <LinkIcon
            className={copyLink ? "hidden" : "inline-block"}
            size={16}
          />
          <ClipboardCheckIcon
            className={copyLink ? "inline-block" : "hidden"}
            size={16}
          />
          {copyLink ? " Copied!" : " Copy"}
        </span>
        <input
          className="invisible absolute"
          type="text"
          value={`${base_url + pathName}`}
          id="copyLinkButton"
          style={{ pointerEvents: "none", top: "-9999px" }}
          readOnly
        />
      </li>
    </ul>
  );
};

export default Share;
