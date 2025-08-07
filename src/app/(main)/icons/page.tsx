import { BorderLeft, BorderRight } from "@/components/ui/borders";
import BlurSvg from "@/partials/BlurSvg";
import SeoMeta from "@/partials/SeoMeta";
import FilterTop from "../(filter)/_components/FilterTop";
import InFinityProductLoader from "../(filter)/_components/InfinityProductLoader";

export default function ({}) {
  return (
    <>
      <SeoMeta
        title="8940+ Free SVG Icons (Copy & Paste Ready) | UIHut"
        description="Discover over 8940 free SVG icons for your projects. Instantly copy and paste high-quality, scalable vector graphics with no attribution required."
      />
      {/* <PageDots hideOnScroll /> */}
      <section className="bg-gradient-gray">
        <div className="relative overflow-hidden">
          <div className="container-md relative lg:!px-0">
            <div className="relative bg-muted px-0 pb-6">
              <div className="relative z-1 mx-auto text-center">
                <FilterTop title="" isFiltered={false} categories={[]} />
                <InFinityProductLoader title="Icons" type="Icon" />
              </div>
              <BorderLeft />
              <BorderRight />
            </div>
          </div>
          <div className="absolute left-0 top-0 h-full w-[14%] bg-gradient-to-r from-white/[0.03] to-white/0 to-[87%]" />
          <div className="absolute right-0 top-0 h-full w-[14%] bg-gradient-to-l from-white/[0.03] to-white/0 to-[87%]" />
          <BlurSvg
            className="absolute left-0 top-96 aspect-square -translate-x-1/2 -translate-y-1/2 blur-[120px] max-lg:w-[120px]"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            cy="120"
            cx="120"
            rx="120"
            ry="120"
            fill={"#70CF96"}
          />
          <BlurSvg
            className="absolute right-0 top-96 aspect-square -translate-y-1/2 translate-x-1/2 blur-[120px] max-lg:w-[120px]"
            width={240}
            height={240}
            viewBox="0 0 240 240"
            cx="120"
            cy="120"
            rx="120"
            ry="120"
            fill={"#70CF96"}
          />
        </div>
      </section>
    </>
  );
}
