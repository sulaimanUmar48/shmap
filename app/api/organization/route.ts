import {NextRequest, NextResponse} from "next/server"
import { OrganizationCreateSchema } from "@/lib/zod/schema/OrganizationSchema"
import { OrganizationModel } from "@/lib/mongoose/model/OrganizationSchemaDb"
import { connectToDatabase } from "@/lib/mongoose/database/db"


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const validatedBody = OrganizationCreateSchema.safeParse(body)
        if(!validatedBody.success){
            return NextResponse.json({
                error: validatedBody.error.flatten()
            }, { status: 400 })
        }

        await connectToDatabase()

        const organization = await OrganizationModel.create(validatedBody.data)


        return NextResponse.json({
            message: "Organization Created",
            data: organization
        }, { status: 200 })
    }
    catch (err) {
        console.error("Organization Creation Error:", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}

export const GET = async () => {
    try { 
        await connectToDatabase()

        const organizations = await OrganizationModel.find()
        
        return NextResponse.json({
            message: "Organization Fetched",
            data: organizations
        })
    }
    catch (err) {
        console.error("Organization Fetch Error:", err)
        return NextResponse.json({
            error: "An error occurred while processing the request",
            details: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}