"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import BlurSvg from "@/partials/BlurSvg";
import Link from "next/link";
import { useEffect } from "react";
import reactUseCookie from "react-use-cookie";
import { buttonVariants } from "./ui/button";
import Heading from "./ui/title";

export default function DealPopup() {
  const { isOpen, onOpenChange } = useDialog();
  const [dealAccept, setDealAccept] = reactUseCookie("special_offer", "false");

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (dealAccept === "false") {
        onOpenChange(true);
      }
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setDealAccept("true", {
        days: 1,
        SameSite: "Strict",
        Secure: true,
      });
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[600px] overflow-hidden bg-black p-14 [&>.close]:!top-1.5 [&>.close]:bg-transparent [&>.close]:text-white">
        <DialogHeader>
          <Heading
            level={"h3"}
            variant={"default"}
            className="mb-1 leading-relaxed text-white"
          >
            Special Offer!
          </Heading>
          <Heading
            level={"h2"}
            className={"font-primary aspect-auto font-bold text-white"}
          >
            <span className="clip-gradient from-secondary to-primary bg-gradient-to-r from-[30%]">
              Get Premium Lifetime plan only for $97!
            </span>
          </Heading>
        </DialogHeader>

        <p>One-time Payment, Lifetime Access.</p>
        <div>
          <Link
            className={buttonVariants({
              variant: "basic",
              size: "xl",
              className:
                "mt-5 bg-[#A002FC] text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0",
            })}
            href={
              "/pricing?utm_source=website&utm_medium=announcement&utm_campaign=premium_lifetime"
            }
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Grab the Deal
          </Link>
        </div>

        <BlurSvg
          className="absolute top-64 right-0 aspect-square translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
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
          className="absolute top-0 left-0 aspect-square -translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
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
