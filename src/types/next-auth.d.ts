import { UserStatusType } from "@/actions/user/types";
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    email: string;
    image: string;
    id: string;
    accessToken: string;
    firstName: string;
    lastName?: string;
    expiredAt: number;
    status: UserStatusType;
    isPasswordExit: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    email: string;
    image: string;
    id: string;
    accessToken: string;
    firstName: string;
    lastName?: string;
    expiredAt: number;
    isPasswordExit: boolean;
    status: UserStatusType;
  }
}
