import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: "admin" | "staff" | "guest";
    status: string;
  }

  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: "admin" | "staff" | "guest";
      status: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    firstName: string;
    lastName: string;
    role: "admin" | "staff" | "guest";
    status: string;
  }
}