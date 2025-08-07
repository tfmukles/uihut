import { TDesignFile } from "../designs/types";

export type TAuthorDesign = {
  product_id: string;
  author_id: string;
  pipeline_id: string;
  title: string;
  category: string;
  type: string;
  description: string;
  thumbnail: string;
  previews: string[];
  files?: TDesignFile[];
  price: number;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};
