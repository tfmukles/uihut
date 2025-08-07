export type TDownloadedDesign = {
  product_id: string;
  category: string;
  title: string;
  type: string;
  thumbnail: string;
  downloads: [
    {
      date: string;
    },
  ];
};

export type TDownloadedIcon = {
  product_id: string;
  title: string;
  thumbnail: string;
  downloads: [
    {
      date: string;
    },
  ];
};

export type TDownloadedWebflow = {
  product_id: string;
  title: string;
  type: string;
  theme: string;
  preview: string;
  downloads: [
    {
      date: string;
    },
  ];
};

export type TCreateProductDownload = {
  product_id: string;
  type: string;
  premium: boolean;
  category?: string;
  theme?: string;
};

export type TDownload = {
  user_id: string;
  designs: TDownloadedDesign[];
  webflows: TDownloadedWebflow[];
  variables: {
    user_id: string;
    package_name: string;
    product_type: string;
    current_date: string;
    license: string;
    design?: TCreateProductDownload;
    webflow?: TCreateProductDownload;
  };
};
