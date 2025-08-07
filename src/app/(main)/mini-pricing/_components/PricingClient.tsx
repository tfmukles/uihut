"use client";

import PaddleLoader from "@/helpers/PaddleLoader";
import countryDetector from "@/lib/utils/countryDetector";
import { cn } from "@/lib/utils/shadcn";
import PageDots from "@/partials/PageDots";
import { TPricingData } from "../page";
import PriceCard from "./PriceCard";

const PricingClient = ({
  pricingData,
  className,
  currentPlan,
}: {
  pricingData: TPricingData;
  currentPlan: string | undefined;
  className?: string;
  disable?: boolean;
}) => {
  const { price_cards } = pricingData;
  const country = countryDetector();

  return (
    <>
      <PaddleLoader />
      <PageDots hideOnScroll />
      <section className={cn("mt-14", className)}>
        <div className="container-md relative bg-background">
          <div className="row mb-8 justify-center">
            {/* @ts-ignore */}
            {price_cards?.map((card, index) => (
              <PriceCard
                key={index}
                currentPlan={currentPlan}
                cardData={{
                  ...card,
                }}
              />
            ))}
          </div>
          <div className="row justify-center">
            {country === "Bangladesh" && (
              <div className="mb-5 rounded-lg bg-yellow-300 py-5 text-center md:col-8 lg:col-7 2xl:col-6">
                <strong className="block text-dark">
                  আপনার কাছে PayPal বা ক্রেডিট কার্ড না থাকলেও এখন থেকে UIHut-এ
                  bKash-এর মাধ্যমে পেমেন্ট করা সম্ভব। আপনি যদি bKash-এর মাধ্যমে
                  পেমেন্ট করতে চান, তাহলে অনুগ্রহ করে আমাদের হোয়াটসঅ্যাপে মেসেজ
                  করুন।: 01981340287
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
        </div>
      </section>
    </>
  );
};

export default PricingClient;
