"use client";

import { CardGridPattern, CardGridPattern2 } from "@/assets/patterns";
import AnimatedIcon from "@/components/ui/animated-icon";
import Heading from "@/components/ui/title";
import { cn } from "@/lib/utils/shadcn";
import BlurSvg from "@/partials/BlurSvg";
import OverlayImage from "@/partials/overlay-image";
import Image, { StaticImageData } from "next/image";
import { useRef } from "react";
import { Button, CustomLink } from "./ui/button";

type CardProps = {
  className?: string;
  children: React.ReactNode;
  blurSvg?: React.ReactNode;
};

export function CardSecondary(props: CardProps) {
  const { className, children, blurSvg } = props || {};
  const containerRef = useRef<HTMLDivElement>(null);

  const blur = blurSvg ? (
    blurSvg
  ) : (
    <BlurSvg
      className="absolute top-0 right-0 opacity-60 blur-[160px] max-lg:h-[200px] max-lg:w-[200px] max-lg:blur-[60px]"
      cx={442}
      cy={143.5}
      rx={282}
      ry={159.5}
      width={800}
      height={463}
      viewBox="0 0 800 463"
    >
      <linearGradient
        id="gradientId"
        x1="619.971"
        y1="303"
        x2="220.868"
        y2="303.086"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFDE67" />
        <stop offset="0.586793" stopColor="#FF808D" />
        <stop offset="1" stopColor="#AC5EFA" />
      </linearGradient>
    </BlurSvg>
  );
  return (
    <div className="relative">
      <div
        className={cn(
          "card-bg border-border relative w-full overflow-hidden rounded-[20px] border px-6 py-8 md:py-12 lg:px-10 lg:pt-[106px] lg:pb-[46px] [&_h3]:lg:text-[36px]",
          className,
        )}
      >
        <div className="relative z-10" ref={containerRef}>
          {children}
        </div>

        <div className="absolute top-0 right-0 z-1 h-[380px] w-[466px] overflow-hidden max-lg:hidden xl:h-[465px] xl:w-[576px]">
          <Image
            className="absolute top-1/2 left-1/2 z-1 -translate-x-1/2 -translate-y-1/2"
            src="/images/svgs/pencil-colored.svg"
            width={150}
            height={150}
            alt="icon"
          />
          <OverlayImage
            className="-top-[2%] left-[5%] h-[95px] w-[127px]"
            src="/images/cta/left-1.png"
            container={containerRef!}
          />
          <OverlayImage
            className="top-[25%] left-[21%] h-[62px] w-[83px]"
            src="/images/cta/left-2.png"
            opacity={40}
            container={containerRef}
          />
          <OverlayImage
            className="top-[45%] h-[103px] w-[137px]"
            src="/images/cta/left-3.png"
            container={containerRef}
            opacity={50}
          />
          <OverlayImage
            className="top-[75%] left-[20%] h-[139px] w-[99px]"
            src="/images/cta/left-4.png"
            opacity={50}
            container={containerRef!}
          />

          <OverlayImage
            className="-top-[2%] right-[20%] h-[115px] w-[155px]"
            src="/images/cta/right-1.png"
            opacity={40}
            container={containerRef}
          />
          <OverlayImage
            className="top-[32%] right-[5%] h-[49px] w-[65px]"
            src="/images/cta/right-2.png"
            opacity={60}
            container={containerRef}
          />
          <OverlayImage
            className="top-[52%] right-[8%] h-[96px] w-[97px]"
            src="/images/cta/right-3.png"
            opacity={40}
            container={containerRef}
          />
          <OverlayImage
            className="top-[85%] right-[20%] h-[139px] w-[185px]"
            src="/images/cta/right-4.png"
            opacity={40}
            container={containerRef}
          />
        </div>
        {blur}
        <CardGridPattern2 className="pointer-events-none absolute -top-[30px] right-0 h-auto max-w-[80%] sm:-top-[60px] md:-top-[15%] md:max-w-[60%] lg:-top-[24%]" />
      </div>
    </div>
  );
}

type CardInfoProps = {
  title: string;
  description: string;
  icon: StaticImageData | string;
  className?: string;
  listItems: string[];
  buttonText: string;
  buttonLink?: string;
};

export const CardInfo = (props: CardInfoProps) => {
  const {
    title,
    description,
    icon,
    listItems,
    buttonText,
    buttonLink,
    className,
  } = props;
  return (
    <div className={cn("max-w-full", className)}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div>
          <AnimatedIcon className="*:after:bg-[#111428]" startAngle={160}>
            <Image width={20} height={20} quality={100} src={icon} alt="icon" />
          </AnimatedIcon>
        </div>
        <div>
          <Heading
            className="text-h3-sm lg:text-h3 mb-1"
            level="h2"
            variant="gradient"
          >
            {title}
          </Heading>
          <p className="text-text-light">{description}</p>
        </div>
      </div>
      <ul className="mt-6 grid list-inside list-disc grid-cols-1 gap-y-[18px] pl-[10px] text-sm sm:gap-x-10 md:mt-8 md:gap-x-16 lg:mt-8 xl:grid-cols-[max-content_max-content]">
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="mt-6 md:mt-8 lg:mt-11 lg:pl-4">
        {buttonLink ? (
          <CustomLink
            className="rounded-lg md:h-11"
            href={buttonLink}
            glow
            target={buttonLink.includes("http") ? "_blank" : "_self"}
          >
            {buttonText}
          </CustomLink>
        ) : (
          <Button className="rounded-lg md:h-11" glow>
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export const CardPrimary = (props: CardProps) => {
  const { className, children, blurSvg } = props || {};

  const blur = blurSvg ? blurSvg : null;
  return (
    <div className="relative h-full">
      <div
        className={cn(
          "card-bg border-border relative h-full w-full overflow-hidden rounded-[20px] border px-6 py-7 md:py-8 lg:px-[41px] lg:py-[42px]",
          className,
        )}
      >
        <div className="relative z-10">{children}</div>

        {blur}
      </div>
      <CardGridPattern className="pointer-events-none absolute -top-0 right-0 h-auto max-lg:max-w-[90%] xl:top-1/2 xl:aspect-square xl:min-w-[521px] xl:-translate-y-1/2" />
    </div>
  );
};
