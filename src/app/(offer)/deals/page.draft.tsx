import { getOrders } from "@/actions/order";
import PricingClient from "@/app/(main)/pricing/_components/PricingClient";
import { TPricingData } from "@/app/(main)/pricing/page";
import { auth } from "@/auth";
import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import HeroBorder from "@/components/HeroBorder";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import { getListPage } from "@/lib/contentParser";
import { getCurrentPlan } from "@/lib/utils/planFinder";
import BlurSvg from "@/partials/BlurSvg";
import FAQ from "@/partials/FAQ";
import { BottomFloatingDots } from "@/partials/FloatingDot";
import HeroTag from "@/partials/HeroTag";
import PageDots from "@/partials/PageDots";
import Goto from "./_components/go-to";

export default async function Deals() {
  const { frontmatter: pricingData } =
    getListPage<TPricingData>("deals/_index.md");

  // check current plan
  const { user } = (await auth()) || {};
  const { data: orders } = await getOrders(user?.id!);
  const currentPlan = getCurrentPlan(orders);

  return (
    <>
      <PageDots hideOnScroll />
      <section className="bg-gradient-gray relative overflow-hidden">
        <div
          className={
            "container-md relative pb-10 pt-[58px] text-center max-lg:overflow-hidden"
          }
        >
          <AnimatedStarryBg />
          <div className="relative z-1 mx-auto flex aspect-auto max-w-xl flex-col items-center">
            <HeroTag text={"26,000+ Design Resources"} />
            <Heading
              className={
                "mt-7 aspect-auto font-primary font-bold text-white max-sm:text-4xl lg:!text-7xl"
              }
            >
              New Year Sale!
              <span className="btn-gradient clip-gradient mt-2.5 block">
                Flat 60% OFF!
              </span>
            </Heading>
            <p className="mb-7 mt-5 max-w-3xl text-balance lg:text-lg">
              Don't miss out on our new year sale. Exclusive discount on UIHut's
              Lifetime Plans!
            </p>
            <Goto />
          </div>
          <HeroBorder />
          <BottomFloatingDots className="max-md:hidden max-xl:[&>*:first-child]:hidden max-xl:[&>*:last-child]:hidden" />
        </div>
        <BlurSvg
          className="absolute left-0 top-64 aspect-square -translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
          width={240}
          height={240}
          viewBox="0 0 240 240"
          cy="120"
          cx="120"
          rx="120"
          ry="120"
          fill={"#882AECB2"}
        />
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
        <Separator className="absolute bottom-0 left-0 z-10 w-full" />
      </section>

      <div className="deal-announcement">
        <PricingClient
          disable={false}
          pricingData={pricingData}
          currentPlan={currentPlan}
          hasMinihutPackage={false}
          hasExpiredPlans={false}
          className="mb-10 bg-transparent [&>*]:bg-transparent"
        />
      </div>
      <FAQ faqs={pricingData.faqs} />
    </>
  );
}
