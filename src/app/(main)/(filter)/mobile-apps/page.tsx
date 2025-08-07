"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free & Premium Mobile Apps Kit - Uihut"}
        description={
          "Explore our extensive library of free and premium mobile apps resources."
        }
      />
      <InFinityProductLoader title="Mobile App" category="mobile-app" />
    </>
  );
}
