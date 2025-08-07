export type RegularPage = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    layout?: string;
    draft?: boolean;
  };
  content: string;
  slug?: string;
};

export interface ExtendedPage extends RegularPage {
  frontmatter: RegularPage["frontmatter"] & {
    footer_title: string;
    footer_content: string;
    content: string;
  };
}

export interface ISeoMeta {
  title?: string;
  meta_title?: string;
  image?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
  draft: boolean;
}

export type Post = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    author: string;
    last_update?: string;
    date?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type Author = {
  frontmatter: {
    title: string;
    image?: string;
    description?: string;
    meta_title?: string;
    social: [
      {
        name: string;
        icon: string;
        link: string;
      },
    ];
  };
  content?: string;
  slug?: string;
};

export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Testimonial = {
  name: string;
  designation: string;
  avatar: string;
  content: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

interface IErrorMessage {
  path: string;
  message: string;
}

// Banner
interface IUserRating {
  rating: string;
  description: string;
  className?: string;
  variant?: "default" | "secondary";
}

interface Banner {
  title: string;
  description: string;
  announcement: string;
  starryBg?: boolean;
  userRating?: boolean;
  showTags?: boolean;
  searchBox?: boolean;
  headingClassName?: string;
  containerClassName?: string;
  blob?: boolean;
  className?: string;
  user_ratings?: IUserRating;
  search_tags?: string[];
  badge_link?: string;
}

interface IDesignResource {
  title: string;
  description: string;
  list: string[];
  button: Button;
  services: Service[];
}

interface Service {
  title: string;
  quantity: string;
  icon: string;
}

interface Resource {
  title: string;
  icon: string;
  blurSvg: string;
  description: string;
  features: string[];
  button: Button;
}

interface ProductRow {
  title: string;
  description: string;
  button: Button;
}

interface IProductSection {
  image: string | StaticImport;
  title: string;
  description: string;
  button: Button;
}

interface IPlanFeature {
  title: string;
  description: string;
  plans: Plan[];
}

interface Plan {
  image: string | StaticImport;
  title: string;
  description: string;
  features: PlanFeature[];
  button: Button;
}

interface PlanFeature {
  label: string;
  has_feature?: boolean;
}

interface IProduct {
  title: string;
  description: string;
  button: Button;
}

interface IHomePageData extends ISeoMeta {
  banner: Banner;
  design_resource: IDesignResource;
  resources: Resource[];
  products: IProduct[];
  recently_added: ProductRow;
  trending: ProductRow;
  handpicked: ProductRow;
  web_template: IProductSection;
  web_app: IProductSection;
  mobile_app: IProductSection;
  illustrations: IProductSection;
  plugins: (IProductSection & {
    icon: string;
    image: string;
    video_id: string;
  })[];
  _3d_illustrations: IProductSection;
  plan_feature: IPlanFeature;
}

interface ICallToAction {
  enable: boolean;
  title: string;
  image: string;
  description: string;
  button: Button;
  icon?: string;
  video_id?: string;
}

interface IProductResourceIndex {
  banner: Banner;
  recently_added: ProductRow;
  trending: ProductRow;
  handpicked: ProductRow;
  web_template: IProductSection;
  web_app: IProductSection;
  mobile_app: IProductSection;
  illustrations: IProductSection;
  _3d_illustrations: IProductSection;
}

// blog
export type TBlog = {
  frontmatter: {
    title: string;
    meta_title?: string;
    description?: string;
    image?: string;
    categories: string[];
    date?: string;
    last_update?: string;
    author?: string;
    draft?: boolean;
  };
  slug?: string;
  content?: string;
};

export type TBlogIndex = {
  title: string;
  meta_title: string;
  description: string;
  banner: {
    title: string;
    description: string;
  };
};

type QuizOption = {
  label: string;
  src?: string;
};

interface Quiz {
  question: string;
  options: QuizOption[];
  correct_answer: QuizOption["label"];
}

type CorrectAnswer = {
  question: string;
  givenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  point: number;
};

type QuizResult = {
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  questionsAndAnswers: CorrectAnswer[];
  gift: string;
  id: string;
  name: string;
};

interface Plan {
  package_name: string;
  product_id?: string;
  regular_price: string;
  recommended?: boolean;
  discount_price?: string;
  discount_rate?: string;
  duration: "lifetime" | "yearly" | "monthly";
  plan_description: string;
  limit?: string;
  features: PlanFeature;
}

export interface SubscriptionPlans {
  lifetime: Plan[];
  yearly: Plan[];
  monthly: Plan[];
}
