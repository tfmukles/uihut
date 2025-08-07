import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import BlurSvg from "@/partials/BlurSvg";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import { notFound } from "next/navigation";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams = () => {
  const getRegularPages = getSinglePage("pages");

  const regularPages = getRegularPages.map((page: RegularPage) => ({
    regular: page.slug,
  }));

  return regularPages;
};

// for all regular pages
const RegularPages = async (props: { params: Promise<{ regular: string }> }) => {
  const params = await props.params;
  const regularData = getSinglePage("pages");
  const data = regularData.filter(
    (page: RegularPage) => page.slug === params.regular,
  )[0];

  if (!data) notFound();

  const { frontmatter, content } = data;
  const { title, meta_title, description, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <section className="py-14 md:py-20">
        <div className="container relative">
          <BlurSvg
            className="absolute left-0 top-[-50px] opacity-40 blur-[120px] max-lg:h-[150px] max-lg:w-[250px] max-lg:blur-[70px]"
            cx="130"
            cy="130"
            rx="130"
            ry="130"
            width="260"
            height="260"
            viewBox="0 0 260 260"
          >
            <linearGradient
              id="paint0_linear_1_20391"
              x1="297.7"
              y1="372.273"
              x2="-0.961671"
              y2="352.747"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFDE67" />
              <stop offset="0.320191" stopColor="#FF808D" />
              <stop offset="1" stopColor="#AC5EFA" />
            </linearGradient>
          </BlurSvg>
          <div className="row justify-center">
            <div className="col-10 md:col-8">
              <div className="content">
                <MDXContent content={content} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegularPages;
