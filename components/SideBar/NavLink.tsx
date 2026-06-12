"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconType } from "react-icons/lib"
import { LuLayoutDashboard } from "react-icons/lu"


export type NavLink = {
    title: string
    icon: IconType
    url: string 
}


export const NavLink = ({title, icon: Icon, url} : NavLink) => {


    const currentPath = usePathname()
    const isActive = 
        url === "/" 
            ? currentPath === "/" :
            currentPath.startsWith(url);

    console.log(isActive)

    


    return <div className={`
        flex items-center relative transition-all ease-out duration-300 text-text-secondary rounded-r-sm
        ${isActive && "bg-border-main"}
    `}>
        <Link href={url} className={`
            text-xs ml-4 flex gap-1 items-center justify-start hover:gap-3 transition-all duration-300 ease-out py-3 w-full
        `}>
            <Icon />
            {title}
        </Link>

        <div className={`
            h-full w-2 bg-text-secondary absolute top-0 left-0 rounded-r-2xl transition-all ease-out duration-800
            ${!isActive && "opacity-0 -translate-x-full"}
        `}/>
    </div>
}