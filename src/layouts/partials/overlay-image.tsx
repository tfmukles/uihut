import { cn } from "@/lib/utils/shadcn";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  src: string | StaticImageData;
  opacity?: number;
  container: RefObject<HTMLElement | null>;
};

function OverlayImage({ className, src, opacity = 70, container }: Props) {
  const [randomMove, setRandomMove] = useState(1);
  const el = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const movement = 50 * randomMove;
  const y = useTransform(scrollYProgress, [0, 1], [movement, -movement]);
  const sprintY = useSpring(y, {
    stiffness: 50,
    damping: 20,
    bounce: 0,
    //  velocity: 20 * randomMove,
  });

  // Generate the random speed on component mount
  useEffect(() => {
    setRandomMove(Math.random() * 0.3 + 0.4);
  }, []);

  return (
    <motion.div
      className={cn("absolute", className)}
      ref={el}
      style={{ y: sprintY }}
      transition={{ duration: 0 }}
    >
      <Image
        className="object-contain max-xl:scale-[80%]"
        fill
        src={src}
        sizes="200px"
        alt=""
      />
      <span
        className="absolute inset-0 max-xl:scale-[80%]"
        style={{ backgroundColor: `rgba(0, 0, 0, ${opacity}%)` }}
      />
    </motion.div>
  );
}

export default OverlayImage;
