"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free & Premium Web Templates Design - Uihut"}
        description={
          "Explore our extensive library of free and premium web templates resources."
        }
      />
      <InFinityProductLoader title="Web Templates" category="web-template" />
    </>
  );
}
