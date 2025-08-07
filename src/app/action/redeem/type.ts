type TRedeem = {
  license_key: string;
  redeemed_at?: Date;
  user_id?: string;
  platform?: string;
  package?: string;
  status: "active" | "used";
  createdAt: Date;
  updatedAt: Date;
  variables: {
    code: string;
    userId: string;
  };
};
