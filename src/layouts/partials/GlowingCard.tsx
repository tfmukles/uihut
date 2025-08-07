"use client";

import { cn } from "@/lib/utils/shadcn";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { MouseEvent, useRef } from "react";

export const cardVariants = cva(
  "absolute blob pointer-events-none blur-[160px] z-[1]",
  {
    variants: {
      position: {
        center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
        "top-right": "top-0 right-0",
        "top-left": "top-0 left-0",
        "bottom-right": "bottom-0 right-0",
        "bottom-left": "bottom-0 left-0",
      },
      blobAspect: {
        default: "aspect-video",
        square: "aspect-square",
      },
    },
    defaultVariants: {
      position: "top-right",
      blobAspect: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  height?: number;
  blobClassName?: string;
  animated?: boolean;
  children: React.ReactNode;
}

const GlowingCard = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      position,
      className,
      blobClassName,
      blobAspect,
      animated = false,
      height = 219,
      children,
      ...props
    },
    ref,
  ) => {
    const blob = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 20, damping: 10, bounce: 0 });
    const springY = useSpring(y, { stiffness: 20, damping: 10, bounce: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      const { clientX, clientY } = e;
      const parent = e.currentTarget;
      const blobEl = blob.current;
      if (!blobEl) return;
      const parentRect = parent.getBoundingClientRect();
      const mouseX =
        clientX - parentRect.left - blobEl.offsetLeft - blobEl.clientWidth / 2;
      const mouseY =
        clientY - parentRect.top - blobEl.offsetTop - blobEl.clientHeight / 2;
      x.set(mouseX);
      y.set(mouseY);
    };

    return (
      <div
        className={cn(
          "relative min-h-[300px] overflow-hidden rounded-md border border-border p-6",
          className,
        )}
        onMouseMove={animated ? handleMouseMove : undefined}
        ref={ref}
        {...props}
      >
        <motion.span
          ref={blob}
          className={cn(
            cardVariants({ position, blobAspect, className: blobClassName }),
          )}
          style={{ x: springX, y: springY, height: height }}
        />
        <span className="absolute inset-[1px] rounded-md bg-background"></span>
        <div className="relative">{children}</div>
      </div>
    );
  },
);

export default GlowingCard;
