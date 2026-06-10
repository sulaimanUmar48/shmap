import { connectToDatabase } from "@/lib/mongoose/database/db"
import { UserModel } from "@/lib/mongoose/model/UserSchemaDb"
import { UserSchema, UserUpdateSchema } from "@/lib/zod/schema/UserSchema"
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"


export const GET = async (req: NextRequest, {params} : {params: Promise<{organizationId: string, userId: string}>}) => {
    try{
        const { organizationId, userId } = await params

        await connectToDatabase()
        const user = await UserModel.findOne({_id: userId, organizationId})
        console.log(user)

        return NextResponse.json({
            message: "User fetched",
            data: user
        }, { status: 200 })
    }
    catch (err) {
        console.error("Error Fetching User", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}

export const PATCH = async (req: NextRequest, {params} : {params: Promise<{organizationId: string, userId: string}>}) => {
    try{
        const { organizationId, userId } = await params
        const body = await req.json()

        const validatedBody = UserUpdateSchema.safeParse(body)
        
        if(!validatedBody.success){
            return NextResponse.json({
                error: validatedBody.error.flatten()
            }, {status: 400})
        }

        await connectToDatabase()

        const user = await UserModel.findOneAndUpdate({_id: userId, organizationId}, validatedBody.data, {new: true, runValidators: true})

        if (!user) {
            return NextResponse.json({
                error: "User not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "User Data successfully updated",
            data: user
        }, { status: 200 })
    }
    catch (err) {
        console.error("Error Fetching User", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}