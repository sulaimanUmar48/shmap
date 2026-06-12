"use client"

import { useMemo, useState } from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

const DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

export const Calender = () => {

    const [currentDate, setCurrentDate] = useState(new Date())

    const days = useMemo(() => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)

        const totalDays = lastDay.getDate()

        const previousMonthRemainingDays = new Date(new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)).getDay() + 1




        console.log("Remaining DAYS", previousMonthRemainingDays)
    
        const previousDays = Array.from(
            {length: previousMonthRemainingDays},
            (_) => null
        )
        
        const currentDays = Array.from(
            {length: totalDays},
            (_, i) => i + 1
        );

        console.log("PREVIOUS DAYS LENGTH:", previousDays.length)

        return previousDays.length !== 7 ? [...previousDays,...currentDays] : currentDays
    }, [currentDate])

    console.log(days)


    const previousMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() - 1,
                1
            )
        )
    }

    const nextMonth = () => {
        setCurrentDate(
            new Date(
                currentDate.getFullYear(),
                currentDate.getMonth() + 1,
                1
            )
        )
    }



    return <div className="p-2">
        <div className="flex justify-center items-center mt-4">
            <button 
            className="text-lg"
            onClick={previousMonth}
            >
                <LuChevronLeft/>
            </button>
            <span className="w-25 text-center">
                {currentDate.toLocaleDateString("default", {
                    month: "long",
                    year: "numeric"
                })}
            </span>
            <button 
            className="text-lg"
            onClick={nextMonth}
            >
                <LuChevronRight/>
            </button>
        </div>

        <div className="grid grid-cols-7 w-64 mx-auto items-center justify-center mt-8 gap-y-2">
            {
                DAYS_OF_THE_WEEK.map( (day, i) => 
                    <p key={i} className={`
                        text-center opacity-50 h-7 w-7
                        ${[0,6].includes(i) && "text-red-300 opacity-100"}
                    `}>
                        {day}
                    </p> 
                )
            }
            {
                days.map( (day,i) => 
                    // ${day !== null ? "bg-red-400" : ""}
                    <button key={i} disabled={day === null} className={`
                        rounded-full  h-7 w-7 transition-all ease-out duration-300
                        ${day !== null ? "hover:bg-red-100 hover:text-black" : "pointer-events-none cursor-default"}
                    `}>
                        {day}
                    </button>
                )
            }
        </div>
    </div>
}



"1. camelCase"
"2. PascalCase"
"3. snake_case"