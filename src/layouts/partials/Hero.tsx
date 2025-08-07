import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import HeroBorder from "@/components/HeroBorder";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-input";
import Heading from "@/components/ui/title";
import { cn } from "@/lib/utils/shadcn";
import BlurSvg from "@/partials/BlurSvg";
import { Banner } from "@/types";
import HeroTag from "./HeroTag";
import { MovingBorder } from "./MovingBorder";
import UserRating from "./UserRating";

const Hero = async (props: Banner) => {
  const {
    title,
    description,
    announcement,
    starryBg = false,
    userRating = true,
    showTags = true,
    searchBox = true,
    headingClassName,
    containerClassName,
    className,
    blob,
    search_tags,
    user_ratings,
    badge_link,
  } = props;

  return (
    <section className={className}>
      <div
        className={cn(
          "relative pt-[58px] pb-10 text-center max-lg:overflow-hidden",
          containerClassName,
        )}
      >
        {blob && (
          <BlurSvg
            className="absolute top-0 -right-[10%] aspect-square -translate-x-1/2 opacity-40 blur-[100px] max-lg:w-[120px] lg:right-0"
            width={260}
            height={260}
            viewBox="0 0 260 260"
            cy="130"
            cx="130"
            rx="130"
            ry="130"
          >
            <linearGradient
              id="paint0_linear_104_19197_dsfl"
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
        )}
        {starryBg && <AnimatedStarryBg />}
        <div className="relative z-1 mx-auto flex aspect-auto max-w-[1180px] flex-col items-center">
          <HeroTag text={announcement} link={badge_link} />
          <Heading
            className={cn(
              "font-primary mt-7 aspect-auto font-medium",
              headingClassName,
            )}
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="text-muted-foreground mt-4 max-w-[728px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {searchBox && (
            <div className="mt-7 mb-7 w-full max-w-[352px] md:mt-[41px]">
              <MovingBorder
                duration={5000}
                containerClassName="bg-border/50"
                rounded={12}
              >
                <IconInput
                  enableSearch
                  id="searchbox"
                  className="border-muted-foreground/50"
                />
              </MovingBorder>
            </div>
          )}

          <div className="3xl:max-w-[900px] mx-auto mb-12 flex max-w-[600px] flex-wrap items-center justify-center gap-2">
            {showTags &&
              search_tags?.map((tag: string, i: number) => {
                return (
                  <Button
                    key={tag + "_" + i}
                    variant="tag"
                    size="tag"
                    value={tag}
                  >
                    {tag}
                  </Button>
                );
              })}
          </div>
          {userRating && (
            <UserRating className="text-muted-foreground" {...user_ratings!} />
          )}
        </div>
        <HeroBorder />
      </div>
    </section>
  );
};
export default Hero;
