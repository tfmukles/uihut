import { WebflowThemeCollection } from "@/actions/webflow/types";

interface ChildVariant {
  id: string;
  page: string;
  variant: number;
}

export function groupByTheme({
  selectedWebflowTheme,
}: {
  selectedWebflowTheme: WebflowThemeCollection;
}) {
  // Helper function to update a group map and return the updated count
  const updateGroup = (
    groupMap: Map<string, { count: number; id: string }>,
    key: string,
    id: string,
  ) => {
    const current = groupMap.get(key);
    const count = (current?.count || 0) + 1;
    groupMap.set(key, { count, id });
    return count;
  };

  // Initialize maps for pages and sections
  const pageGroups = new Map<string, { count: number; id: string }>();
  const sectionGroups = new Map<string, { count: number; id: string }>();

  let homePage: ChildVariant | null = null;

  // Process pages using for-of loop
  for (const page of selectedWebflowTheme?.pages || []) {
    const count = updateGroup(pageGroups, page.page, page.product_id);
    // Check if this is the "home" page
    if (page.page.toLowerCase() === "home") {
      homePage = {
        id: page.product_id,
        page: page.page,
        variant: count,
      };
    }
  }

  // Process sections using for-of loop
  for (const section of selectedWebflowTheme?.sections || []) {
    if (!section.category) continue; // Only count sections with categories
    updateGroup(sectionGroups, section.category, section.product_id);
  }

  // Convert to final format
  const pageVariants = Array.from(pageGroups).map(([page, data]) => ({
    id: data.id,
    page,
    variant: data.count,
  }));
  const sectionVariants = Array.from(sectionGroups).map(([section, data]) => ({
    id: data.id,
    section,
    variant: data.count,
  }));

  // Ensure "home" page is first
  if (homePage) {
    const index = pageVariants.findIndex(
      (p) => p.page.toLowerCase() === "home",
    );
    if (index > -1) {
      pageVariants.unshift(...pageVariants.splice(index, 1));
    }
  }

  return { pages: pageVariants, sections: sectionVariants };
}
