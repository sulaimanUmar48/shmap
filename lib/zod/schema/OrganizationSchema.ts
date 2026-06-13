import * as z from "zod"
import { AddressSchema } from "./AddressSchema"

export const OrganizationSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: AddressSchema,
    email: z.email(),
    phone: z.string(),
    industry: z.string(),
    logoUrl: z.url().optional()
})

export const OrganizationCreateSchema = OrganizationSchema.omit({id: true})
export const OrganizationUpdateSchema = OrganizationCreateSchema.partial()

export type Organization = z.infer<typeof OrganizationSchema>