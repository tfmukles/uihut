export type TDesignFile = {
  file: string;
  type:
    | "figma"
    | "figma_code"
    | "xd"
    | "svg"
    | "sketch"
    | "png"
    | "illustration"
    | "3d_illustration"
    | "";
};

export type TDesign = {
  product_id: string;
  title: string;
  description: string;
  previews: string[];
  thumbnail: string;
  category: string;
  type: string;
  tags: string[];
  active: boolean;
  premium: boolean;
  featured: boolean;
  files: TDesignFile[];
  views: number;
  downloads: number;
  createdAt: string;
};
