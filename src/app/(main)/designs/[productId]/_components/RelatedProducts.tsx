import { getDesignsByCategory } from "@/actions/designs";
import ProductRow from "@/partials/ProductRow";

export default async function RelatedProducts({
  category,
}: {
  category: string;
}) {
  const allSimilarProducts = await getDesignsByCategory(category!);
  const similarProducts = allSimilarProducts.data?.slice(0, 4) || [];
  return (
    <ProductRow
      // @ts-ignore
      data={similarProducts}
      title="Related Design"
      description="See more related resources"
      button={{
        enable: true,
        label: "Browse All",
        link: "/designs",
      }}
    />
  );
}
