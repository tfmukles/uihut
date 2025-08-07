import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import Heading from "@/components/ui/title";
import { Separator } from "@/layouts/components/ui/separator";
import BlurSvg from "@/partials/BlurSvg";
import React from "react";
import PageDots from "./PageDots";

function BoxLayout({
  headerTitle,
  headerDescription,
  footerTitle,
  footerDescription,
  disableBgStars,
  className,
  children,
}: {
  headerTitle?: string;
  headerDescription?: string;
  footerTitle?: string;
  footerDescription?: string;
  disableBgStars?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!disableBgStars && (
        <AnimatedStarryBg className="pointer-events-none fixed top-[15vh] left-[5vw] -z-10 h-[80vh] w-[90vw]" />
      )}
      {/* header box shapes */}
      <div className="relative pb-20">
        <PageDots hideOnScroll />
        <BlurSvg
          className="absolute top-[7%] right-[18%] opacity-40 blur-[120px] max-lg:h-[150px] max-lg:w-[250px] max-lg:blur-[70px]"
          cx="130"
          cy="130"
          rx="130"
          ry="130"
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >
          <linearGradient
            id="paint0_linear_1_20391"
            x1="297.7"
            y1="372.273"
            x2="-0.961671"
            y2="352.747"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFDE67" />
            <stop offset="0.320191" stopColor="#FF808D" />
            <stop offset="1" stopColor="#AC5EFA" />
          </linearGradient>
        </BlurSvg>
        <div className="container-md absolute -top-6 left-1/2 h-full w-full -translate-x-1/2 opacity-50">
          <Separator
            className="absolute left-0 h-full"
            orientation="vertical"
          />
          <Separator
            className="absolute right-0 h-full"
            orientation="vertical"
          />
        </div>
        <div className="absolute -top-6 left-1/2 h-full w-[410px] max-w-full -translate-x-1/2 bg-gradient-to-b from-white/[3%] to-white/0 opacity-50">
          <Separator
            className="absolute left-0 h-full"
            orientation="vertical"
          />
          <Separator
            className="absolute right-0 h-full"
            orientation="vertical"
          />
        </div>
        <div className="container flex min-h-[150px] items-center justify-center py-5">
          <div className="relative z-10 text-center">
            <Heading className="!text-h3 mb-2" level="h1" variant={"gradient"}>
              {headerTitle}
            </Heading>
            <p className="text-text-light lg:text-base">{headerDescription}</p>
          </div>
        </div>
        <Separator className="bottom-0 left-0 w-full" />
      </div>

      {/* main content */}
      {children}

      {/* footer box shapes */}
      <div className="h-[250px]" />
      <div className="absolute bottom-0 w-full pt-20">
        <Separator className="w-full" />
        <div className="container flex min-h-[150px] items-center justify-center py-5">
          <div className="relative z-10 text-center">
            <Heading className="text-h3 lg:text-h3 mb-2" level="h2">
              {footerTitle}
            </Heading>
            <p className="text-text-light lg:text-base">{footerDescription}</p>
          </div>
        </div>
        <BlurSvg
          className="absolute -bottom-[7%] opacity-40 blur-[120px] max-lg:h-[150px] max-lg:w-[250px] max-lg:blur-[70px] md:left-[18%]"
          cx="130"
          cy="130"
          rx="130"
          ry="130"
          width="260"
          height="260"
          viewBox="0 0 260 260"
        >
          <linearGradient
            id="paint0_linear_1_20391656"
            x1="297.7"
            y1="372.273"
            x2="-0.961671"
            y2="352.747"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="1" stopColor="#AC5EFA" />
          </linearGradient>
        </BlurSvg>
        <Separator className="absolute bottom-[-1px] left-0 w-full" size="lg" />
        <PageDots className="bottom-0" />
        <div className="absolute -bottom-6 left-1/2 h-full w-[410px] max-w-full -translate-x-1/2 bg-gradient-to-t from-white/[3%] to-white/0 opacity-50">
          <Separator
            className="absolute bottom-0 left-0 h-full"
            orientation="vertical"
          />
          <Separator
            className="absolute right-0 bottom-0 h-full"
            orientation="vertical"
          />
        </div>
        <div className="container-md absolute -bottom-6 left-1/2 h-full w-full -translate-x-1/2 opacity-50">
          <Separator
            className="absolute bottom-0 left-0 h-full"
            orientation="vertical"
          />
          <Separator
            className="absolute right-0 bottom-0 h-full"
            orientation="vertical"
          />
        </div>
      </div>
    </div>
  );
}

export default BoxLayout;
