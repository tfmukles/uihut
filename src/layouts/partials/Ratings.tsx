import { Leaf, ProductHunt, Star } from "@/assets/icons";
import { Separator } from "@/components/ui/separator";

function Ratings({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Separator />
      <div className="container">
        <div className="relative flex flex-wrap gap-y-6 py-[18px]">
          <Separator
            orientation="vertical"
            className="absolute -top-8 -bottom-8 left-0 hidden h-auto 2xl:block"
          />
          <Separator
            orientation="vertical"
            className="absolute -top-8 right-0 -bottom-8 hidden h-auto 2xl:block"
          />
          <div className="flex-1 px-3 text-center">
            <div className="relative inline-flex flex-col items-center justify-center px-10 text-center sm:h-[76px] sm:py-3">
              <Leaf className="text-foreground absolute top-0 left-0 h-full" />
              <Leaf
                className="text-foreground absolute top-0 right-0 h-full"
                flip
              />
              <p className="text-text-light text-sm">Product of the week</p>
              <p className="font-medium tracking-normal text-white/60 lg:text-lg">
                1st
              </p>
            </div>
          </div>
          <div className="relative flex-1 px-3">
            <Separator
              orientation="vertical"
              size="lg"
              className="absolute -top-8 -bottom-8 left-0 z-1 h-auto max-md:hidden"
            />
            <div className="flex h-full items-center justify-center gap-3">
              <ProductHunt size={40} className="text-foreground" />
              <div>
                <span className="text-[10px]">Featured On</span>
                <p className="text-sm font-medium tracking-normal text-white/60 lg:text-lg">
                  Product Hunt
                </p>
              </div>
              <div className="text-center">
                <span className="border-foreground inline-block h-[18px] w-[18px] border-[9px] border-t-transparent border-r-transparent border-l-transparent" />
                <span className="block text-white/60">2549</span>
              </div>
            </div>
            <Separator
              orientation="vertical"
              size="lg"
              className="absolute -top-8 right-0 -bottom-8 z-1 h-auto max-md:hidden"
            />
          </div>
          <div className="flex-1 px-3">
            <div className="flex h-full items-center justify-center gap-3">
              <ProductHunt size={40} className="text-foreground" />
              <div>
                <div className="flex items-center gap-2">
                  <ul className="flex space-x-1">
                    <li>
                      <Star className="!text-text-light" />
                    </li>
                    <li>
                      <Star className="!text-text-light" />
                    </li>
                    <li>
                      <Star className="!text-text-light" />
                    </li>
                    <li>
                      <Star className="!text-text-light" />
                    </li>
                    <li>
                      <Star className="!text-text-light" />
                    </li>
                  </ul>
                  <span>4.9/5</span>
                </div>

                <p className="text-sm font-medium tracking-normal text-white/60 lg:text-lg">
                  Rating on Product Hunt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </section>
  );
}

export default Ratings;
