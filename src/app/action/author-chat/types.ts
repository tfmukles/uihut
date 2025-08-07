export type TComment = {
  user_id: string;
  role: string;
  time: Date;
  comment: string;
  name: string;
};

export type TAuthorChat = {
  pipeline_id: string;
  comments: TComment[];
  variables: {
    pipeline_id: string;
    user_id: string;
    role: string;
    comment: string;
    time: Date;
  };
};
