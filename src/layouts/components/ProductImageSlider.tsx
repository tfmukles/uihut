"use client";

import { BUCKET_URL } from "@/lib/constant";
import Image from "next/image";
import { useState } from "react";

export default function ProductImageSlider({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleThumbClick(index: number) {
    setActiveIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Calculate thumbnail width based on number of images
  const thumbCount = images.length;
  const thumbGap = 8; // gap-2 = 0.5rem = 8px
  const mainWidth = 852;
  const thumbWidth =
    thumbCount > 0
      ? Math.floor((mainWidth - (thumbCount - 1) * thumbGap) / thumbCount)
      : 60;

  return (
    <div className="card-bg rounded-2xl border border-border p-3">
      <Image
        priority
        className="w-full overflow-hidden rounded-xl"
        src={`${BUCKET_URL}/${images[activeIndex] || ""}`}
        width={852}
        height={670}
        alt={title}
        quality={80}
      />
      <div className="mt-3 flex gap-2">
        {images.map((preview, index) => (
          <div
            key={index}
            style={{
              width: `${thumbWidth}px`,
              height: `${thumbWidth}px`,
              minWidth: `${thumbWidth}px`,
              minHeight: `${thumbWidth}px`,
            }}
            className={`cursor-pointer rounded-lg border-2 ${
              index === activeIndex
                ? "border-primary ring-2 ring-primary"
                : "border-transparent"
            }`}
            onClick={() => handleThumbClick(index)}
          >
            <Image
              className="h-full w-full rounded-lg object-cover"
              src={`${BUCKET_URL}/${preview}`}
              width={thumbWidth}
              height={thumbWidth}
              alt={title}
              quality={80}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
