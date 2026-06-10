import {model, models, Schema} from "mongoose"

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    pay: { type: Number, required: true },
    role: { type: String, enum: ["admin", "staff", "guest"], required: true },
    status: { type: String, enum: ["active", "inactive", "onLeave"], required: true },
    organizationId: {type: Schema.Types.ObjectId, ref: "Organization", required: true }   
}, {
    timestamps: true
})

export const UserModel = models.User || model("User", UserSchema) 