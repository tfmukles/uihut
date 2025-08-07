import * as icons from "@/assets/icons";
import { Separator } from "@/layouts/components/ui/separator";
import FloatingDot from "@/partials/FloatingDot";
import figmaIcon from "@/public/images/svgs/figma.svg";
import { IDesignResource, Resource } from "@/types";
import { CardInfo, CardPrimary, CardSecondary } from "../components/Card";

const DesignResources = ({
  button,
  list,
  title,
  description,
  services,
  resources,
}: IDesignResource & { resources: Resource[] }) => {
  return (
    <section className="relative pb-12 md:py-16 xl:py-[72px] xl:pb-[92px]">
      <div className="bg-background container">
        <div className="grid grid-cols-12 gap-6">
          {/* Design Resources */}
          <div className="col-span-12">
            <CardSecondary>
              <CardInfo
                className="mb-8"
                title={title}
                description={description}
                icon={figmaIcon}
                listItems={list}
                buttonText={button.label}
                buttonLink={button.link}
              />
              <div className="3xl:mt-[7%] mt-[14.1%] border-current text-[#EDECF4]/[6%] max-md:border-t max-md:border-l md:px-2">
                <div className="relative grid sm:grid-cols-2 md:grid-cols-3 [&>div:nth-child(odd)]:sm:max-md:border-l-0">
                  {/* left and right border */}
                  <Separator
                    className="absolute -top-8 right-0 -bottom-8 h-auto max-md:hidden"
                    size="lg"
                    orientation="vertical"
                  />
                  {services.map((item, i) => {
                    // @ts-ignore
                    const Icon = icons[item.icon];
                    return (
                      <div
                        className="relative flex items-center gap-3 border-current p-4 max-md:border-r max-md:border-b max-sm:flex-col max-sm:text-center lg:gap-5 lg:p-6 xl:px-[30px]"
                        key={i}
                      >
                        <FloatingDot
                          position="top-left"
                          className="-top-[1.5px] -left-[1.5px] max-md:hidden"
                        />
                        <div className="bg-gradient-135 text-foreground flex size-14 items-center justify-center rounded-full border border-[#3A3F51] from-[#1A1F34] to-[#0A0E1E]">
                          <Icon className="h-6 w-6 flex-shrink-0" />
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs tracking-[2.2px] uppercase">
                            {item.title}
                          </span>
                          <span className="text-text mt-1 block text-lg font-medium">
                            {item.quantity}
                          </span>
                        </div>
                        <FloatingDot
                          position="top-right"
                          className="-top-[1.5px] -right-[1.5px] max-md:hidden"
                        />
                        <FloatingDot
                          position="bottom-right"
                          className="-right-[1.5px] -bottom-[1.5px] max-md:hidden"
                        />
                      </div>
                    );
                  })}
                  <div className="hidden sm:col-span-2 sm:row-start-2 md:col-span-3 md:block">
                    <div className="relative">
                      <Separator
                        className="absolute top-0 -right-12 -left-12 w-auto"
                        size="lg"
                      />
                    </div>
                    <div className="grid md:grid-cols-3">
                      <div>
                        <Separator
                          className="absolute -top-8 -bottom-8 h-auto"
                          size="lg"
                          orientation="vertical"
                        />
                      </div>
                      <div>
                        <Separator
                          className="absolute -top-8 -bottom-8 h-auto"
                          size="lg"
                          orientation="vertical"
                        />
                      </div>
                      <div>
                        <Separator
                          className="absolute -top-8 -bottom-8 h-auto"
                          size="lg"
                          orientation="vertical"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Top and bottom border */}
                  <Separator
                    className="absolute top-0 -right-12 -left-12 w-auto max-md:hidden"
                    size="lg"
                  />
                  <Separator
                    className="absolute -right-12 bottom-0 -left-12 w-auto max-md:hidden"
                    size="lg"
                  />
                </div>
                <div className="relative grid border-x border-current sm:grid-cols-2 md:grid-cols-3 [&>div:nth-child(odd)]:max-md:border-l-0">
                  <div className="relative">
                    <FloatingDot
                      className="-top-[1.5px] -left-[1.5px] max-md:hidden"
                      position="top-left"
                    />
                  </div>
                  <div className="relative">
                    <FloatingDot
                      className="-top-[1.5px] -left-[1.5px] max-md:hidden"
                      position="top-left"
                    />
                  </div>
                  <div className="relative">
                    <FloatingDot
                      className="-top-[1.5px] -left-[1.5px] max-md:hidden"
                      position="top-left"
                    />
                  </div>
                </div>
              </div>
            </CardSecondary>
          </div>

          {resources.map((resource, i) => {
            // @ts-ignore
            const Icon = icons[resource.blurSvg];
            return (
              <div key={i} className="col-span-12 lg:col-span-6">
                <CardPrimary blurSvg={<Icon />}>
                  <CardInfo
                    title={resource.title}
                    description={resource.description}
                    icon={resource.icon}
                    listItems={[...resource.features]}
                    buttonText={resource.button?.label}
                    buttonLink={resource.button?.link}
                  />
                </CardPrimary>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default DesignResources;
