import { BASE_URL } from "@/lib/constant";
import { getSinglePage } from "@/lib/contentParser";
import { RegularPage } from "@/types";
import { MetadataRoute } from "next";

const regularPage = (): MetadataRoute.Sitemap => {
  const getRegularPages = getSinglePage("pages");
  const regularPages = getRegularPages.map(
    (page: RegularPage) =>
      ({
        url: BASE_URL + "/" + page.slug,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      }) as MetadataRoute.Sitemap[0],
  );

  return regularPages;
};

const blogs = (): MetadataRoute.Sitemap => {
  const blogPosts = getSinglePage("blog");

  const blogs = blogPosts.map(
    (page: RegularPage) =>
      ({
        url: BASE_URL + "/blog/" + page.slug,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      }) as MetadataRoute.Sitemap[0],
  );

  return [
    {
      url: BASE_URL + "/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...blogs,
  ];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const regularPages = regularPage();
  const blogPages = blogs();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: BASE_URL + "/icons",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/webflow-resources",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/pricing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/designs",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/free-assets",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/3d-illustrations",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/illustrations",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/web-apps",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/mobile-apps",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/web-templates",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/ui-kits",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: BASE_URL + "/icon-packs",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...blogPages,
    ...regularPages,
  ];
}
