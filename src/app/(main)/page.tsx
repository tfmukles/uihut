import Assistant from "@/components/Assistant";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import { CustomLink } from "@/layouts/components/ui/button";
import { getListPage } from "@/lib/contentParser";
import BlurSvg from "@/partials/BlurSvg";
import CallToAction from "@/partials/CallToAction";
import DesignResources from "@/partials/DesignResources";
import Hero from "@/partials/Hero";
import PageDots from "@/partials/PageDots";
import Plans from "@/partials/Plans";
import Plugins from "@/partials/Plugins";
import ProductRow from "@/partials/ProductRow";
import Ratings from "@/partials/Ratings";
import Reviews from "@/partials/Reviews";
import SeoMeta from "@/partials/SeoMeta";
import { ICallToAction, IHomePageData } from "@/types";
import Image from "next/image";
import {
  getDesignsByCategory,
  getHandpickedDesigns,
  getRecentDesigns,
} from "../action/designs";

const Home = async () => {
  const [
    { frontmatter: homepageData },
    { frontmatter: CallToActionData },
    { frontmatter: CallToActionData2 },
  ] = await Promise.all([
    getListPage<IHomePageData>("homepage/_index.md"),
    getListPage<ICallToAction>("sections/call-to-action.md"),
    getListPage<ICallToAction>("sections/call-to-action-2.md"),
  ]);

  const {
    banner,
    design_resource,
    resources,
    handpicked,
    web_template,
    web_app,
    mobile_app,
    illustrations: illustrationsData,
    _3d_illustrations,
    recently_added,
    plugins,
    plan_feature,
  } = homepageData;

  const productByCategory = async (category: string) => {
    const { data } = await getDesignsByCategory(category);
    return { data: data?.slice(0, 8) || [] };
  };

  return (
    <>
      <SeoMeta {...homepageData} />
      <Assistant enable />
      <PageDots hideOnScroll />
      <Hero
        className="bg-gradient-gradient font-display-swap h-auto"
        {...banner}
        containerClassName="bg-gradient-b"
        headingClassName="max-sm:text-2xl"
        badge_link="/webflow-resources"
      />

      <DesignResources {...design_resource} resources={resources} />

      {/* Trending Resources */}
      {/* <ProductRow
        gradient
        data={getHandpickedDesigns}
        title={trending.title}
        description={trending.description}
        button={trending.button}
        // sort="views-desc"
      >
        <BlurSvg
          className="absolute -left-[5%] -top-[5%] blur-[60px] max-md:w-[300px] md:-left-[10%] md:top-0 md:blur-[100px]"
          cx={525}
          rx={245}
          ry={75}
        >
          <linearGradient
            id="gradientId1"
            x1="561.05"
            y1="214.773"
            x2="20.4393"
            y2="99.3166"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e877ab" />
            <stop offset="0.320191" stopColor="#ac5efa" />
          </linearGradient>
        </BlurSvg>
      </ProductRow> */}

      <ProductRow
        gradient
        data={getHandpickedDesigns}
        title={handpicked.title}
        description={handpicked.description}
        button={handpicked.button}
      >
        <BlurSvg
          className="absolute -left-[5%] -top-[5%] blur-[60px] max-md:w-[300px] md:-left-[10%] md:top-0 md:blur-[100px]"
          cx={525}
          rx={245}
          ry={75}
        >
          <linearGradient
            id="gradientId1"
            x1="561.05"
            y1="214.773"
            x2="20.4393"
            y2="99.3166"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e877ab" />
            <stop offset="0.320191" stopColor="#ac5efa" />
          </linearGradient>
        </BlurSvg>
      </ProductRow>

      {/* recent Resources */}
      <ProductRow
        gradient
        data={getRecentDesigns}
        title={recently_added.title}
        description={recently_added.description}
        button={recently_added.button}
        sort="createdAt-desc"
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

      {/* Web Template */}
      <ProductRow
        //@ts-ignore
        data={async () => await productByCategory("web-template")}
        title={web_template.title}
        description={web_template.description}
        button={web_template.button}
        cardSize="lg"
      />

      {/* web app */}
      <ProductRow
        //@ts-ignore
        data={async () => await productByCategory("web-app")}
        title={web_app.title}
        description={web_app.description}
        button={web_app.button}
      />

      {/* mobile app */}
      <ProductRow
        //@ts-ignore
        data={async () => await productByCategory("mobile-app")}
        title={mobile_app.title}
        description={mobile_app.description}
        button={mobile_app.button}
      />

      <Separator />

      {/* Illustrations */}
      <section className="my-[72px] lg:mb-24">
        <div className="container-md">
          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col">
              <div className="dark-gradient-bg relative overflow-hidden rounded-xl border border-border md:order-1 max-md:mb-6">
                <Image
                  width={640}
                  height={400}
                  src={illustrationsData.image}
                  alt="illustrations"
                  className="mx-auto"
                />
              </div>

              <div className="mb-[26px] flex items-center justify-between gap-6">
                <div className="max-sm:mb-3">
                  <Heading className="mb-1.5" level="h3" variant="gradient">
                    {illustrationsData.title}
                  </Heading>
                  <p className="text-sm">{illustrationsData.description}</p>
                </div>
                <CustomLink
                  href={illustrationsData.button.link}
                  size="lg"
                  variant="outline-gradient"
                  glow
                >
                  {illustrationsData.button.label}
                </CustomLink>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="dark-gradient-bg relative overflow-hidden rounded-xl border border-border md:order-1 max-md:mb-6">
                <Image
                  width={640}
                  height={400}
                  src={_3d_illustrations.image}
                  alt="3d-illustrations"
                  className="mx-auto"
                />
              </div>
              <div className="mb-[26px] flex items-center justify-between gap-6">
                <div className="max-sm:mb-3">
                  <Heading className="mb-1.5" level="h3" variant="gradient">
                    {_3d_illustrations.title}{" "}
                  </Heading>
                  <p className="text-sm">{_3d_illustrations.description}</p>
                </div>
                <CustomLink
                  href={_3d_illustrations.button.link}
                  size="lg"
                  variant="outline-gradient"
                  glow
                >
                  {_3d_illustrations.button.label}
                </CustomLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CallToAction
        className="mt-0"
        title={CallToActionData.title}
        description={CallToActionData.description}
        link={{
          href: CallToActionData.button.link,
          label: CallToActionData.button.label,
        }}
      />

      {/* Plugins */}
      <Plugins plugins={plugins} />

      {/* Reviews */}
      <Reviews />

      <CallToAction
        title={CallToActionData2.title}
        description={CallToActionData2.description}
        link={{
          href: CallToActionData2.button.link,
          label: CallToActionData2.button.label,
        }}
      />

      <Ratings />

      {/* B2B and B2C Plans */}
      <Plans features={plan_feature} />
    </>
  );
};

export default Home;
