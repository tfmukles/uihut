"use client";

import { useFilter } from "@/hooks/useFilter";
import { motion } from "framer-motion";
import React from "react";

const slideLeft = {
  hide: {
    width: 0,
  },
  show: {
    width: 344,
  },
};

export default function FilterLarge({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVisible, height } = useFilter();

  return (
    <motion.div
      className="hidden origin-left overflow-hidden border-r border-border lg:sticky lg:block"
      style={{ top: height + 96, height: `calc(100svh - ${height + 96}px)` }}
      initial="show"
      animate={isVisible ? "show" : "hide"}
      variants={slideLeft}
    >
      <div className="h-full w-[344px]">{children}</div>
    </motion.div>
  );
}
