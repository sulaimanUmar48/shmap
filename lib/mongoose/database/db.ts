import mongoose from "mongoose"

const MONGODBURI = process.env.MONGODBURI || ""

if (!MONGODBURI) {
    throw new Error("MONGODBURI is not defined in environment variables")
}

interface MongooseCache {
    conn: typeof mongoose | null
    promise: Promise<typeof mongoose> | null
}

declare global {
    var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }

global.mongoose = cached

export async function connectToDatabase(){
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise){
        cached.promise = mongoose.connect(MONGODBURI).then(mongoose => {
            return mongoose
        })
    }

    cached.conn = await cached.promise

    return cached.conn

}