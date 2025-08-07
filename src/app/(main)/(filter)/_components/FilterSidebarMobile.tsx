import { TWebflowTheme } from "@/actions/webflow/types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/layouts/components/ui/sheet";
import { Filter } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

const FilterSidebarMobile = ({
  categories,
  themes,
}: {
  categories?: any[];
  themes?: TWebflowTheme[];
}) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger id="filter-button" title="filter-button">
          <Filter className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="overflow-auto p-0 py-6" side="left">
          <SheetHeader>
            <SheetTitle className="pl-4 text-left">Filter Resources</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterSidebar themes={themes} categories={categories} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default FilterSidebarMobile;
