import { getDesignCategories } from "@/actions/designs";
import { titleify } from "@/lib/utils/textConverter";
import FilterLarge from "./_components/FilterLarge";
import FilterSidebar from "./_components/FilterSidebar";
import FilterTop from "./_components/FilterTop";

export default async function FilterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await getDesignCategories();
  const categories = data?.map((item) => ({
    label: titleify(item._id),
    value: item._id,
    type: "category",
  }));

  return (
    <div>
      <FilterTop categories={categories || []} title="Filters" />
      <div className="sticky left-0 top-0 flex items-start gap-y-10">
        <FilterLarge>
          <FilterSidebar categories={categories || []} />
        </FilterLarge>
        {children}
      </div>
    </div>
  );
}
