import { NextRequest, NextResponse } from "next/server"
import { OrganizationModel } from "@/lib/mongoose/model/OrganizationSchemaDb"
import { connectToDatabase } from "@/lib/mongoose/database/db"
import { OrganizationUpdateSchema } from "@/lib/zod/schema/OrganizationSchema"

export const GET = async (req: NextRequest, { params } : { params: Promise<{organizationId: string}> }) => {
    try{
        const { organizationId } = await params
        console.log(organizationId)
        await connectToDatabase()

        const organization = await OrganizationModel.findById(organizationId)

        if(!organization){
            return NextResponse.json({
                error: "Organization not found"
            }, { status: 404 })
        }

        console.log("Organization Fetched:", organization)

        return NextResponse.json({
            message: "Organization Fetched",
            data: organization
        })
    }
    catch (err) {
        console.error("Organization Fetch Error:", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}

export const PATCH = async (req: NextRequest, { params } : { params: Promise<{organizationId: string}> }) => {
    try{
        const { organizationId } = await params
        const body = await req.json()

        const validatedBody = OrganizationUpdateSchema.safeParse(body)
        if(!validatedBody.success){
            return NextResponse.json({
                error: validatedBody.error.flatten()
            }, { status: 400 })
        }

        if (Object.keys(validatedBody.data).length === 0){
            return NextResponse.json({
                error: "No fields provided for update"
            }, { status: 400 })
        }

        await connectToDatabase()

        const organization = await OrganizationModel.findByIdAndUpdate(organizationId, {
            $set: validatedBody.data
        }, { returnDocument: "after", runValidators: true })

        if (!organization){
            return NextResponse.json({
                error: "Organization not found"
            }, { status: 404 })
        }

        return NextResponse.json({
            message: "Organization Updated",
            data: organization
        })
    }
    catch (err) {
        console.error("Organization Update Error:", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}