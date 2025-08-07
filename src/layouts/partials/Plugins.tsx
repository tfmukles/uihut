import ResourceCard from "@/layouts/components/ResourceCard";
import { Separator } from "@/layouts/components/ui/separator";
import { BottomFloatingDots, TopFloatingDots } from "@/partials/FloatingDot";
import { IProductSection } from "@/types";

function Plugins({
  plugins,
}: {
  plugins: (IProductSection & {
    icon: string;
    image: string;
    video_id: string;
  })[];
}) {
  return (
    <section className="bg-gradient-gray relative my-[72px] py-0 lg:mb-[68px] lg:mt-[94px]">
      <Separator className="absolute left-0 top-0 z-10 w-full" />
      <div className="container-md relative !px-0">
        <Separator
          orientation="vertical"
          className="bg-divider-lg absolute -bottom-20 -top-20 left-0 z-10 h-auto"
        />

        <Separator
          orientation="vertical"
          className="bg-divider-lg absolute -bottom-20 -top-20 right-0 z-10 hidden h-auto md:block"
        />

        <Separator
          orientation="vertical"
          className="bg-divider-lg absolute -bottom-20 -top-20 left-1/2 right-0 z-10 h-auto"
        />

        <TopFloatingDots className="max-md:hidden max-xl:[&>*:first-child]:hidden max-xl:[&>*:last-child]:hidden" />

        <div className="row gx-0">
          {plugins.map((plugin, index) => (
            <div className="md:col-6" key={index}>
              <ResourceCard
                key={plugin.title}
                data={{
                  icon: plugin.icon,
                  title: plugin.title,
                  description: plugin.description,
                  videoId: plugin.video_id,
                  link: {
                    label: plugin.button.label,
                    href: plugin.button.link,
                  },
                  src: plugin.image,
                }}
              />
            </div>
          ))}
        </div>

        <BottomFloatingDots className="max-md:hidden max-xl:[&>*:first-child]:hidden max-xl:[&>*:last-child]:hidden" />
      </div>
      <Separator className="absolute bottom-0 left-0 z-10 w-full" />
    </section>
  );
}

export default Plugins;
