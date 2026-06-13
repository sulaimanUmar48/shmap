import { ReactNode } from "react";


export default function ShiftsLayout({children} : {children: ReactNode}){
    return <div className="h-full max-h-full w-full max-w-full flex"> 
        <div className="max-w-[calc(100%-300px)] flex-1">
            {children}
        </div>
        <div className="bg-foreground/5 w-75">

        </div>
    </div>
}