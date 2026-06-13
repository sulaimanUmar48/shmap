import {Schema, model, models} from "mongoose"
import { AddressSchemaDb } from "./AddressSchema"

export const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    address: AddressSchemaDb,
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    industry: { type: String, required: true },
    logoUrl: { type: String },
}, {
    timestamps: true
})

export const OrganizationModel = models.Organization || model("Organization", OrganizationSchema)

