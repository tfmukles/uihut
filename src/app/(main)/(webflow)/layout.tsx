import { getWebFlowThemes } from "@/actions/webflow";
import React, { use } from "react";
import FilterLarge from "../(filter)/_components/FilterLarge";
import FilterSidebar from "../(filter)/_components/FilterSidebar";
import FilterTop from "../(filter)/_components/FilterTop";

export default function WebFlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: themes } = use(getWebFlowThemes());

  return (
    <div>
      <FilterTop categories={themes!} title={"Filters"} isFiltered />
      <div className="sticky left-0 top-0 flex items-start gap-y-10">
        <FilterLarge>
          <FilterSidebar themes={themes!} />
        </FilterLarge>
        {children}
      </div>
    </div>
  );
}
