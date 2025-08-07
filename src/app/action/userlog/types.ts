export type Dates = {
  date: string;
};

export type TUserlog = {
  user_id: string;
  first_visit: string;
  referrer: string;
  landing_page: string;
  device: string;
  visits: Dates[];
};
