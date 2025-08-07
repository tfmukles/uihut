import AnimatedStarryBg from "@/components/AnimatedStarryBg";
import AnimatedIcon from "@/components/ui/animated-icon";
import { CustomLink } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import { cn } from "@/lib/utils/shadcn";
import Image, { StaticImageData } from "next/image";
import BlurSvg from "./BlurSvg";
import UserRating from "./UserRating";
import YoutubePlayer from "./YoutubePlayer";

type Props = {
  icon: StaticImageData | string;
  title: string;
  description: string;
  image: string;
  link: {
    href?: string;
    label: string;
  };
  videoId: string;
  className?: string;
};

function SecondaryCta({
  icon,
  title,
  image,
  description,
  link: { href = "#", label },
  videoId,
  className,
}: Props) {
  return (
    <section className={cn("relative my-[72px] overflow-hidden", className)}>
      <Separator />
      <div className="container-md relative z-1 grid items-center gap-10 overflow-hidden pb-[72px] pt-[68px] lg:grid-cols-[1fr_minmax(auto,60.87%)] lg:gap-6">
        <div className="max-lg:text-center">
          <AnimatedIcon className="mb-2 lg:mb-4">
            <Image
              src={icon}
              alt="figma"
              width={50}
              height={50}
              quality={100}
            />
          </AnimatedIcon>
          <Heading
            level="h3"
            className="mb-0.5"
            variant="gradient"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className="mb-4 text-text-light lg:mb-[26px] max-md:[&_br]:hidden"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <UserRating
            variant="secondary"
            className="mb-6 text-text-light lg:mb-11"
            rating="4.9/5"
            description="Over 100K+ designers, developers, entrepreneurs, and businesses choose Uihut"
          />

          <CustomLink
            size="xl"
            href={href}
            target={href.startsWith("http") ? "_blank" : "_self"}
          >
            {label}
          </CustomLink>
        </div>
        <div className="relative">
          <Image
            className="mx-auto w-full max-w-[750px] object-cover lg:ml-auto"
            src={image}
            width={750}
            height={425}
            alt={title}
          />

          {videoId && (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="absolute left-1/2 top-1/2 z-1 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[#2B2E41] bg-dark/80 backdrop-blur-[10px] lg:h-[72px] lg:w-[72px]"
                  type="button"
                  aria-label="play video"
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
                <YoutubePlayer title={title} videoId={videoId} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <div className="container absolute left-1/2 top-0 mx-auto h-full -translate-x-1/2 py-4">
        <AnimatedStarryBg className="pointer-events-none absolute z-1 h-full w-full object-cover" />
      </div>
      <Separator />
      <BlurSvg
        className="absolute right-0 top-0 blur-[100px] max-md:w-[150px] md:right-[20%] md:blur-[160px]"
        width={344}
        height={209}
        viewBox="0 0 344 209"
        cx="172"
        cy="37"
        rx={172}
        ry={172}
      >
        <linearGradient
          id="paint0_linear_1_9400"
          x1="393.88"
          y1="357.545"
          x2="-1.27236"
          y2="331.711"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDE67" />
          <stop offset="0.320191" stopColor="#FF808D" />
          <stop offset="1" stopColor="#AC5EFA" />
        </linearGradient>
      </BlurSvg>
      <BlurSvg
        className="absolute bottom-0 left-0 blur-[100px] max-md:w-[150px] md:left-[20%] md:blur-[150px]"
        width="260"
        height="162"
        viewBox="0 0 260 162"
        cx="130"
        cy="180"
        rx="130"
        ry="130"
      >
        <linearGradient
          id="sdflksdkfls"
          x1="393.88"
          y1="357.545"
          x2="-1.27236"
          y2="331.711"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="#AC5EFA" />
        </linearGradient>
      </BlurSvg>
    </section>
  );
}

export default SecondaryCta;
