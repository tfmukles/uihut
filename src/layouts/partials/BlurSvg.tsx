import { cn } from "@/lib/utils/shadcn";
import React from "react";

function BlurSvg({
  className,
  width = 1050,
  height = 355,
  cx,
  rx,
  ry,
  cy,
  viewBox = "0 0 1050 355",
  children,
  fill,
}: {
  className?: string;
  children?: React.ReactElement;
  width?: number | string;
  height?: number | string;
  cx?: number | string;
  cy?: number | string;
  rx?: number | string;
  ry?: number | string;
  viewBox?: string;
  fill?: string;
}) {
  const fillStyle =
    // @ts-ignore
    children && "props" in children && "id" in children.props
      ? `url(#${children.props.id})`
      : fill;
  return (
    <svg
      className={cn("pointer-events-none", className)}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fillStyle} />
      {children && <defs>{children}</defs>}
    </svg>
  );
}
export default BlurSvg;
