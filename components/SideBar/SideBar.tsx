"use client"

import {LuClock7, LuCog, LuLayoutDashboard, LuLogOut, LuUser, LuUsers} from "react-icons/lu"
import { NavLink } from "./NavLink"
import { FaCircleUser } from "react-icons/fa6"
import { getServerSession, NextAuthOptions, User } from "next-auth"
import { useEffect, useState } from "react"
import { authOptions } from "@/lib/auth/authOptions"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { ProfileMenuLink } from "./ProfileMenuLink"

const NAV_OBJECTS: NavLink[] = [
    {
        title: "Dashboard",
        icon: LuLayoutDashboard,
        url: "/"
    },
    {
        title: "Shifts",
        icon: LuClock7,
        url: "/shifts"
    },
    {
        title: "Staff",
        icon: LuUsers,
        url: "/staff"   
    }
]

const PROFILE_MENU_NAV_OBJECTS: NavLink[] = [
    {
        title: "Profile",
        icon: LuUser,
        url: "/"
    },
    {
        title: "Settings",
        icon: LuCog,
        url: "/"
    }
]

export const SideBar = () => {

    const user = useSession().data?.user

    return <div className="w-full max-w-full h-full max-h-full text-text-side-bar flex flex-col justify-between pb-3">
        <div>

            {/* organization  */}
            <div className="w-full h-25 flex flex-col items-center justify-center border-b border-b-border-side-bar/25">
                <h1 className="text-xl">
                    Comp.logo
                </h1>
            </div>

            {/* Nav Bar container */}
            <div className="mt-3 space-y-1">
                {
                    NAV_OBJECTS.map((link, i) => 
                        <NavLink key={i} {...link} />
                    )
                }
            </div>
        </div>

        <div className="h-15 px-1 bg-border-side-bar/10 rounded border-border-side-bar/20 border flex items-center">

            <div className="flex gap-1 items-center relative">
                {/* Profile Icon */}
               <div>
                <figure className="w-9 h-9 rounded-full overflow-hidden bg-black/10 peer">
                    <FaCircleUser className="text-text-main w-full h-full" />
                </figure>

                {/* Profile Menu */}
                <div className={`
                    absolute left-0 bottom-[160%] w-full h-40 bg-white rounded -translate-x-full opacity-0 delay-1000 text-text-main text-[10px] p-1
                    hover:opacity-100 hover:translate-x-0 
                    peer-hover:opacity-100 peer-hover:translate-x-0 peer-hover:delay-0
                    transition-all ease-out duration-300
                `}>

                    {/* Profile Menu*/}
                    {
                        PROFILE_MENU_NAV_OBJECTS.map( (link, i) => 
                            <ProfileMenuLink key={i} {...link}/>
                        )
                    }
                    <div className="w-full hover:bg-text-main rounded transition-all ease-out duration-300">
                        <button className="w-full p-2  border border-border-main/10 rounded flex item-center gap-1 transition-all hover:text-text-secondary ease-out duration-300">
                            <LuLogOut className="mt-px"/>
                            Log Out
                        </button>
                    </div>
                 </div>
               </div>
                <div>
                    <p className="text-[10px]">
                        {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-[9px] opacity-60">
                        {user?.role}
                    </p>
                </div>
            </div>
            
        </div>
    </div>
}