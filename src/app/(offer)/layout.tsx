import BaseLayout from "@/layouts/BaseLayout";
import SeoMeta from "@/partials/SeoMeta";
import React from "react";

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SeoMeta
        title={"New Year Deals - UIHut"}
        description={"Celebrate the New Year with Flat 60% Off!"}
        image={"/images/deals/new-year-25.png"}
      />
      <BaseLayout>{children}</BaseLayout>
    </>
  );
}
