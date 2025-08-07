import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import BlogRow from "@/partials/BlogRow";
import BlurSvg from "@/partials/BlurSvg";
import CallToAction from "@/partials/CallToAction";
import SecondaryHero from "@/partials/SecondaryHero";
import SeoMeta from "@/partials/SeoMeta";
import { ICallToAction, TBlogIndex } from "@/types";

const page = async () => {
  const { frontmatter: blogIndex } = getListPage<TBlogIndex>("blog/_index.md");
  const allCategories = getTaxonomy("blog", "categories");
  const blogPosts = getSinglePage("blog");
  const { frontmatter: CallToActionData } = getListPage<ICallToAction>(
    "sections/call-to-action.md",
  );

  const recentBlogs = blogPosts
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    )
    .slice(0, 4);

  return (
    <>
      <SeoMeta
        title={blogIndex.title}
        meta_title={blogIndex.meta_title}
        description={blogIndex.description}
      />
      <SecondaryHero
        title={blogIndex.title}
        description={blogIndex.description}
        categoriesTag={allCategories}
        announcementText={""}
        disableSearchBox={true}
        blobColor=""
      />

      <section className="my-[72px]">
        <BlogRow data={recentBlogs} title={"Recent Blogs"} />

        <BlogRow gradient data={blogPosts} title={"All Blogs"}>
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
        </BlogRow>
      </section>

      <CallToAction
        className="my-0 -mb-[1px]"
        title={CallToActionData.title}
        description={CallToActionData.description}
        link={{
          href: CallToActionData.button.link,
          label: CallToActionData.button.label,
        }}
      />
    </>
  );
};

export default page;
