import Assistant from "@/components/Assistant";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getListPage } from "@/lib/contentParser";
import { markdownify } from "@/lib/utils/textConverter";
import Hero from "@/partials/Hero";
import PageDots from "@/partials/PageDots";
import SeoMeta from "@/partials/SeoMeta";

type Asset = {
  title: string;
  files: string[];
};

type BrandAssetsPage = {
  title: string;
  meta_title: string;
  description: string;
  content: string;
  image: string;
  canonical: string;
  noindex: boolean;
  draft: boolean;
  assets: Asset[];
};

const BrandsPage = async () => {
  const { frontmatter: brandsData } =
    getListPage<BrandAssetsPage>("brands/_index.md");

  const white_brands_list = [
    "logo_mark_gradient",
    "logo_mark_base",
    "full_logo_dark",
    "full_logo_gradient",
  ];

  const needsWhiteBackground = (fileName: string) => {
    const baseFileName = fileName.split("/").pop()?.split(".")[0].toLowerCase();

    return white_brands_list.some(
      (brandName) => baseFileName === brandName.toLowerCase(),
    );
  };

  return (
    <>
      <SeoMeta
        title={brandsData.meta_title}
        description={brandsData.description}
      />

      <Hero
        containerClassName="pb-10"
        title={brandsData.title}
        description={brandsData.content}
        announcement={"Uihut Brand & Logos"}
        headingClassName="!text-[32px] lg:!text-[44px]"
        starryBg
        searchBox={false}
        showTags={false}
        userRating={false}
        blob
      />
      <Separator className="relative z-30" />
      <PageDots className="-mt-[2px]" />

      <section className="my-[72px] lg:my-28">
        <div className="container">
          <h2
            className="h3 pb-7"
            dangerouslySetInnerHTML={markdownify(brandsData.title)}
          />

          <div className="row g-4">
            {brandsData?.assets.map((asset, index) => (
              <div
                className="mb-8 sm:col-6 md:col-4 lg:col-3 last:mb-0"
                key={index}
              >
                <figure
                  className={`flex aspect-video items-center justify-center border border-border px-6 ${
                    needsWhiteBackground(asset.files[0])
                      ? "bg-white"
                      : "card-bg"
                  }`}
                >
                  <img src={asset.files[0]} alt={asset.title} />
                </figure>

                <div className="mt-4">
                  <h3 className="font-secondary h5 mb-2 font-medium">
                    {asset.title}
                  </h3>
                  <div className="flex gap-2">
                    <a href={asset.files[0]} download>
                      <Button variant="tag" size="tag">
                        PNG
                        <DownloadSVG />
                      </Button>
                    </a>

                    <a href={asset.files[1]} download>
                      <Button variant="tag" size="tag">
                        SVG
                        <DownloadSVG />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Assistant enable />
    </>
  );
};

export default BrandsPage;

const DownloadSVG = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 1.49982V8.62482"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.625 5.24982L6 8.62482L9.375 5.24982"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 10.1248H10.125"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
