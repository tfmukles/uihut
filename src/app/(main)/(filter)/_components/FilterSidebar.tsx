"use client";
import { getWebFlowThemeBySlug } from "@/actions/webflow";
import { TWebflowTheme } from "@/actions/webflow/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFilter } from "@/hooks/useFilter";
import { groupByTheme } from "@/lib/groupByTheme";
import { cn } from "@/lib/utils/shadcn";
import { humanize } from "@/lib/utils/textConverter";
import { Loader2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  FilterParam,
  INITIAL_FILTER,
  LICENSE_OPTIONS,
  TYPE_OPTIONS,
} from "./data";

export default function FilterSidebar({
  categories,
  themes,
}: {
  categories?: any[];
  themes?: TWebflowTheme[];
}) {
  const pathname = usePathname();
  const { filter, setFilter, height, groupByData, setGroupByData } =
    useFilter();
  const isWebTemplatePage = pathname.includes("web-templates");

  const isCategoryPage = useMemo(() => {
    return [
      ...(categories ?? []),
      {
        type: "category",
        value: "icon-packs",
        label: "Icon Packs",
      },
      {
        type: "category",
        value: "ui-kits",
        label: "Ui Kits",
      },
    ].some(
      (category) =>
        category.type === "category" && pathname.includes(`/${category.value}`),
    );
  }, [pathname]);

  const isWebTemplateSelector = filter.params.some((v) =>
    v.value.includes("web-template"),
  );

  const keys = isCategoryPage
    ? isWebTemplatePage
      ? ["web-template"]
      : ["other"]
    : ["web-template", "other"];

  const options = keys.reduce<FilterParam[]>((acc, curr) => {
    return [...acc, ...TYPE_OPTIONS[curr as keyof typeof TYPE_OPTIONS]];
  }, []);

  const isFreeAssetsPage = pathname === "/free-assets";
  const isExistFilter = (option: FilterParam): FilterParam | undefined => {
    return filter.params.find(
      (param: FilterParam) =>
        param.type === option.type && param.value === option.value,
    );
  };

  const isChecked = (option: FilterParam): boolean => {
    const isExist = isExistFilter(option);
    return isExist ? true : false;
  };

  const applyArrayFilter = (option: FilterParam) => {
    const isExist = isExistFilter(option);
    let filterValue = filter;

    if (option.type === "category") {
      filterValue = {
        ...filter,
        params: filter.params.filter(
          (param: FilterParam) => param.type !== "type",
        ),
      };
    }

    if (isExist) {
      setFilter({
        ...filter,
        params: filterValue.params.filter(
          (param: FilterParam) =>
            !(param.type === option.type && param.value === option.value),
        ),
      });
    } else {
      setFilter({ ...filterValue, params: [...filterValue.params, option] });
    }
  };

  const activeFilters = (
    <ul className="mt-6 flex flex-wrap items-center gap-2">
      {filter?.params?.map((option: FilterParam) => {
        if (option.type === "page" || option.type === "section") {
          return null;
        }
        return (
          <li key={option.value} className="flex items-center">
            <Checkbox
              id={`category-${option.value}`}
              onCheckedChange={() => {
                applyArrayFilter(option);
              }}
              className="hidden"
              checked={isChecked(option) ? true : false}
            />

            <label
              htmlFor={`category-${option.value}`}
              className="group cursor-pointer text-sm text-muted-foreground"
            >
              <Button
                className={cn(
                  "pointer-events-none text-text-dark before:opacity-100 group-hover:before:opacity-100",
                )}
                variant="tag"
              >
                {option.label}
              </Button>
            </label>
          </li>
        );
      })}

      {filter?.search?.split("|").map(
        (search: string) =>
          search && (
            <li key={search} className="flex items-center">
              <label
                htmlFor={`search-${search}`}
                className="group cursor-pointer text-sm text-muted-foreground"
              >
                <Button
                  onClick={() => {
                    const searches = filter.search.split("|");
                    const filterSearch = searches.filter(
                      (item) => item !== search,
                    );

                    setFilter({ ...filter, search: filterSearch.join("|") });
                  }}
                  className={cn(
                    "text-text-dark before:opacity-100 group-hover:before:opacity-100",
                  )}
                  variant="tag"
                >
                  {search}
                </Button>
              </label>
            </li>
          ),
      )}
    </ul>
  );

  const isWebFlowPage = pathname === "/webflow-templates";

  const params = filter.params.find((param) =>
    ["page", "section", "themes"].includes(param.type),
  );

  const handleScroll = function () {
    const element = document.querySelector("#products");
    if (element) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const isWebflowThemeLoading = groupByData?.status === "loading";

  return (
    <div
      className="h-full overflow-auto"
      style={{ maxHeight: `calc(100vh - ${height + 96}px)` }}
    >
      {/* Active Filters */}
      {(filter.params.filter(
        (param) => !["page", "section"].includes(param.type),
      ).length > 0 ||
        filter.search?.length > 0) && (
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm lg:text-base">Applied filters</span>
            <button
              onClick={() => setFilter(INITIAL_FILTER)}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-text lg:text-sm"
            >
              Clear All <X className="size-4" />
            </button>
          </div>
          {/* active filters */}
          {activeFilters}
        </div>
      )}

      {/* Active Filters End */}
      <Accordion
        defaultValue={["categories", "license", "type"]}
        type="multiple"
        className="flex flex-col"
      >
        {/* Categories filter */}
        {!isCategoryPage && !isWebFlowPage && (
          <AccordionItem
            value="categories"
            className={cn(
              "border-border",
              isWebFlowPage && "order-2 border-b-0",
            )}
          >
            <AccordionTrigger className="p-6 text-sm font-normal no-underline hover:no-underline md:text-base">
              Categories
            </AccordionTrigger>
            <AccordionContent className="animate-none px-6 pb-8 pt-1">
              <ul className="flex flex-wrap items-center gap-2">
                {categories?.map((option: FilterParam) => {
                  return (
                    <li key={option.value} className="flex items-center">
                      <Checkbox
                        id={`category-${option.value}`}
                        onCheckedChange={() => {
                          applyArrayFilter(option);
                        }}
                        className="hidden"
                        checked={isChecked(option)}
                      />

                      <label
                        htmlFor={`category-${option.value}`}
                        className="group cursor-pointer text-sm"
                      >
                        <Button
                          className={cn(
                            "pointer-events-none group-hover:before:opacity-100",
                            isChecked(option) &&
                              "text-text-dark before:opacity-100",
                          )}
                          variant="tag"
                        >
                          {option.label}
                        </Button>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Design Type filter */}
        {!isWebFlowPage && (
          <AccordionItem value="type" className="border-border">
            <AccordionTrigger className="p-6 text-sm no-underline hover:no-underline md:text-base">
              Type
            </AccordionTrigger>

            <AccordionContent className="animate-none px-6 pb-8 pt-1">
              <ul className="flex flex-wrap items-center gap-2">
                {options.map((option) => {
                  let disabled = false;
                  if (
                    filter.params.length &&
                    filter.params.filter((param) => param.type === "category")
                      .length == 0
                  ) {
                    disabled = false;
                    //   const selectedTypes = filter.params.filter(
                    //     (param) => param.type === "type",
                    //   );

                    //   const options = TYPE_OPTIONS["other"];
                    //   const isOtherGroup = options.some((item) =>
                    //     selectedTypes.some(
                    //       (selectedType) => selectedType.value === item.value,
                    //     ),
                    //   );
                    //   disabled = !(isOtherGroup
                    //     ? TYPE_OPTIONS.other.some(
                    //         (item) => item.value === option.value,
                    //       )
                    //     : TYPE_OPTIONS["web-template"].some(
                    //         (item) => item.value === option.value,
                    //       ));
                  } else if (
                    isWebTemplateSelector &&
                    filter.params.length === 1
                  ) {
                    disabled = !TYPE_OPTIONS["web-template"].some(
                      (item) => item.value === option.value,
                    );
                  } else if (!isWebTemplateSelector && filter.params.length) {
                    disabled = !TYPE_OPTIONS["other"].some(
                      (item) => item.value === option.value,
                    );
                  } else {
                    disabled = false;
                  }

                  return (
                    <li key={option.value} className="flex items-center">
                      <Checkbox
                        disabled={disabled}
                        id={`type-${option.value}`}
                        onCheckedChange={() => {
                          applyArrayFilter(option);
                        }}
                        className="hidden disabled:cursor-not-allowed"
                        checked={isChecked(option)}
                      />

                      <label
                        htmlFor={`type-${option.value}`}
                        className={cn(
                          "group cursor-pointer text-sm",
                          disabled && "cursor-default",
                        )}
                      >
                        <Button
                          disabled={disabled}
                          className={cn(
                            "pointer-events-none disabled:pointer-events-none disabled:cursor-none disabled:opacity-50 group-hover:before:opacity-100 group-hover:disabled:before:opacity-0",
                            isChecked(option) &&
                              "text-text-dark before:opacity-100",
                          )}
                          variant="tag"
                        >
                          {option.label}
                        </Button>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* License filter */}
        {!isFreeAssetsPage && (
          <AccordionItem value="license" className="border-border">
            <AccordionTrigger className="p-6 text-sm no-underline hover:no-underline md:text-base">
              License
            </AccordionTrigger>

            <AccordionContent className="animate-none px-6 pb-8 pt-1">
              <ul className="flex flex-wrap items-center gap-2">
                {LICENSE_OPTIONS.map((option) => (
                  <li key={option.value} className="flex items-center">
                    <Checkbox
                      id={`license-${option.value}`}
                      onCheckedChange={() => {
                        applyArrayFilter(option);
                      }}
                      className="hidden"
                      checked={isChecked(option)}
                    />

                    <label
                      htmlFor={`license-${option.value}`}
                      className="group cursor-pointer text-sm"
                    >
                      <Button
                        className={cn(
                          "pointer-events-none group-hover:before:opacity-100",
                          isChecked(option) &&
                            "text-text-dark before:opacity-100",
                        )}
                        variant="tag"
                      >
                        {option.label}
                      </Button>
                    </label>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* WF Theme filter */}
        {isWebFlowPage && themes && themes?.length > 0 && (
          <Accordion
            key={params?.label}
            defaultValue={params?.label}
            {...(params?.label && { value: params.label })}
            onValueChange={async (value) => {
              if (value) {
                try {
                  setGroupByData((prev) => ({
                    ...prev!,
                    selectedWebflowTheme: value,
                    status: "loading",
                  }));

                  const { data } = await getWebFlowThemeBySlug(value);
                  const groups = groupByTheme({
                    selectedWebflowTheme: data!,
                  });

                  setGroupByData({
                    ...groups,
                    selectedWebflowTheme: value,
                    status: "success",
                  });

                  setFilter({
                    ...filter,
                    params: [
                      ...filter.params.filter(
                        (param) => param.type === "license",
                      ),
                      {
                        label: value,
                        type: "page",
                        value: groups.pages[0].page,
                      },
                    ],
                  });
                } catch (error) {
                  setGroupByData((prev) => ({
                    ...prev!,
                    status: "error",
                  }));
                }
                handleScroll();
              } else {
                setFilter({
                  ...filter,
                  params: filter.params.filter(
                    (param) => param.type !== "page",
                  ),
                });
              }
            }}
            collapsible
            type="single"
          >
            {themes.map((theme, index) => {
              return (
                <AccordionItem
                  key={index}
                  value={theme.slug}
                  className="border-none px-4 data-[state=open]:bg-[#191C2CB0]"
                >
                  <AccordionTrigger className="px-2.5 pb-2.5 pt-5 text-sm text-text-light no-underline hover:no-underline data-[state=open]:text-foreground md:text-base">
                    {theme.title}
                  </AccordionTrigger>
                  <AccordionContent className="animate-none px-2 pt-1">
                    {isWebflowThemeLoading ? (
                      <div className="flex items-center justify-center py-5">
                        <Loader2 className="size-6 animate-spin" />
                      </div>
                    ) : (
                      <Tabs defaultValue="home">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger className="h-[30px] py-0" value="home">
                            Home
                          </TabsTrigger>
                          <TabsTrigger className="h-[30px]" value="section">
                            Section
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="home">
                          <ul className="space-y-4 px-2.5 pt-2">
                            {groupByData?.pages.length === 0 ? (
                              <p className="text-center">
                                No Home page available.
                              </p>
                            ) : (
                              groupByData?.pages.map((page, index) => {
                                return (
                                  <li key={index}>
                                    <Button
                                      type="button"
                                      className={cn(
                                        "h-auto w-full justify-between p-0 font-normal capitalize text-text-light hover:text-foreground hover:no-underline [&>*]:flex [&>*]:w-full [&>*]:justify-between",
                                        filter.params.find(
                                          (param) => param.value === page.page,
                                        ) && "text-foreground",
                                      )}
                                      variant={"link"}
                                      onClick={() => {
                                        setFilter({
                                          ...filter,
                                          params: [
                                            ...filter.params.filter(
                                              (param) =>
                                                param.type === "license",
                                            ),
                                            {
                                              label:
                                                groupByData.selectedWebflowTheme,
                                              type: "page",
                                              value: page.page,
                                            },
                                          ],
                                        });
                                        handleScroll();
                                      }}
                                    >
                                      <span className="text-inherit">
                                        {humanize(page.page)}
                                      </span>
                                      <span className="text-inherit">
                                        ({page.variant})
                                      </span>
                                    </Button>
                                  </li>
                                );
                              })
                            )}
                          </ul>
                        </TabsContent>
                        <TabsContent value="section">
                          <ul className="space-y-4 px-2.5 pt-2">
                            {groupByData?.sections.length === 0 ? (
                              <p className="text-center">
                                No section available.
                              </p>
                            ) : (
                              groupByData?.sections.map((section, index) => {
                                return (
                                  <li key={index}>
                                    <Button
                                      className={cn(
                                        "h-auto w-full justify-between p-0 font-normal capitalize text-text-light hover:text-foreground hover:no-underline [&>*]:flex [&>*]:w-full [&>*]:justify-between",
                                        filter.params.find(
                                          (param) =>
                                            param.value === section.section,
                                        ) && "text-foreground",
                                      )}
                                      variant={"link"}
                                      type="button"
                                      onClick={() => {
                                        setFilter({
                                          ...filter,
                                          params: [
                                            ...filter.params.filter(
                                              (param) =>
                                                param.type === "license",
                                            ),
                                            {
                                              type: "section",
                                              label:
                                                groupByData.selectedWebflowTheme,
                                              value: section.section,
                                            },
                                          ],
                                        });
                                        handleScroll();
                                      }}
                                    >
                                      <span>{humanize(section.section)}</span>
                                      <span>({section.variant})</span>
                                    </Button>
                                  </li>
                                );
                              })
                            )}
                          </ul>
                        </TabsContent>
                      </Tabs>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </Accordion>
    </div>
  );
}
