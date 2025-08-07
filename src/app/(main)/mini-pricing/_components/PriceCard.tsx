"use client";

import { CheckCircle } from "@/assets/icons";
import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import DiscountTag from "@/components/ui/discount-tag";
import Spinner from "@/components/ui/spinner";
import Heading from "@/components/ui/title";
import { Button } from "@/layouts/components/ui/button";
import { Separator } from "@/layouts/components/ui/separator";
import { ENV, VENDOR_AUTH_CODE, VENDOR_ID } from "@/lib/constant";
import Axios from "@/lib/utils/axios";
import { cn } from "@/lib/utils/shadcn";
import { slugify } from "@/lib/utils/textConverter";
import BlurSvg from "@/partials/BlurSvg";
import { MovingBorder } from "@/partials/MovingBorder";
import { SubscriptionPlans } from "@/types";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Props = {
  cardData: SubscriptionPlans["lifetime"][0] & {
    disable?: boolean;
    button_text?: string;
  };
  className?: string;
  currentPlan?: string;
};

function PriceCard({ cardData, currentPlan }: Props) {
  // Destructure cardData and define a B2B flag
  const {
    package_name,
    features,
    button_text,
    product_id,
    discount_rate,
    discount_price,
    regular_price,
    limit,
    plan_description,
    recommended,
    disable,
  } = cardData;

  const variant = recommended ? "animated" : "default";
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { data: session, status } = useSession();
  const [loader, setLoader] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handleSetPackage = (package_name: string) => {
    localStorage.setItem("selectedPackage", package_name);
  };

  const handlePurchase = async (product_id: string, package_name: string) => {
    try {
      setLoader(true);
      await Axios.post("abandoned-mail", {
        user_id: session?.user.id,
        user_email: session?.user.email,
        first_name: session?.user.firstName,
        last_name: session?.user.lastName,
        package: package_name,
        current_time: new Date().toISOString(),
      });

      const paddleResponse = await Axios.post("/paddle/generate-pay-link", {
        vendor_id: VENDOR_ID,
        vendor_auth_code: VENDOR_AUTH_CODE,
        customer_email: session?.user.email,
        product_id: product_id,
        quantity_variable: 0,
        marketing_consent: 0,
        is_recoverable: 0,
        return_url: `${
          ENV === "development" ? "http://localhost:3000" : "https://uihut.com"
        }/thank-you?purchase=true`,
      });

      // @ts-ignore
      Paddle.Checkout.open({
        override: paddleResponse.data.url,
        customData: {
          user_id: session?.user.id,
          package: package_name,
        },
        closeCallback: async () => {
          setLoader(false);
        },
      });
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      status === "authenticated" &&
      selectedPackage &&
      selectedPackage === package_name
    ) {
      buttonRef.current?.click();
      localStorage.removeItem("selectedPackage");
    }
  }, [status, selectedPackage]);

  // Fix localStorage check: use "typeof window !== 'undefined'"
  useEffect(() => {
    setSelectedPackage(
      typeof window !== "undefined"
        ? localStorage.getItem("selectedPackage")
        : null,
    );
  }, []);

  const isAnimated = variant === "animated";
  const isAuthenticated =
    package_name === selectedPackage && status === "authenticated";

  const PriceCardContent = () => (
    <>
      <Heading className="mb-[22px] inline-block text-h4 lg:text-h4" level="h2">
        <span className="gradient-text">{package_name} </span>
        {discount_rate && <DiscountTag>Save {discount_rate}</DiscountTag>}
      </Heading>
      <Heading className="mb-2 !tracking-normal" level="h3">
        {discount_price && (
          <>
            <del className="text-muted-foreground">{regular_price}</del>{" "}
          </>
        )}
        <span className="text-foreground">
          {discount_price || regular_price}
        </span>{" "}
        <span className="text-base font-normal text-text-light">/ {limit}</span>
      </Heading>
      <p className="mb-[34px] text-sm text-text-light">{plan_description}</p>

      <PriceCardButton />
      <Separator className="absolute bottom-0 left-0 w-full" size="lg" />
    </>
  );

  const PriceCardButton = () => {
    if (!session) {
      return (
        <Button
          isProtected={true}
          className="w-full"
          size="xl"
          glow={variant === "animated"}
          onClick={() => handleSetPackage(package_name)}
          disabled={disable}
        >
          {button_text || "Get Started"}
        </Button>
      );
    }
    return (
      <Button
        className="w-full"
        size="xl"
        glow={variant === "animated"}
        {...(isAuthenticated && { ref: buttonRef })}
        onClick={() => {
          if (product_id) {
            handlePurchase(product_id, package_name);
          } else {
            redirect("/contact");
          }
        }}
        disabled={loader || currentPlan === slugify(package_name) || disable}
      >
        {currentPlan === slugify(package_name) ? "Current Plan" : button_text}
        {loader && <Spinner />}
      </Button>
    );
  };

  const PriceCardFeatures = () => (
    <ul className="mb-6 space-y-2.5 pl-1 md:space-y-4">
      {features.map((listItem, i) => (
        <li
          className={cn(
            "relative pl-7 text-sm",
            !listItem.has_feature && "text-muted-foreground",
          )}
          key={i}
        >
          <CheckCircle
            className={cn(
              "absolute left-0 top-0",
              !listItem.has_feature && "text-muted-foreground/50",
            )}
          />
          {listItem.label}
        </li>
      ))}
    </ul>
  );

  return isAnimated ? (
    <div className="col-12 mb-6 md:col-8 lg:col-7 2xl:col-6">
      <MovingBorder
        rounded={16}
        duration={8000}
        containerClassName="bg-border h-full"
      >
        <div className="card-bg h-full items-center justify-between rounded-2xl border border-border md:flex">
          <div className="relative overflow-hidden p-4 lg:p-6 xl:p-[30px]">
            <div>
              <BlurSvg
                className="absolute bottom-0 left-0 blur-[35px]"
                width="262"
                height="206"
                viewBox="0 0 262 206"
                cx="44"
                cy="218"
                rx="78"
                ry="78"
                fill="#70CF96B2"
              />
              <AnimatedStarryBg fill sizes="100vw" />
            </div>
            <div className="relative">
              <PriceCardContent />
            </div>
          </div>
          <div className="p-4 pt-6 lg:p-6 lg:pt-[45px] xl:p-[30px]">
            <PriceCardFeatures />
          </div>
        </div>
      </MovingBorder>
    </div>
  ) : (
    <div className="col-12 mb-6 md:col-8 lg:col-7 2xl:col-6">
      <div className="card-bg h-full items-center justify-between rounded-2xl border border-border md:flex">
        <div className="relative overflow-hidden p-4 lg:p-6 xl:p-[30px]">
          <div className="relative">
            <PriceCardContent />
          </div>
        </div>
        <div className="p-4 pt-6 lg:p-6 lg:pt-[45px] xl:p-[30px]">
          <PriceCardFeatures />
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
