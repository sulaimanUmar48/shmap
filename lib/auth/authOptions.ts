import { NextAuthOptions } from "next-auth"
import bcrypt from "bcryptjs"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "@/lib/mongoose/database/db"
import { UserModel } from "@/lib/mongoose/model/UserSchemaDb"


export const authOptions : NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    throw new Error("Email and password are required")
                }

                await connectToDatabase()
            
                const user = await UserModel.findOne({email: credentials.email})
                if(!user){
                    throw new Error("No user found")
                }

                const isValid = await bcrypt.compare(credentials.password, user.password)
                if(!isValid){
                    throw new Error("Invalid password")
                }
                
                return {
                    id: user._id.toString(),
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    status: user.status,
                    organizationId: user.organizationId
                }
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }){
            if(user){
                token.id = user.id
                token.email = user.email
                token.firstName = user.firstName
                token.lastName = user.lastName
                token.role = user.role
                token.status = user.status,
                token.organizationId = user.organizationId
            }

            return token
        },

        async session({ session, token }){
        if(token){
            session.user.id = token.id
            session.user.email = token.email
            session.user.firstName = token.firstName
            session.user.lastName = token.lastName
            session.user.role = token.role
            session.user.status = token.status
            session.user.organizationId = token.organizationId
        }
        return session
    }},
    pages: {
        signIn: "/login"
    }
}