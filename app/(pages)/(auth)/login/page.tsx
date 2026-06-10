"use client"

import { UserSignIn, UserSignInSchema } from "@/lib/zod/schema/UserSchema"
import { FormEvent, useState } from "react"
import { useForm } from "react-hook-form"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { PulseLoader } from "react-spinners"
import { useRouter } from "next/navigation"
import {FaEye, FaEyeSlash} from "react-icons/fa"

export default function Login() {


    // hooks
    const { register, handleSubmit } = useForm<UserSignIn>()
    const router = useRouter()



    // Loading States
    const [isSigningIn, setIsSigningIn] = useState(false)


    // Indicating States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)



    const onSubmit = async (data: UserSignIn) => {
        setIsSigningIn(true)
        console.log("Login Data:", data)
        try {
            const startTime = performance.now()
            const validatedData = UserSignInSchema.safeParse(data)
            if(!validatedData.success){
                console.error("Validation Failed:", validatedData.error.flatten())
                alert(`Validation Failed: ${JSON.stringify(validatedData.error.flatten())}`)
                return
            }
            
            const res = await signIn("credentials", {
            email: validatedData.data.email,
            password: validatedData.data.password,
            redirect: false,
            });

            console.log("SIGNIN RESPONSE:", res);

            if (!res?.ok) {
            alert(res?.error || "Login failed");
            return;
            }


            console.log("Duration:", performance.now() - startTime, "ms");

            setTimeout(() => {
                router.push("/")
            }, 1000)


        }
        catch (error) {
            console.error("Login Error:", error)
        }
        finally{
            setIsSigningIn(false)
        }

    }

    return <div className="h-full max-h-full w-full bg-background p-1 flex gap-2">
        
        {/* Div container form */}
        <div className="flex-1 flex items-center ">
            
            <div className="ml-20 ">
                <h3 className="font-semibold mb-4 text-[10px]">
                    . Shmap .
                </h3>
                <h1 className="font-semibold text-3xl">
                    Login
                </h1>

                {/* Login Form */}
                <form className="text-xs mt-10 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Email */}
                    <label className="flex flex-col">
                        <span className="opacity-70 flex gap-2 items-center">
                            <FaEnvelope />
                            Email
                        </span>
                        <input {...register("email", {required: true})} type="text" className="outline-0 border-b w-60 border-border-main/20 focus:border-border-main pl-4 pr-2 py-2" />
                    </label>

                    {/* Password */}
                    <label className="flex flex-col relative">
                        <span className="opacity-70 flex items-center gap-2">
                            <FaLock />
                            Password
                        </span>
                        <input {...register("password", {required: true}) } type={isPasswordVisible ? "text" : "password"} className="outline-0 border-b w-60 border-border-main/20 focus:border-border-main pl-4 pr-2 py-2" />
                        <button 
                            type="button" 
                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            className="absolute bottom-2 right-1 flex items-center"
                        >
                            {
                                isPasswordVisible ? <FaEye className="text-text-main text-xs" /> :
                                <FaEyeSlash className="text-text-main text-xs" />
                            }
                        </button>
                    </label>

                    <button 
                    className="py-3 w-full bg-accent-one rounded text-white" 
                    disabled={isSigningIn}>
                        {
                            isSigningIn ? <PulseLoader size={5} color="white"/> : "Log in"
                        }
                    </button>
                </form>

            </div>

        </div>
        {/* Div Container for images */}
        <div className="flex-1 bg-accent-one/40 rounded-lg">

        </div>
    </div>
}