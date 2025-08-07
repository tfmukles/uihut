import {
  getDesignsByCategory,
  getRecentDesigns,
  getTrendingDesigns,
} from "@/actions/designs";
import Assistant from "@/components/Assistant";
import { CustomLink } from "@/components/ui/button";
import Heading from "@/components/ui/title";
import { getListPage } from "@/lib/contentParser";
import BlurSvg from "@/partials/BlurSvg";
import CallToAction from "@/partials/CallToAction";
import ProductRow from "@/partials/ProductRow";
import Ratings from "@/partials/Ratings";
import Reviews from "@/partials/Reviews";
import SecondaryCta from "@/partials/SecondaryCta";
import SecondaryHero from "@/partials/SecondaryHero";
import SeoMeta from "@/partials/SeoMeta";
import { ICallToAction, IProductResourceIndex } from "@/types";
import Image from "next/image";

const DesignResourcesPage = async () => {
  const productByCategory = async (category: string) => {
    const data = (await getDesignsByCategory(category)).data?.slice(0, 8) || [];
    return { data };
  };

  const { frontmatter: CallToActionData2 } = getListPage<ICallToAction>(
    "sections/call-to-action-2.md",
  );
  const { frontmatter: CallToActionData3 } = getListPage<ICallToAction>(
    "sections/call-to-action-3.md",
  );

  const { frontmatter: resourcesData } = getListPage<IProductResourceIndex>(
    "design-resources/_index.md",
  );

  const {
    banner,
    recently_added,
    trending,
    web_template,
    web_app,
    mobile_app,
    illustrations,
    _3d_illustrations,
  } = resourcesData;

  return (
    <>
      <SeoMeta
        title="Design Resources: Free & Premium UI Kit, Template, Icon & More - Uihut"
        description="Level up your design with Uihut's vast library of free & premium design resources. Find Web UI, App UI, UI Kits, Illustrations, and Icons - all in one place!"
      />

      <Assistant enable />

      <SecondaryHero
        title={banner.title}
        description={banner.description}
        announcementText={banner.announcement}
        search_tags={banner.search_tags}
      />

      {/* Trending Resources */}
      <ProductRow
        gradient
        data={getTrendingDesigns}
        title={trending.title}
        description={trending.description}
        button={trending.button}
        sort="views-desc"
        separator={false}
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

      <section className="my-[72px]">
        {/* recently_added  */}
        <ProductRow
          data={getRecentDesigns}
          title={recently_added.title}
          description={recently_added.description}
          button={recently_added.button}
          sort="createdAt-desc"
        />

        {/* Web Template */}
        <ProductRow
          //@ts-ignore
          data={async () => await productByCategory("web-template")}
          title={web_template.title}
          description={web_template.description}
          button={web_template.button}
          cardSize="lg"
        />
      </section>

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

      <ProductRow
        //@ts-ignore
        data={async () => await productByCategory("mobile-app")}
        title={mobile_app.title}
        description={mobile_app.description}
        button={mobile_app.button}
        separator={false}
      />

      {/* web app */}
      <ProductRow
        //@ts-ignore
        data={async () => await productByCategory("web-app")}
        title={web_app.title}
        description={web_app.description}
        button={web_app.button}
      />

      {/* Illustrations */}
      <section className="my-[72px] lg:mb-24">
        <div className="container-md">
          <div className="grid gap-8 md:grid-cols-2 md:gap-6">
            <div className="flex flex-col">
              <div className="dark-gradient-bg relative overflow-hidden rounded-xl border border-border md:order-1 max-md:mb-6">
                <Image
                  width={640}
                  height={400}
                  src={illustrations.image}
                  alt="illustrations"
                  className="mx-auto"
                />
              </div>
              <div className="mb-[26px] flex items-center justify-between gap-6">
                <div className="max-sm:mb-3">
                  <Heading className="mb-1.5" level="h3" variant="gradient">
                    {illustrations.title}
                  </Heading>
                  <p className="text-sm">{illustrations.description}</p>
                </div>
                <CustomLink
                  href={illustrations.button.link}
                  size="lg"
                  variant="outline-gradient"
                  glow
                >
                  {illustrations.button.label}
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

export default DesignResourcesPage;
