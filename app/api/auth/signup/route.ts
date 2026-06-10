import { connectToDatabase } from "@/lib/mongoose/database/db"
import { UserModel } from "@/lib/mongoose/model/UserSchemaDb"
import { UserSchema } from "@/lib/zod/schema/UserSchema"
import { NextResponse, NextRequest } from "next/server"
import bcrypt from "bcryptjs"

export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const validatedBody = UserSchema.safeParse(body)
        if(!validatedBody.success){
            return NextResponse.json({
                error: validatedBody.error.flatten()
            }, { status: 400 })
        }

        await connectToDatabase()

        const existingUser = await UserModel.findOne({ email: validatedBody.data.email })
        if(existingUser){
            return NextResponse.json({
                error: "Email already in use"
            }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(validatedBody.data.password, 10)

        const user = await UserModel.create({
            ...validatedBody.data,
            password: hashedPassword
        })

        return NextResponse.json({
            message: "User Created",
            data: user
        })
    } catch (error) {
        console.error("User Creation Error:", error)
        return NextResponse.json({
            error: "An error occurred while processing the request"
        }, { status: 500 })
    }
}