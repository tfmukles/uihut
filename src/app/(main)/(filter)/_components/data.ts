export type FilterParam = {
  label: string;
  value: string;
  type: string;
};

export type TFilter = {
  params: Array<FilterParam>;
  sort: string | undefined;
  search: string;
};

export const INITIAL_FILTER: TFilter = {
  params: [],
  sort: "views-desc",
  search: "",
};

export const LICENSE_OPTIONS = [
  { label: "Pro", value: "premium", type: "license" },
  { label: "Free", value: "free", type: "license" },
];

export const TYPE_OPTIONS = {
  "web-template": [
    { label: "Theme", value: "theme", type: "type" },
    { label: "Page", value: "page", type: "type" },
    { label: "Section", value: "section", type: "type" },
  ],
  other: [
    { label: "Pack", value: "pack", type: "type" },
    { label: "Single", value: "single", type: "type" },
  ],
};

export const SORT_OPTIONS = [
  { name: "Trending", value: "views-desc" },
  { name: "Newest", value: "createdAt-desc" },
  { name: "Oldest", value: "createdAt-asc" },
  { name: "A-Z", value: "title-asc" },
  { name: "Z-A", value: "title-desc" },
];

export const categories = [
  {
    label: "3d Illustration",
    value: "3d-illustration",
    type: "category",
    subCategories: [
      {
        label: "Character Design",
        value: "character-design",
      },
      {
        label: "Product Mockups",
        value: "product-mockups",
      },
      {
        label: "Environment Design",
        value: "environment-design",
      },
      {
        label: "Abstract Shapes",
        value: "abstract-shapes",
      },
      {
        label: "3D Icons",
        value: "3d-icons",
      },
    ],
  },
  {
    label: "Illustration",
    value: "illustration",
    type: "category",
    subCategories: [
      {
        label: "Digital Painting",
        value: "digital-painting",
      },
      {
        label: "Vector Art",
        value: "vector-art",
      },
      {
        label: "Portraits",
        value: "portraits",
      },
      {
        label: "Concept Art",
        value: "concept-art",
      },
      {
        label: "Storyboarding",
        value: "storyboarding",
      },
    ],
  },
  {
    label: "Icon",
    value: "icon",
    type: "category",
    subCategories: [
      {
        label: "Flat Icons",
        value: "flat-icons",
      },
      {
        label: "Line Icons",
        value: "line-icons",
      },
      {
        label: "3D Icons",
        value: "3d-icons",
      },
      {
        label: "Animated Icons",
        value: "animated-icons",
      },
      {
        label: "Glyph Icons",
        value: "glyph-icons",
      },
    ],
  },
  {
    label: "Web App",
    value: "web-app",
    type: "category",
    subCategories: [
      {
        label: "Dashboard UI",
        value: "dashboard-ui",
      },
      {
        label: "E-commerce",
        value: "e-commerce",
      },
      {
        label: "Social Media",
        value: "social-media",
      },
      {
        label: "Productivity Tools",
        value: "productivity-tools",
      },
      {
        label: "Admin Panels",
        value: "admin-panels",
      },
    ],
  },
  {
    label: "Web Template",
    value: "web-template",
    type: "category",
    subCategories: [
      {
        label: "Landing Pages",
        value: "landing-pages",
      },
      {
        label: "Portfolio",
        value: "portfolio",
      },
      {
        label: "E-commerce",
        value: "e-commerce",
      },
      {
        label: "Blogs",
        value: "blogs",
      },
      {
        label: "Corporate Websites",
        value: "corporate-websites",
      },
    ],
  },
  {
    label: "Mobile App",
    value: "mobile-app",
    type: "category",
    subCategories: [
      {
        label: "Social Networking",
        value: "social-networking",
      },
      {
        label: "E-commerce",
        value: "e-commerce",
      },
      {
        label: "Fitness",
        value: "fitness",
      },
      {
        label: "Finance",
        value: "finance",
      },
      {
        label: "Education",
        value: "education",
      },
    ],
  },
];

export const budgets = [
  {
    label: "< $1000",
    value: "below-1000",
  },
  {
    label: "$1000 - $2000",
    value: "1000-2000",
  },
  {
    label: "$2000 - $3000",
    value: "2000-3000",
  },
  {
    label: "$3000 - $5000",
    value: "3000-5000",
  },
  {
    label: "> $5000",
    value: "above-5000",
  },
];
