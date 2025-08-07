import CategoriesTag from "@/components/CategoriesTag";
import HeroBorder from "@/components/HeroBorder";
import { IconInput } from "@/components/ui/icon-input";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import { Button } from "@/layouts/components/ui/button";
import { cn } from "@/lib/utils/shadcn";
import { markdownify } from "@/lib/utils/textConverter";
import PageDots from "@/partials/PageDots";
import BlurSvg from "./BlurSvg";
import HeroTag from "./HeroTag";
import { MovingBorder } from "./MovingBorder";

type Props = {
  title: string;
  description: string;
  announcementText?: string;
  blobColor?: string;
  disableSearchBox?: boolean;
  search_tags?: string[];
  categoriesTag?: string[];
  className?: string;
  containerClassName?: string;
};

export default function SecondaryHero({
  title,
  description,
  announcementText,
  blobColor = "#ff808f99",
  search_tags,
  disableSearchBox = false,
  categoriesTag,
  className,
  containerClassName,
}: Props) {
  return (
    <>
      <PageDots hideOnScroll />
      <section className={cn("relative", className)}>
        <div
          className={cn(
            "container-md relative pt-[58px] pb-10 text-center max-lg:overflow-hidden",
            containerClassName,
          )}
        >
          <div className="relative z-1 mx-auto flex max-w-[1180px] flex-col items-center">
            {announcementText && <HeroTag text={announcementText} />}
            <Heading
              level={"h1"}
              className="mt-7 !text-[32px] capitalize lg:!text-[44px]"
              variant="gradient"
            >
              {title}
            </Heading>
            <p
              className="text-muted-foreground mx-auto mt-3 max-w-[728px] text-balance"
              dangerouslySetInnerHTML={markdownify(description)}
            />
            {!disableSearchBox && (
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
            <div className="mx-auto mt-7 flex max-w-[600px] flex-wrap items-center justify-center gap-2">
              {search_tags?.map((tag: string, i: number) => {
                return (
                  <Button key={i} value={tag} variant="tag" size="tag">
                    {tag}
                  </Button>
                );
              })}
            </div>

            {categoriesTag && <CategoriesTag allCategories={categoriesTag} />}
          </div>
          <HeroBorder />
        </div>

        {/* SVG Blob */}
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-[14%] bg-gradient-to-r from-white/[0.03] to-white/0 to-[87%]" />
          <div className="absolute top-0 right-0 h-full w-[14%] bg-gradient-to-l from-white/[0.03] to-white/0 to-[87%]" />
          <BlurSvg
            className="absolute top-1/2 left-0 aspect-square -translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            cy="120"
            cx="120"
            rx="120"
            ry="120"
            fill={blobColor}
          />
          <BlurSvg
            className="absolute top-1/2 right-0 aspect-square translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            cx="120"
            cy="120"
            rx="120"
            ry="120"
            fill={blobColor}
          />
        </div>
        <PageDots />
        <Separator size="lg" />
      </section>
    </>
  );
}
