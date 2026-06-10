import {model, Schema} from "mongoose"

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    pay: { type: Number, required: true },
    role: { type: String, enum: ["admin", "user", "guest"], required: true },
    status: { type: String, enum: ["active", "inactive", "onLeave"], required: true }   
}, {
    timestamps: true
})

export const UserModel = model("User", UserSchema)