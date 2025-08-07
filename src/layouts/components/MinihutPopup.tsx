"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { usePackage } from "@/hooks/usePackage";
import BlurSvg from "@/partials/BlurSvg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Heading from "./ui/title";

export default function MinihutPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [popupClosed, setPopupClosed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentPlan = usePackage();

  useEffect(() => {
    const closed = sessionStorage.getItem("minihutPopupClosed") === "true";
    setPopupClosed(closed);
  }, []);

  useEffect(() => {
    if (
      pathname !== "/mini-pricing" &&
      currentPlan === "free" &&
      !popupClosed
    ) {
      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        const timeout = setTimeout(() => {
          setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timeout);
      }

      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsOpen(true);
        }
      };

      document.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [currentPlan, pathname, popupClosed]);

  const handleClose = () => {
    setIsOpen(false);
    setPopupClosed(true);
    sessionStorage.setItem("minihutPopupClosed", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[400px] max-w-full overflow-hidden bg-black p-0 md:w-full md:max-w-[850px] [&>.close]:!top-1.5 [&>.close]:bg-transparent [&>.close]:text-white">
        <div className="items-center justify-between md:flex">
          <Image
            src={"/images/deals/minihut-mobile.png"}
            alt="mini"
            width={450}
            height={235}
            className="block w-full md:hidden"
          />
          <div className="mr-3 py-10 pl-10">
            <DialogHeader>
              <Heading
                level={"h4"}
                variant={"default"}
                className="mb-1 leading-relaxed text-white"
              >
                Introducing MiniHut
              </Heading>
              <Heading
                level={"h2"}
                className={"font-primary font-bold text-white"}
              >
                <span className="clip-gradient bg-gradient-to-r from-secondary from-[30%] to-primary">
                  Get any 10 premium designs for just $17!
                </span>
              </Heading>
            </DialogHeader>

            <div>
              <Button
                size={"xl"}
                variant={"basic"}
                className="mt-5 bg-[#A002FC] text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => {
                  router.push(
                    "/mini-pricing?utm_source=uihut&utm_medium=popup&utm_campaign=minihut_popup",
                  );
                  handleClose();
                }}
              >
                Get UIHut Mini Pack
              </Button>
            </div>
          </div>
          <Image
            src={"/images/deals/minihut-popup.png"}
            alt="minihut"
            width={402}
            height={383}
            priority
            className="hidden md:block"
          />
        </div>

        <BlurSvg
          className="absolute right-0 top-64 aspect-square -translate-y-1/2 translate-x-1/2 blur-[120px] max-lg:w-[120px]"
          width={240}
          height={240}
          viewBox="0 0 240 240"
          cx="120"
          cy="120"
          rx="120"
          ry="120"
          fill={"#882AECB2"}
        />

        <BlurSvg
          className="absolute left-0 top-0 aspect-square -translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
          width={240}
          height={240}
          viewBox="0 0 240 240"
          cy="120"
          cx="120"
          rx="120"
          ry="120"
          fill={"#882AECB2"}
        />
      </DialogContent>
    </Dialog>
  );
}
