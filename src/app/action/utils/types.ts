export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export type SubmitFormState<T> = {
  data: Omit<T, "variables"> | null;
  error: {
    path: string;
    message: string;
  }[];
  message: string | null;
  isError: boolean;
  isSuccess: boolean;
  statusCode: number | null;
};

export type InsertionSuccess<T> = {
  success: true;
  message: "data inserted successfully";
  result: T;
} & {
  variables: ExtractVariables<T>;
};
