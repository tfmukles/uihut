import { getListPage, getSinglePage } from "@/lib/contentParser";
import { getTaxonomy } from "@/lib/taxonomyParser";
import { humanize, slugify } from "@/lib/utils/textConverter";
import BlogRow from "@/partials/BlogRow";
import SecondaryHero from "@/partials/SecondaryHero";
import SeoMeta from "@/partials/SeoMeta";
import { TBlogIndex } from "@/types";
import { notFound } from "next/navigation";

// generate static params
export const generateStaticParams = async () => {
  const blogPages = getSinglePage("blog");

  // Collect unique categories
  const categories = blogPages.reduce((acc: any, page: any) => {
    page.frontmatter.categories.forEach((category: string) => {
      const slugCategory = slugify(category);
      if (!acc.includes(slugCategory)) {
        acc.push(slugCategory);
      }
    });
    return acc;
  }, []);

  const params = categories.map((category: string) => ({
    category,
  }));

  return params;
};

const CategoryPage = async (props: { params: Promise<{ category: string }> }) => {
  const params = await props.params;
  const { frontmatter: blogIndex } = getListPage<TBlogIndex>("blog/_index.md");
  const allCategories = getTaxonomy("blog", "categories");
  const blogData = getSinglePage("blog");

  const { category } = params;

  const categoryBlogs = blogData.filter((page: any) =>
    page.frontmatter.categories.some(
      (cat: string) => slugify(cat) === slugify(category),
    ),
  );

  if (categoryBlogs.length === 0) notFound();

  return (
    <>
      <SeoMeta title={`Blog - ${category}`} />

      <SecondaryHero
        title={blogIndex.title}
        description={blogIndex.description}
        categoriesTag={allCategories}
        announcementText={""}
        disableSearchBox={true}
        blobColor=""
      />

      <section className="my-[72px]">
        <BlogRow data={categoryBlogs} title={`${humanize(category)}`} />
      </section>
    </>
  );
};

export default CategoryPage;
