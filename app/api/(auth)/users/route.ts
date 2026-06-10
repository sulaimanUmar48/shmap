import { connectToDatabase } from "@/lib/mongoose/database/db"
import { UserModel } from "@/lib/mongoose/model/UserSchemaDb"
import { UserSchema } from "@/lib/zod/schema/UserSchema"
import { NextResponse, NextRequest } from "next/server"


export const GET = async () => {
    try{
        return NextResponse.json({
            message: "Users Fetched",            
            data: [{"id": 1, "name": "John Doe"}, {"id": 2, "name": "Jane Doe"}]
        })
    }
    catch(error){
        console.error("User Error:", error)
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 })
    }
} 


export const POST = async (req: NextRequest) => {
    try{
        const body = await req.json()
        const validatedBody = UserSchema.safeParse(body)

        if(!validatedBody.success){
            return NextResponse.json({
                error: validatedBody.error.flatten()
            }, { status: 400 })
        }

        await connectToDatabase()
        
        const user = await UserModel.create(validatedBody.data)

        return NextResponse.json({
            message: "User Created",
            data: user
        })
    }
    catch(error){
        console.error("User Creation Error:", error)
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 })
    }
}