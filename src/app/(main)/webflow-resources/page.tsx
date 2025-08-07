import getTrendingWebflowThemes from "@/actions/webflow";
import Assistant from "@/components/Assistant";
import { getListPage } from "@/lib/contentParser";
import BlurSvg from "@/partials/BlurSvg";
import CallToAction from "@/partials/CallToAction";
import ProductRow from "@/partials/ProductRow";
import Ratings from "@/partials/Ratings";
import { TReview } from "@/partials/Review";
import Reviews from "@/partials/Reviews";
import SecondaryCta from "@/partials/SecondaryCta";
import SecondaryHero from "@/partials/SecondaryHero";
import SeoMeta from "@/partials/SeoMeta";
import { ICallToAction, IProductResourceIndex } from "@/types";

const WebflowResourcesPage = async () => {
  const { frontmatter: reviewsData } = getListPage<TReview>(
    "sections/reviews.md",
  );
  const { frontmatter: CallToActionData2 } = getListPage<ICallToAction>(
    "sections/call-to-action-2.md",
  );
  const { frontmatter: CallToActionData3 } = getListPage<ICallToAction>(
    "sections/call-to-action-4.md",
  );

  const { frontmatter: resourcesData } = getListPage<IProductResourceIndex>(
    "webflow-resources/_index.md",
  );

  const { banner, trending } = resourcesData;

  return (
    <>
      <SeoMeta
        title="Webflow Resources for Seamless Website Creation - UIHut"
        description="Explore high-quality Webflow resources at UIHut. Perfect for creating stunning websites quickly and efficiently."
      />

      <Assistant enable />

      <SecondaryHero
        title={banner.title}
        description={banner.description}
        announcementText={banner.announcement}
        search_tags={banner.search_tags}
        disableSearchBox
      />

      {/* Trending Resources */}
      <ProductRow
        gradient
        // @ts-ignore
        data={getTrendingWebflowThemes}
        title={trending.title}
        description={trending.description}
        button={trending.button}
        sort="views-desc"
        separator={false}
        type="Webflow"
      >
        <BlurSvg
          className="absolute -top-[5%] right-[5%] opacity-75 blur-[60px] max-md:w-[200px] md:right-[10%] md:top-0 md:blur-[100px]"
          width={490}
          height={150}
          viewBox="0 0 490 75"
          cx={245}
          rx={245}
          ry={75}
          fill="#AC5EFA"
        />
      </ProductRow>

      <SecondaryCta
        className="my-0"
        videoId={CallToActionData3.video_id!}
        icon={CallToActionData3.icon as string}
        title={CallToActionData3.title}
        description={CallToActionData3.description}
        image={CallToActionData3.image}
        link={{
          href: CallToActionData3.button.link,
          label: CallToActionData3.button.label,
        }}
      />

      <CallToAction
        title={CallToActionData2.title}
        description={CallToActionData2.description}
        link={{
          href: CallToActionData2.button.link,
          label: CallToActionData2.button.label,
        }}
      />

      <Reviews />
      <Ratings className="mb-[72px]" />
    </>
  );
};

export default WebflowResourcesPage;
