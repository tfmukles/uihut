import { getOrders } from "@/app/action/order";
import { auth } from "@/auth";
import Assistant from "@/components/Assistant";
import { Separator } from "@/components/ui/separator";
import { getListPage } from "@/lib/contentParser";
import { getCurrentPlan } from "@/lib/utils/planFinder";
import FAQ from "@/partials/FAQ";
import Hero from "@/partials/Hero";
import PageDots from "@/partials/PageDots";
import Ratings from "@/partials/Ratings";
import { TReview } from "@/partials/Review";
import ReviewsSlider from "@/partials/ReviewsSlider";
import SeoMeta from "@/partials/SeoMeta";
import { SubscriptionPlans } from "@/types";
import { notFound } from "next/navigation";
import PricingClient from "./_components/PricingClient";

export type TPricingData = {
  title: string;
  content: string;
  announcement: string;
  meta_title: string;
  description: string;
  noindex: boolean;
  image: string;
  draft?: boolean;
  price_cards: SubscriptionPlans;
  faqs: any;
};

const PricingPage = async () => {
  const { frontmatter: pricingData } = getListPage<TPricingData>(
    "mini-pricing/_index.md",
  );

  if (pricingData.draft) return notFound();

  const { frontmatter: reviewsData } = getListPage<TReview>(
    "sections/reviews.md",
  );

  // check current plan
  const { user } = (await auth()) || {};
  const { data: orders } = await getOrders(user?.id!);
  const currentPlan = getCurrentPlan(orders);

  return (
    <>
      <SeoMeta
        title={pricingData.meta_title}
        description={pricingData.description}
        image={pricingData.image}
        noindex={pricingData.noindex}
      />

      <Hero
        containerClassName="py-8"
        title={pricingData.title}
        description={pricingData.content}
        announcement={pricingData.announcement}
        headingClassName="!text-[32px] lg:!text-[44px]"
        starryBg
        searchBox={false}
        showTags={false}
        userRating={false}
        blob
      />
      <Separator className="relative z-30" />
      <PageDots className="-mt-[2px]" />
      <PricingClient pricingData={pricingData} currentPlan={currentPlan} />
      <Ratings />
      <ReviewsSlider reviewsData={reviewsData} />
      <FAQ faqs={pricingData.faqs} />
      <Assistant enable />
    </>
  );
};

export default PricingPage;
