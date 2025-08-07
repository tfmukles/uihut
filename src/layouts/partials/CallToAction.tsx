"use client";

import { CardGridPattern2 } from "@/assets/patterns";
import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import { CustomLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import { cn } from "@/lib/utils/shadcn";
import { useRef } from "react";
import BlurSvg from "./BlurSvg";
import UserRating from "./UserRating";
import OverlayImage from "./overlay-image";

type Props = {
  title: string;
  description: string;
  link: {
    href?: string;
    label: string;
  };
  className?: string;
};

function CallToAction({
  title,
  description,
  link: { href = "#", label },
  className,
}: Props) {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <section
      className={cn("relative my-[72px] overflow-hidden", className)}
      ref={containerRef}
    >
      <Separator />
      <div className="container absolute left-1/2 top-0 mx-auto h-full -translate-x-1/2 py-4">
        <AnimatedStarryBg className="pointer-events-none absolute z-1 h-full w-full object-cover" />
      </div>
      <div className="container relative z-[2] overflow-hidden pb-[72px] pt-20 text-center">
        <CardGridPattern2 className="absolute right-0 top-0 h-[90%] max-lg:max-w-[400px]" />
        <UserRating
          className="mb-6 text-text-light"
          rating="4.9/5"
          description="Over 100K+ designers, developers, entrepreneurs, and businesses choose Uihut"
        />
        <div className="mx-auto max-w-[971px]">
          <Heading
            className="mb-3 !text-h1"
            variant="gradient"
            level={"h2"}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="mx-auto mb-8 max-w-[600px] text-text-light"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <CustomLink size="xl" href={href}>
            {label}
          </CustomLink>
        </div>
      </div>
      <Separator />
      <BlurSvg
        className="absolute right-0 top-0 blur-[100px] max-md:w-[150px] md:right-[20%] md:blur-[160px]"
        width={344}
        height={209}
        viewBox="0 0 344 209"
        cx="172"
        cy="37"
        rx={172}
        ry={172}
      >
        <linearGradient
          id="paint0_linear_1_9400"
          x1="393.88"
          y1="357.545"
          x2="-1.27236"
          y2="331.711"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDE67" />
          <stop offset="0.320191" stopColor="#FF808D" />
          <stop offset="1" stopColor="#AC5EFA" />
        </linearGradient>
      </BlurSvg>
      <BlurSvg
        className="absolute bottom-0 left-0 blur-[100px] max-md:w-[150px] md:left-[20%] md:blur-[150px]"
        width="260"
        height="162"
        viewBox="0 0 260 162"
        cx="130"
        cy="180"
        rx="130"
        ry="130"
      >
        <linearGradient
          id="sdflksdkfls"
          x1="393.88"
          y1="357.545"
          x2="-1.27236"
          y2="331.711"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="#AC5EFA" />
        </linearGradient>
      </BlurSvg>

      {/* parallax-left */}
      <div className="max-lg:hidden">
        <OverlayImage
          className="-top-[2%] left-[5%] h-[139px] w-[186px]"
          src="/images/cta/left-1.png"
          container={containerRef}
        />
        <OverlayImage
          className="left-[12%] top-[32%] h-[81px] w-[108px]"
          src="/images/cta/left-2.png"
          opacity={50}
          container={containerRef}
        />
        <OverlayImage
          className="top-[53%] h-[166px] w-[220px]"
          src="/images/cta/left-3.png"
          container={containerRef}
        />
        <OverlayImage
          className="left-[13%] top-[85%] h-[163px] w-[116px]"
          src="/images/cta/left-4.png"
          opacity={50}
          container={containerRef}
        />
      </div>
      {/* parallax-right */}
      <div className="max-lg:hidden">
        <OverlayImage
          className="-top-[2%] right-[5%] h-[162px] w-[218px]"
          src="/images/cta/right-1.png"
          opacity={60}
          container={containerRef}
        />
        <OverlayImage
          className="right-0 top-[32%] h-[68px] w-[91px]"
          src="/images/cta/right-2.png"
          opacity={80}
          container={containerRef}
        />
        <OverlayImage
          className="-right-[1%] top-[52%] h-[146px] w-[145px]"
          src="/images/cta/right-3.png"
          opacity={40}
          container={containerRef}
        />
        <OverlayImage
          className="right-[3%] top-[80%] h-[139px] w-[185px]"
          src="/images/cta/right-4.png"
          opacity={40}
          container={containerRef}
        />
      </div>
    </section>
  );
}

export default CallToAction;
