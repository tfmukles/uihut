import { getSingleDesign } from "@/actions/designs";
import Assistant from "@/components/Assistant";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import ProductDetails from "@/components/ProductDetails";
import UpdateView from "@/components/UpdateView";
import { BUCKET_URL } from "@/lib/constant";
import { getListPage } from "@/lib/contentParser";
import CallToAction from "@/partials/CallToAction";
import Ratings from "@/partials/Ratings";
import Reviews from "@/partials/Reviews";
import SeoMeta from "@/partials/SeoMeta";
import { ICallToAction } from "@/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RelatedProducts from "./_components/RelatedProducts";

export default async function ProductSingle(props: {
  params: Promise<{ productId: string }>;
}) {
  const params = await props.params;

  const { frontmatter: CallToActionData2 } = getListPage<ICallToAction>(
    "sections/call-to-action-2.md",
  );

  const { data: product } = await getSingleDesign(params.productId);
  const {
    title,
    category,
    previews,
    thumbnail,
    description,
    product_id,
    active,
  } = product || {};

  if (!product_id || !active || !previews?.length) {
    notFound();
  }

  return (
    <>
      <SeoMeta
        title={title}
        image={BUCKET_URL + "/" + thumbnail}
        description={description?.slice(0, 150)}
      />

      <Assistant enable />

      <ProductDetails productId={params.productId} tag="section">
        <Suspense
          fallback={
            <div className="container-md relative">
              <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {[1, 2, 3, 4].map((index) => (
                  <ProductCardSkeleton
                    key={index}
                    cardSize="default"
                    type="Design"
                  />
                ))}
              </div>
            </div>
          }
        >
          <RelatedProducts category={category!} />
        </Suspense>
      </ProductDetails>

      <CallToAction
        title={CallToActionData2.title}
        description={CallToActionData2.description}
        link={{
          href: CallToActionData2.button.link,
          label: CallToActionData2.button.label,
        }}
      />

      {/* Reviews */}
      <Reviews />
      <Suspense fallback={null}>
        <UpdateView productId={params.productId} />
      </Suspense>
      <Ratings className="mb-[72px]" />
    </>
  );
}
