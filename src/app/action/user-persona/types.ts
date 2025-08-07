export type TUserPersona = {
  user_id: string;
  image: string;
  gender: string;
  profession: string;
  company_size: string;
  usage: string;
  projects: string[];
  preferences: string[];
  purchase_reason: string;
  channel: string;
  website: string;
  website_type: string;
  social_medias: string[];
  variables: Omit<Partial<TUserPersona>, "variables">;
};
