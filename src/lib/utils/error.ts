import { IErrorMessage } from "@/types";
import { CredentialsSignin } from "next-auth";

export class CustomApiError extends Error {
  statusCode: number;
  errorMessage: IErrorMessage[];

  constructor(
    statusCode: number,
    message: string,
    errorMessage: IErrorMessage[] = [],
  ) {
    super(message);
    this.name = "CustomApiError";
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}

export class InvalidCredentials extends CredentialsSignin {
  constructor({
    message,
    errorMessage,
  }: {
    message: string;
    errorMessage: IErrorMessage[];
  }) {
    super(message, {
      cause: {
        message,
        errorMessage: errorMessage,
      },
    });
  }
}
