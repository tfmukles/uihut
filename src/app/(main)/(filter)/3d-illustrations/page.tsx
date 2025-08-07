"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free & Premium 3D Illustrations - Uihut"}
        description="Explore our extensive library of free and premium 3D illustrations resources."
      />
      <InFinityProductLoader
        title="3D Illustrations"
        category="3d-illustration"
      />
    </>
  );
}
