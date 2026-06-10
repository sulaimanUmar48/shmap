import * as z from "zod"

export const OrganizationSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.object({
        street: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zipCode: z.string()
    }),
    email: z.email(),
    phone: z.string(),
    industry: z.string(),
    logoUrl: z.url().optional()
})

export type Organization = z.infer<typeof OrganizationSchema>