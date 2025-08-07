"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useDialog } from "@/hooks/useDialog";
import BlurSvg from "@/partials/BlurSvg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import reactUseCookie from "react-use-cookie";
import { Button } from "./ui/button";
import Heading from "./ui/title";

export default function DealPopup() {
  const router = useRouter();
  const { isOpen, onOpenChange } = useDialog();
  const [dealAccept, setDealAccept] = reactUseCookie("newYear25", "false");

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
            Don’t Miss Our New Year Sale!
          </Heading>
          <Heading
            level={"h1"}
            className={"aspect-auto font-primary font-bold text-white"}
          >
            <span className="clip-gradient bg-gradient-to-r from-secondary from-[30%] to-primary">
              Flat 60% OFF!
            </span>
          </Heading>
        </DialogHeader>

        <p>
          Unlock 26,000+ design resources with exclusive deals on UIHut's
          Lifetime Plans!
        </p>
        <div>
          <Button
            size={"xl"}
            variant={"basic"}
            className="mt-5 bg-[#A002FC] text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0"
            onClick={() => {
              router.push("/deals");
              onOpenChange(false);
            }}
          >
            Grab the Deal
          </Button>
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
