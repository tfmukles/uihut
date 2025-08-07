"use client";

import { cn } from "@/lib/utils/shadcn";
import Image from "next/image";
import { ComponentProps, useState } from "react";

type ImageProps = Omit<ComponentProps<typeof Image>, "src">;

type Props = ImageProps & { src: string; containerClass?: string };

export default function BlurImage(props: Props) {
  const [isLoaded, setIsLoaded] = useState(true);
  const { src, className, containerClass, alt, ...rest } = props;

  return (
    <div className={cn("relative overflow-hidden", containerClass)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          "absolute left-0 top-0 !h-full bg-background object-contain",
          className,
        )}
        onLoad={() => setIsLoaded(false)}
        onError={() => setIsLoaded(false)}
        {...rest}
      />
    </div>
  );
}
