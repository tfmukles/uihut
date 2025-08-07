export type TOrderUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  image: string;
  country: string;
};

export type TPayment = {
  order_id: string;
  checkout_id: string;
  earnings: string;
  total: string;
  tax: string;
  fee: string;
  coupon: string;
  refund: string;
  expires_date: string;
};

export type TOrder = {
  checkout_id: string;
  package: string;
  subscription_id: string;
  status: string;
  createdAt: string;
  expires_date: string;
  users: TOrderUser[];
  payments: TPayment[];
};
