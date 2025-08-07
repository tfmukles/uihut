"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free Assets"}
        meta_title={"Free UI Assets - UIHut"}
        description={
          "Free UI assets for all your UI design needs. Download thousands of Web UI, App UI, UI Kits, 3D Assets, illustrations, and icons for your next project."
        }
      />
      <InFinityProductLoader license="free" title="Free Assets" />
    </>
  );
}
