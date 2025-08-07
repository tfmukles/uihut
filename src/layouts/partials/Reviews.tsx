import { CardGridPattern } from "@/assets/patterns";
import Heading from "@/components/ui/title";
import { getListPage } from "@/lib/contentParser";
import IconStarryBg from "@/public/images/backgrounds/animated-icon-bg.svg";
import UserIcon from "@/public/images/svgs/user.svg";
import Image from "next/image";
import AnimatedIcon from "../components/ui/animated-icon";
import Review, { TReview } from "./Review";

function Reviews() {
  const { frontmatter: reviewsData } = getListPage<TReview>(
    "sections/reviews.md",
  );

  return (
    <>
      {reviewsData.enable && (
        <section className="my-[72px] lg:mt-[95px]">
          <div className="container">
            <div className="card-bg relative mb-8 rounded-xl border border-border px-6 py-16 md:px-8 lg:mb-16 lg:py-24 lg:pb-[50px] xl:px-16">
              <CardGridPattern className="absolute right-0 top-0 max-md:max-w-[300px]" />
              <div className="relative mb-6 text-center">
                <Image
                  className="pointer-events-none absolute -top-[20%] left-1/2 -translate-x-1/2"
                  src={IconStarryBg}
                  alt="bg-stars"
                />
                <AnimatedIcon className="mb-[18px]">
                  <Image
                    src={UserIcon}
                    width={50}
                    height={50}
                    quality={100}
                    alt="icon"
                  />
                </AnimatedIcon>
                <Heading className="mb-1" level="h2" variant={"gradient"}>
                  {reviewsData.title}
                </Heading>
                <p className="text-text-light">{reviewsData.description} </p>
              </div>

              <div className="gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
                {reviewsData.review_items.map((review, i) => (
                  <Review review_items={review} key={i} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Reviews;
