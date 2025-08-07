export type TAuthor = {
  author_id: string;
  anonymous: boolean;
  best_work: string;
  portfolio: string;
  earnings: number;
  withdrawals: number;
  withdrawal_logs: string[];
  budget: number;
  bank_name: string;
  bank_ac_name: string;
  bank_ac_no: string;
  bank_district: string;
  bank_branch: string;
  bank_routing_no: string;
  mobile_number: string;
  type: "designer" | "developer";
  status: string;
};

export type UpdateAuthor = TAuthor & {
  variables: {
    author_id: string;
    bank_name: string;
    bank_ac_name: string;
    bank_ac_no: string;
    bank_district: string;
    bank_branch: string;
    bank_routing_no: string;
    mobile_number: string;
  };
};
