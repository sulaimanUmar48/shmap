import { connectToDatabase } from "@/lib/mongoose/database/db";
import { OrganizationModel } from "@/lib/mongoose/model/OrganizationSchemaDb";
import { ShiftModel } from "@/lib/mongoose/model/ShiftSchemaDb";
import { UserModel } from "@/lib/mongoose/model/UserSchemaDb";
import { CreateShiftSchema } from "@/lib/zod/schema/ShiftSchema";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    try{
        const body = await request.json()
        const validatedData = CreateShiftSchema.safeParse(body)
        if(!validatedData.success){
            return NextResponse.json({
                error: validatedData.error.flatten()
            }, { status: 400 })
        }

        console.log("Connected")
        // Connect to database
        await connectToDatabase()

        // Check if user exists
        const userExists = await UserModel.findById(validatedData.data.createdBy)
        console.log(userExists)
        if(!userExists){
            return NextResponse.json({
                error: "User does not exist"
            }, { status: 404 })
        }

        console.log("Still Connected")


        // Check if organization exist
        const organizationExist = await OrganizationModel.findById(validatedData.data.organizationId)
        if(!organizationExist){
            return NextResponse.json({
                error: "Organization does not exist"
            }, { status: 404 })
        }

        const shift = await ShiftModel.create(validatedData.data)

        return NextResponse.json({
            message: "Shift Created",
            data: shift
        }, { status: 201 })
        
    }
    catch(err){
        console.error("ERROR CREATING SHIFT", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    try{

        await connectToDatabase()

        const shifts = await ShiftModel.find().populate("createdBy")
        return NextResponse.json({
            message: "Shifts Fetched",
            data: shifts
        }, { status: 200 })
    }
    catch(err){
        console.error("ERROR CREATING SHIFT", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}