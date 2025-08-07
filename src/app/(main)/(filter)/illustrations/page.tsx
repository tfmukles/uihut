"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free & Premium Illustrations - Uihut"}
        description={
          "Explore our extensive library of free and premium illustrations resources."
        }
      />
      <InFinityProductLoader title="Illustrations" category="illustration" />
    </>
  );
}
