"use client";

import { CheckCircle } from "@/assets/icons";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import Axios from "@/lib/utils/axios";
import { checkMinihutPlan } from "@/lib/utils/planFinder";
import BlurSvg from "@/partials/BlurSvg";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useCookie from "react-use-cookie";
import { Button } from "./ui/button";
import Heading from "./ui/title";

export default function MinihutUpgradePopup({
  forceOpen,
  onForceClose,
}: {
  forceOpen?: boolean;
  onForceClose?: () => void;
} = {}) {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async (userId: string) => {
      try {
        const response = await Axios.get(`/order/${userId}`);
        setOrders(response.data.result || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (session?.user.id) {
      fetchOrders(session.user.id);
    }
  }, [session?.user.id]);

  // If forceOpen is true, always show popup
  const isControlled = typeof forceOpen === "boolean";
  const [isOpen, setIsOpen] = useState(false);
  const [popupClosed, setPopupClosed] = useCookie(
    "minihutUpgradePopupClosed",
    "false",
  );
  const router = useRouter();
  const pathname = usePathname();
  const hasMinihutPackage = checkMinihutPlan(orders) || false;

  useEffect(() => {
    if (isControlled) {
      setIsOpen(forceOpen!);
    }
  }, [forceOpen, isControlled]);

  useEffect(() => {
    if (hasMinihutPackage && popupClosed !== "true") {
      const timeout = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [orders.length, pathname, popupClosed]);

  const handleClose = () => {
    setIsOpen(false);
    setPopupClosed("true", {
      days: 1,
      SameSite: "Strict",
      Secure: true,
    });
    if (onForceClose) onForceClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[400px] max-w-full overflow-hidden bg-black p-0 md:w-full md:max-w-[850px] [&>.close]:!top-1.5 [&>.close]:bg-transparent [&>.close]:text-white">
        <div className="items-center justify-between md:flex">
          <div className="mr-3 py-10 pl-10">
            <DialogHeader>
              <Heading
                level={"h2"}
                className={"font-primary font-bold text-white"}
              >
                Upgrade to a{" "}
                <span className="clip-gradient bg-gradient-to-r from-secondary from-[30%] to-primary">
                  Lifetime Package
                </span>
              </Heading>
            </DialogHeader>

            <div>
              <p className="mt-4 text-sm font-normal text-text-light">
                As a <strong className="text-text-dark">Minihut</strong>{" "}
                subscriber, you qualify for a{" "}
                <strong className="text-text-dark">$40.00</strong> discount on
                any Lifetime Package. The discount will be applied automatically
                during checkout.
              </p>

              <ul className="mt-4 space-y-1.5 text-text-light">
                <li className="relative pl-6 text-sm">
                  <CheckCircle className="absolute left-0 top-0" />
                  Lifetime access to 26,000+ design resources.
                </li>
                <li className="relative pl-6 text-sm">
                  <CheckCircle className="absolute left-0 top-0" />
                  40 to 60 downloads per day.
                </li>
                <li className="relative pl-6 text-sm">
                  <CheckCircle className="absolute left-0 top-0" />
                  Access to all present+future products.
                </li>
                <li className="relative pl-6 text-sm">
                  <CheckCircle className="absolute left-0 top-0" />
                  Use on personal & commercial projects.
                </li>
              </ul>

              <Button
                size={"xl"}
                variant={"basic"}
                className="mt-5 bg-[#A002FC] text-base text-white focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={() => {
                  router.push("/pricing");
                  handleClose();
                }}
              >
                Upgrade Now
              </Button>
            </div>
          </div>
          <Image
            src={"/images/deals/minihut-upgrade-popup.png"}
            alt="minihut"
            width={350}
            height={370}
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
