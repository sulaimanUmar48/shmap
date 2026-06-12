import Link from "next/link";
import { NavLink } from "./NavLink";


export const ProfileMenuLink = ({title, url, icon: Icon}: NavLink ) => {
    return <div className="w-full hover:bg-text-main rounded transition-all ease-out duration-300">
        <Link href={url} className="w-full p-2  border border-border-main/10 rounded flex item-center gap-1 transition-all hover:text-text-secondary ease-out duration-300">
            <Icon className="mt-px"/>
            {title}
        </Link>
    </div>
}

