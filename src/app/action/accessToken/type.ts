export type TToken = {
  name: string;
  token: string;
  expires_in: string;
  createdAt: string;
};

export type TAccessToken = {
  variables: {
    user_id: string;
    token_name: string;
    currentTime: string;
    expires_in: string;
  };
  _id: string;
  user_id: string;
  tokens: TToken[];
};
