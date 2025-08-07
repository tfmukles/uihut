"use client";

import { Button } from "@/components/ui/button";

export default function Goto() {
  const handleScroll = () => {
    const element = document.querySelector(".deal-announcement");
    if (element) {
      const offsetTop = 200;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offsetTop;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Button onClick={handleScroll} size={"xl"}>
      Grab the Deals
    </Button>
  );
}
