import { object as ZObject, string } from "zod";
import * as z from "zod";

export const UserSchema = ZObject({
    id: z.string(),
    firstName: string(),
    lastName: string(),
    middleName: string(),
    email: z.email(),
    phone: z.string(),
    password: z.string().min(7, "Password must be at least 7 characters long"),
    pay: z.number().positive("Pay must be a positive number"),
    role: z.enum(["admin", "staff", "guest"]),
    status: z.enum(["active", "inactive", "onLeave"])
})

export const UserSignInSchema = UserSchema.pick({
    email: true,
    password: true
})

export type User = z.infer<typeof UserSchema>
export type UserSignIn = z.infer<typeof UserSignInSchema>

