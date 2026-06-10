import {Schema, model, models} from "mongoose"

export const OrganizationSchema = new Schema({
    name: { type: String, required: true },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    industry: { type: String, required: true },
    logoUrl: { type: String },
}, {
    timestamps: true
})

export const OrganizationModel = models.Organization || model("Organization", OrganizationSchema)

