export type TWebflowTheme = {
  slug: string;
  title: string;
  style_guide: string;
  thumbnail: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  variables: {};
};

type Page = {
  title: string;
  preview: string;
  demo: string;
  page: string;
  premium: boolean;
  featured: boolean;
  weight: number;
  downloads: number;
  product_id: string;
  code: string;
  category: string;
};

type Section = {
  title: string;
  preview: string;
  category: string;
  premium: boolean;
  featured: boolean;
  weight: number;
  downloads: number;
  product_id: string;
  code: string;
};

export type WebflowThemeCollection = {
  title: string;
  slug: string;
  style_guide: string;
  thumbnail: string;
  description: string;
  pages: Page[];
  sections: Section[];
};
