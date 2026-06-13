import {Schema, model, models} from "mongoose"
import { AddressSchemaDb } from "./AddressSchema"

const ShiftSchema = new Schema({
    name: {type: String, required: true},
    startTime: {type: Date, required: true},
    endTime: {type: Date, required: true},
    location: AddressSchemaDb,
    currentlyAssignedTo: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    createdBy: {type: Schema.Types.ObjectId, ref: "User"},
    updatedBy: {type: Schema.Types.ObjectId, ref: "User"},
    organizationId: {type: Schema.Types.ObjectId, ref: "Organization"}
}, {
    timestamps: true
})

export const ShiftModel = models.Shift || model("Shift", ShiftSchema)