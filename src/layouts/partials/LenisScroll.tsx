"use client";
import Lenis from "lenis";
import { useEffect } from "react";

function LenisScroll() {
  // lenis options for configuration
  //   const lenisOptions = {
  //     lerp: 0.1, // speed
  //     duration: 1.5, // duration
  //     smoothTouch: false, //smooth scroll for touch devices
  //     smooth: true,
  //   };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t: number): number => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
    });

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return null;
}
export default LenisScroll;
