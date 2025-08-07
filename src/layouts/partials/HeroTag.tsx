"use client";

import { Button } from "@/components/ui/button";
import AnimatedStar from "@/public/images/svgs/star-animated.svg";
import Image from "next/image";
import { redirect } from "next/navigation";

function HeroTag({ text, link }: { text: string; link?: string }) {
  return (
    <div className="relative inline-block">
      <span className="animated-glow" />
      <Button
        className="px-[22px] text-sm after:bg-[#141928]"
        variant="outline-gradient"
        onClick={() => {
          if (!link) return;
          redirect(link);
        }}
      >
        <Image width={20} height={20} src={AnimatedStar} alt="star" />
        {text}
      </Button>
    </div>
  );
}

export default HeroTag;
