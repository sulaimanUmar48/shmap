"use client"

import { FormEvent } from "react"
import { useForm } from "react-hook-form"
import { FaEnvelope, FaLock } from "react-icons/fa"

export default function Login() {

    const { register, handleSubmit } = useForm()

    const onSubmit = data => {
        console.log(data)
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
                    <label className="flex flex-col">
                        <span className="opacity-70 flex items-center gap-2">
                            <FaLock />
                            Password
                        </span>
                        <input {...register("password", {required: true}) } type="password" className="outline-0 border-b w-60 border-border-main/20 focus:border-border-main pl-4 pr-2 py-2" />
                    </label>

                    <button className="py-3 w-full bg-accent-one rounded text-white">
                        Log in
                    </button>
                </form>

            </div>

        </div>
        {/* Div Container for images */}
        <div className="flex-1 bg-accent-one/40 rounded-lg">

        </div>
    </div>
}