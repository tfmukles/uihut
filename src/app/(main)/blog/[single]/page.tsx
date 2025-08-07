import BlogCard from "@/components/BlogCard";
import HeroBorder from "@/components/HeroBorder";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import MDXContent from "@/helpers/MDXContent";
import { getSinglePage } from "@/lib/contentParser";
import dateFormat from "@/lib/utils/dateFormat";
import { cn } from "@/lib/utils/shadcn";
import similarItems from "@/lib/utils/similarItems";
import { markdownify } from "@/lib/utils/textConverter";
import PageDots from "@/partials/PageDots";
import SeoMeta from "@/partials/SeoMeta";
import { Post } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export const generateStaticParams: () => { single: string }[] = () => {
  const posts: Post[] = getSinglePage("blog");
  const paths = posts.map((post) => ({
    single: post.slug!,
  }));

  return paths;
};

const PostSingle = async (props: { params: Promise<{ single: string }> }) => {
  const params = await props.params;
  const posts: Post[] = getSinglePage("blog");
  const post = posts.filter((page) => page.slug === params.single)[0];

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;
  const { title, meta_title, image, author, date, last_update, description } =
    frontmatter;
  const similarPosts = similarItems(post, posts, post.slug!);

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageDots hideOnScroll />
      <section>
        <div
          className={cn(
            "container-md relative bg-background pb-10 pt-[58px] text-center max-lg:overflow-hidden",
          )}
        >
          <HeroBorder />
        </div>

        <div className="container">
          <div className="row relative z-20 justify-center">
            <article className="lg:col-8">
              <Heading
                dangerouslySetInnerHTML={markdownify(title)}
                className="mb-6 !text-h2"
                variant="gradient"
                level={"h1"}
              />

              <div className="mb-10 flex flex-wrap items-center space-x-4">
                {author && (
                  <span className="text-text-light">Posted By: {author}</span>
                )}
                <Separator className="h-6" orientation="vertical" />
                <span className="text-text-light">
                  Updated: {dateFormat(last_update!)}
                </span>
              </div>

              {image && (
                <div className="mb-10">
                  <Image
                    src={image}
                    height={540}
                    width={960}
                    alt={title}
                    className="w-full"
                  />
                </div>
              )}

              <div className="content mb-10">
                <MDXContent content={content} />
              </div>
            </article>
          </div>

          {/* <!-- Related posts --> */}
          {similarPosts.length > 0 && (
            <div className="pt-24">
              <h2 className="h3 mb-7">Similar Posts</h2>
              <div className="row">
                {similarPosts.map((post) => (
                  <div key={post.slug} className="mb-14 md:col-4 lg:col-3">
                    <BlogCard size="lg" data={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PostSingle;
