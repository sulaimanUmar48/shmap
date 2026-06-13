import * as z from "zod"
import { AddressSchema } from "./AddressSchema"

export const ShiftSchema = z.object({
    id: z.string(),
    name: z.string(),
    startTime: z.date(),
    endTime: z.date(),
    location: AddressSchema,
    currentlyAssignedTo: z.array(z.string()).default([]),
    createdBy: z.string(),
    updatedBy: z.string(),
    organizationId: z.string()
})

export const CreateShiftSchema = 
    ShiftSchema
        .omit({id: true, location: true})
        .extend({
            startTime: z.coerce.date(),
            endTime: z.coerce.date()
        })

export const UpdateShiftSchema = 
    CreateShiftSchema.partial()


export type Shift = z.infer<typeof ShiftSchema>