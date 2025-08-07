import AnimatedIcon from "@/components/ui/animated-icon";
import Heading from "@/components/ui/title";
import { cn } from "@/lib/utils/shadcn";
import YoutubePlayer from "@/partials/YoutubePlayer";
import CardStarryBg from "@/public/images/backgrounds/resource-card-starry.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Button, CustomLink } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

type Props = {
  data: {
    icon: string | StaticImport;
    title: string;
    description: string;
    link: {
      label: string;
      href?: string;
    };
    videoId: string;
    src: string | StaticImport;
  };
  type?: "video" | "image";
};

function ResourceCard(props: Props) {
  const { data, type = "video" } = props;

  const {
    icon,
    title,
    description,
    src,
    link: { label, href = "#" },
    videoId,
  } = data;

  return (
    <div className="relative bg-background py-[72px] text-center">
      <Image
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        src={CardStarryBg}
        alt="bg-stars"
      />
      <AnimatedIcon className="mb-4">
        <Image src={icon} width={50} height={50} quality={100} alt="icon" />
      </AnimatedIcon>
      <div className={cn(type === "image" && "mx-auto md:max-w-[472px]")}>
        <Heading className="mb-0.5" level="h3" variant="gradient">
          {title}
        </Heading>
        <p className="mb-5 leading-[1.72] lg:mb-8">{description}</p>
        {href ? (
          <CustomLink
            target="_blank"
            className="mb-8"
            size="xl"
            href={href}
            glow
          >
            {label}
          </CustomLink>
        ) : (
          <Button disabled className="mb-8" size="xl">
            {label}
          </Button>
        )}
      </div>

      {type === "video" && (
        <div className="relative">
          <Image
            className="mx-auto w-full max-w-[530px] object-cover"
            src={src}
            width={530}
            height={300}
            alt={title}
          />
          {videoId && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="absolute left-1/2 top-1/2 z-1 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[#2B2E41] bg-dark/80 backdrop-blur-[10px] lg:h-[72px] lg:w-[72px]"
                  type="button"
                  aria-label="Play video"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 6.66333C5 5.081 6.75049 4.12532 8.08152 4.98097L16.383 10.3176C17.6076 11.1049 17.6076 12.8951 16.383 13.6824L8.08152 19.019C6.75049 19.8747 5 18.919 5 17.3367V6.66333Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl rounded-none bg-transparent bg-none p-0 shadow-none">
                <div className="px-4">
                  <YoutubePlayer title={title} videoId={videoId} />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}

      {type === "image" && (
        <div className="relative">
          <Image
            className="mx-auto w-full max-w-[566px] object-cover"
            src={src}
            width={566}
            height={219}
            alt={title}
          />
        </div>
      )}
    </div>
  );
}

export default ResourceCard;
