"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free & Premium Icon Packs - UIHut"}
        description="Explore our extensive library of free and premium icon packs."
      />
      <InFinityProductLoader title="Icon Packs" category="icon" />
    </>
  );
}
