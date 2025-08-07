import { CheckCircle } from "@/assets/icons";
import AnimatedIcon from "@/components/ui/animated-icon";
import { CustomLink } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/title";
import { cn } from "@/lib/utils/shadcn";
import IconStarryBg from "@/public/images/backgrounds/animated-icon-bg.svg";
import UserIcon from "@/public/images/svgs/user.svg";
import { IPlanFeature } from "@/types";
import Image from "next/image";

function Plans({ features }: { features: IPlanFeature }) {
  const { title, description, plans } = features;
  return (
    <section className="my-[72px] pt-16">
      <div className="container-md">
        <div className="relative mb-11 text-center">
          <Image
            className="pointer-events-none absolute -top-[20%] left-1/2 -translate-x-1/2"
            src={IconStarryBg}
            alt="bg-stars"
          />
          <AnimatedIcon className="mb-4">
            <Image
              src={UserIcon}
              width={50}
              height={50}
              quality={100}
              alt="icon"
            />
          </AnimatedIcon>
          <Heading variant="gradient" className="mb-0.5" level="h2">
            {title}
          </Heading>
          <p className="text-text-light">{description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((item, i) => (
            <div
              key={i}
              className="border-border via-background from-dark to-background top-[100%] overflow-hidden rounded-2xl border bg-gradient-to-b from-[0%] via-[63%]"
            >
              <Image
                src={item.image}
                width={640}
                height={335}
                alt="plan image"
                className="w-full"
              />
              <Separator />
              <div className="px-6 pt-6 pb-8 lg:px-10 lg:pt-5 lg:pb-10">
                <Heading className="mb-1" level="h3" variant="gradient">
                  {item.title}
                </Heading>
                <p className="text-text-light mb-4 md:mb-8">
                  {item.description}
                </p>
                <ul className="mb-6 space-y-2.5 pl-1 md:space-y-4">
                  {item.features.map((listItem, i) => (
                    <li
                      className={cn(
                        "relative pl-7 text-sm",
                        !listItem.has_feature && "text-muted-foreground",
                      )}
                      key={i}
                    >
                      <CheckCircle
                        className={cn(
                          "absolute top-0 left-0",
                          !listItem.has_feature && "text-muted-foreground/50",
                        )}
                      />
                      {listItem.label}
                    </li>
                  ))}
                </ul>
                <CustomLink size="xl" href={item.button.link || "#"} glow>
                  {item.button.label}
                </CustomLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Plans;
