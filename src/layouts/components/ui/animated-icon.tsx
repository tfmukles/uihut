"use client";

import { cn } from "@/lib/utils/shadcn";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

function AnimatedIcon({
  children,
  startAngle = 45,
  className,
}: {
  children: React.ReactElement;
  startAngle?: number;
  className?: string;
}) {
  const endAngle = startAngle + 360;
  const el = useRef(null);

  useEffect(() => {
    if (el.current) {
      const item = el.current as HTMLDivElement;
      item.style.setProperty("--startAngle", `${startAngle}deg`);
      item.style.setProperty("--endAngle", `${endAngle}deg`);
    }
  }, []);
  return (
    <div
      className={cn(
        "inline-block rounded-[29px] border border-[#3A3F51]/20 p-1.5",
        className,
      )}
    >
      <motion.div
        className="animated-icon relative inline-flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[22px]"
        ref={el}
      >
        <span className="relative z-1 inline-flex h-[54px] w-[54px] items-center justify-center rounded-[16px] border border-[#3A3F51]">
          <span className="inline-block h-5 w-5">{children}</span>
        </span>
      </motion.div>
    </div>
  );
}

export default AnimatedIcon;
