"use client";
import { cn } from "@/lib/utils/shadcn";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useRef } from "react";

export function MovingBorder({
  children,
  as: Component = "div",
  containerClassName,
  borderClassName,
  duration,
  className,
  rounded = 12,
  ...otherProps
}: {
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  rounded?: number;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn("relative overflow-hidden p-[1px]", containerClassName)}
      style={{ borderRadius: rounded }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: rounded * 0.96,
        }}
      >
        <BorderAnimation duration={duration} rx="10%" ry="10%">
          <div
            className={cn(
              "moving-border aspect-square w-[90px] rounded-full",
              borderClassName,
            )}
          />
        </BorderAnimation>
      </div>
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-background",
          className,
        )}
        style={{
          borderRadius: rounded * 0.96,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const BorderAnimation = ({
  children,
  duration = 2000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};
