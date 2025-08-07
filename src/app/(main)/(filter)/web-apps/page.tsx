"use client";

import SeoMeta from "@/partials/SeoMeta";
import InFinityProductLoader from "../_components/InfinityProductLoader";

export default function FreeAssets() {
  return (
    <>
      <SeoMeta
        title={"Free & Premium Web Apps Kit - Uihut"}
        description={
          "Explore our extensive library of free and premium web apps resources."
        }
      />
      <InFinityProductLoader title="Web App" category={"web-app"} />
    </>
  );
}
