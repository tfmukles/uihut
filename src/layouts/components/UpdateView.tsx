import { updateDesignViews } from "@/actions/designs";

export default async function UpdateView({ productId }: { productId: string }) {
  await updateDesignViews(productId);
  return null;
}
