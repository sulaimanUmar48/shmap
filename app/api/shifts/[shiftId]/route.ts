import { connectToDatabase } from "@/lib/mongoose/database/db";
import { ShiftModel } from "@/lib/mongoose/model/ShiftSchemaDb";
import { UpdateShiftSchema } from "@/lib/zod/schema/ShiftSchema";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";



export const DELETE = async (request: NextRequest, {params}: {params: Promise<{shiftId: string}>}) => {
    try{

        const shiftId = (await params).shiftId

        await connectToDatabase()

        const deletedShift = await ShiftModel.findByIdAndDelete(shiftId)

        if(!deletedShift){
            return NextResponse.json({
                error: "Could not find Shift"
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "Shift Deleted",
            data: deletedShift
        }, { status: 200 })

    }
    catch(err){
        console.error("ERROR DELETING SHIFT", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}



export const GET = async (request: NextRequest, {params}: {params: Promise<{shiftId: string}>}) => {
    try{

        const shiftId = (await params).shiftId

        await connectToDatabase()

        const shift = await ShiftModel.findById(shiftId)

        if(!shift){
            return NextResponse.json({
                error: "Could not find Shift"
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "Shift Found",
            data: shift
        }, { status: 200 })

    }
    catch(err){
        console.error("ERROR FINDING SHIFT", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}

export const PATCH = async (request: NextRequest, {params}: {params: Promise<{shiftId: string}>}) => {
    try{

        const shiftId = (await params).shiftId
        const body = await request.json()

        const validatedBody = UpdateShiftSchema.safeParse(body)
        if(!validatedBody.success){
            return NextResponse.json({
                error: validatedBody.error.flatten()
            }, {status: 400})
        }

        if(Object.keys(validatedBody.data).length === 0){
            return NextResponse.json({
                error: "No fields provided for update"
            }, { status: 400 })
        }

        await connectToDatabase()

        const shift = await ShiftModel.findByIdAndUpdate(shiftId, {
            $set: validatedBody.data
        }, {runValidators: true, returnDocument: "after"})

        if(!shift){
            return NextResponse.json({
                error: "Shift not found"
            }, { status: 404 })
        }


        return NextResponse.json({
            message: "Shift Updated",
            data: shift
        }, { status: 200 })

    }
    catch(err){
        console.error("ERROR UPDATING SHIFT", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}
