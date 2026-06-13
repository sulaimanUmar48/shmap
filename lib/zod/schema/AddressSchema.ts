import * as z from "zod"

export const AddressSchema = z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    zipCode: z.string()
})


export type Address = z.infer<typeof AddressSchema>