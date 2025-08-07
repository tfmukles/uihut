"use client";

import { Button } from "@/components/ui/button";
import PaddleLoader from "@/helpers/PaddleLoader";
import countryDetector from "@/lib/utils/countryDetector";
import { cn } from "@/lib/utils/shadcn";
import PageDots from "@/partials/PageDots";
import { SubscriptionPlans } from "@/types";
import { useState } from "react";
import { TPricingData } from "../page";
import PriceCard from "./PriceCard";

const PricingClient = ({
  pricingData,
  className,
  currentPlan,
  hasMinihutPackage,
  hasExpiredPlans,
}: {
  pricingData: TPricingData;
  currentPlan: string | undefined;
  className?: string;
  disable?: boolean;
  hasMinihutPackage: boolean;
  hasExpiredPlans: boolean;
}) => {
  const { price_cards } = pricingData;
  const [planType, setPlanType] = useState<keyof SubscriptionPlans>("lifetime");
  const plans = Object.keys(price_cards);
  const country = countryDetector();

  return (
    <>
      <PaddleLoader />
      <PageDots hideOnScroll />
      <section className={cn("mt-14", className)}>
        <div className="container-md relative bg-background">
          <div className="text-center">
            <div className="mx-auto mb-8 inline-flex justify-center space-x-0.5 rounded-lg border border-border">
              {
                // Plan type buttons
                plans.map((plan, index) => (
                  <Button
                    className="border-none capitalize before:bg-transparent after:bg-transparent"
                    key={index}
                    variant={planType === plan ? "default" : null}
                    onClick={() => setPlanType(plan as keyof SubscriptionPlans)}
                  >
                    {plan} Plans
                  </Button>
                ))
              }
            </div>
          </div>
          <div className="row row-cols-1 justify-center md:row-cols-2 lg:row-cols-3">
            {price_cards[planType].map((card, index) => (
              <PriceCard
                key={index}
                currentPlan={currentPlan}
                hasMinihutPackage={hasMinihutPackage}
                hasExpiredPlans={hasExpiredPlans}
                cardData={{
                  ...card,
                }}
              />
            ))}
          </div>
          {country === "Bangladesh" && (
            <div className="mb-5 rounded-lg bg-yellow-300 py-5 text-center">
              <strong className="block text-dark">
                আপনার কাছে PayPal বা ক্রেডিট কার্ড না থাকলেও এখন থেকে UIHut-এ
                bKash-এর মাধ্যমে পেমেন্ট করা সম্ভব। আপনি যদি bKash-এর মাধ্যমে
                পেমেন্ট করতে চান, <br /> তাহলে অনুগ্রহ করে আমাদের হোয়াটসঅ্যাপে
                মেসেজ করুন। : 01981340287
              </strong>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.me/+8801981340287"
                className="mt-4 inline-block rounded-full bg-[#25D366] px-4 py-2 font-bold text-white"
              >
                <img
                  height="32"
                  width="32"
                  src="https://cdn.simpleicons.org/whatsapp/white"
                  className="inline-block pr-2 invert-0"
                />
                WhatsApp Now
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PricingClient;
