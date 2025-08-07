import { getSingleDesign } from "@/actions/designs";
import ProductSidebar from "@/app/(main)/designs/_components/ProductSidebar";
import { Download, View } from "@/assets/icons";
import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/title";
import { BUCKET_URL } from "@/lib/constant";
import { titleify } from "@/lib/utils/textConverter";
import { numberUnit } from "@/lib/utils/unitConverter";
import Image from "next/image";
import { JSX } from "react";
import ProductImageSlider from "./ProductImageSlider";

export default async function ProductDetails({
  productId,
  className = "relative mb-[72px] mt-[46px]",
  tag = "div",
  children,
  ...props
}: {
  productId: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}) {
  const { data: product } = await getSingleDesign(productId);
  const { title, category, premium, previews, downloads, views } =
    product || {};
  let Tag = tag ? tag : "div";

  return (
    <Tag className={className} {...props}>
      <div className="container-md relative mb-24">
        <div className="grid gap-6 min-[820px]:grid-cols-[1fr_minmax(280px,26.95%)]">
          <div className="mb-6 flex items-end justify-between gap-3 md:gap-6">
            <div>
              <Heading className="mb-2 !text-h3" level="h1" variant="gradient">
                {title}
              </Heading>
              <div className="text-sm tracking-normal">
                {titleify(category!)}
                {premium ? (
                  <Badge className="ml-1.5" variant="accent-outline" size="sm">
                    Pro
                  </Badge>
                ) : (
                  <Badge className="ml-1.5" variant="success-outline" size="sm">
                    Free
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="inline-flex items-center gap-0.5">
                <Download className="size-4" />
                <span>{numberUnit(downloads!)}</span>
              </div>
              <div className="inline-flex items-center gap-0.5">
                <View className="size-4" />
                <span>{numberUnit(views!)}</span>
              </div>
            </div>
          </div>

          {/* this div is for maintaining grid */}
          <div />

          <div className="space-y-3">
            {previews?.length! > 1 ? (
              <ProductImageSlider images={previews!} title={title!} />
            ) : (
              <div className="card-bg rounded-2xl border border-border p-3">
                <Image
                  priority
                  className="w-full overflow-hidden rounded-xl"
                  src={`${BUCKET_URL}/${previews?.[0] || ""}`}
                  width={852}
                  height={670}
                  alt={title!}
                  quality={80}
                />
              </div>
            )}
          </div>
          <ProductSidebar {...product!} />
        </div>
      </div>
      {children}
    </Tag>
  );
}
