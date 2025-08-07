"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title="Free & Premium UI Kits - Uihut"
        description="Discover our comprehensive collection of free and premium UI kits, offering a wide range of design resources to elevate your projects."
      />
      <InFinityProductLoader title="UI Kits" search="ui kit" />
    </>
  );
}
