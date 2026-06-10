import { connectToDatabase } from "@/lib/mongoose/database/db";
import { UserModel } from "@/lib/mongoose/model/UserSchemaDb";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try{
        await connectToDatabase()

        const users = await UserModel.find()
        return NextResponse.json({
            message: "Users Fetched",
            data: users
        }, { status: 200 })
    }
    catch (err) {
        console.error("Error Fetching Users", err)
        return NextResponse.json({
            error: err instanceof Error ? err.message : err
        }, { status: 500 })
    }
}