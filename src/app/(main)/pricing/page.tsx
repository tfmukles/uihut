import { getOrders } from "@/app/action/order";
import { auth } from "@/auth";
import Assistant from "@/components/Assistant";
import { Separator } from "@/components/ui/separator";
import { getListPage } from "@/lib/contentParser";
import {
  checkExpiredPlans,
  checkMinihutPlan,
  getCurrentPlan,
} from "@/lib/utils/planFinder";
import FAQ from "@/partials/FAQ";
import Hero from "@/partials/Hero";
import PageDots from "@/partials/PageDots";
import Ratings from "@/partials/Ratings";
import { TReview } from "@/partials/Review";
import ReviewsSlider from "@/partials/ReviewsSlider";
import SeoMeta from "@/partials/SeoMeta";
import { SubscriptionPlans } from "@/types";
import PricingClient from "./_components/PricingClient";

export type TPricingData = {
  title: string;
  content: string;
  announcement: string;
  meta_title: string;
  description: string;
  image: string;
  draft?: boolean;
  price_cards: SubscriptionPlans;
  faqs: any;
};

const PricingPage = async () => {
  const { frontmatter: pricingData } =
    getListPage<TPricingData>("pricing/_index.md");
  const { frontmatter: reviewsData } = getListPage<TReview>(
    "sections/reviews.md",
  );

  // check current plan
  const { user } = (await auth()) || {};
  const { data: orders } = await getOrders(user?.id!);
  const currentPlan = getCurrentPlan(orders);
  const hasMinihutPackage = checkMinihutPlan(orders) || false;
  const hasExpiredPlans = checkExpiredPlans(orders) || false;

  return (
    <>
      <SeoMeta
        title={pricingData.meta_title}
        description={pricingData.description}
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
      <PricingClient
        pricingData={pricingData}
        currentPlan={currentPlan}
        hasMinihutPackage={hasMinihutPackage}
        hasExpiredPlans={hasExpiredPlans}
      />
      <Ratings />
      <ReviewsSlider reviewsData={reviewsData} />
      <FAQ faqs={pricingData.faqs} />
      <Assistant enable />
    </>
  );
};

export default PricingPage;
