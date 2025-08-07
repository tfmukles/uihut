"use client";

import { cn } from "@/lib/utils/shadcn";
import AnimatedStarryBgDark from "@/public/images/backgrounds/cta-starry-bg.svg";
import Image from "next/image";

export default function AnimatedStarryBg({
  className,
  ...props
}: {
  [key: string]: any;
}) {
  const animatedStarrySvg = AnimatedStarryBgDark;

  return (
    <Image
      className={cn(className)}
      fill={true}
      sizes="100vw"
      src={animatedStarrySvg}
      alt="bg stars"
      {...props}
    />
  );
}
