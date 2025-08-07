export type TMember = {
  user_id: string;
  image: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type TTeam = {
  variables: {
    owner_id: string;
    member_email: string;
  };
  owner_id: string;
  package: string;
  expires_date: string;
  limit: number;
  permissions: string[];
  users: TMember[];
  members: TMember[];
  createdAt: string;
};
