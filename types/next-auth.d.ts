import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    role: "admin" | "staff" | "guest";
    status: string;
    organizationId: string
  }

  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      role: "admin" | "staff" | "guest";
      status: string;
      organizationId: string
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
    organizationId: string
  }
}