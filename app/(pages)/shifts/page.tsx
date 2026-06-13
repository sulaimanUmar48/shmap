"use client"

import { Table } from "@/components/utilities/Table";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";


const FILTER_VALUES = [
    {
        name: "All",
        value: ""
    },
    {
        name: "Assigned",
        value: "assigned"
    },
    {
        name: "Unassigned",
        value: "unassigned"
    }
]

// const columnHelper = createColumnHelper<>()



export default function ShiftsPage(){

    const [currentFilter, setCurrentFilter] = useState("")


    // Table Column Def

    const columns

    const tableOptions = {
        data: [],

    }

    return <div className="h-full max-h-full w-full max-w-full p-2 overflow-y-scroll">

        {/* Status Cards */}
        <div className="flex gap-2">
          <div className="w-60 min-w-60 flex-1 max-w-50 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            qdw
          </div>
          <div className="w-60 min-w-60 flex-1 max-w-50 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            qdw
          </div>
          <div className="w-60 min-w-60 flex-1 max-w-50 rounded shadow-[0_0_10px_rgba(0,0,0,0.1)] bg-white h-41">
            qdw
          </div>
        </div>

        {/* Table */}
        <div className="mt-6">
            {/* Filter Section */}
            <div className="flex gap-4">

                {/* Search */}
                <div>
                    <label className="w-54 h-8 block relative">

                        <input 
                        type="text" 
                        className="w-full h-full max-w-full max-h-full outline-0 border rounded border-border-main/10 text-[10px] pl-7 focus:border-border-main/80 peer transition-all duration-300 ease-out"
                        />
                        <LuSearch className="absolute top-2 left-2 opacity-50 peer-focus:opacity-100 transition-all duration-300 ease-out"/>

                    </label>
                </div>

                <div className="space-x-1">
                    {
                        FILTER_VALUES.map( filter => 
                            <button key={filter.value}
                            className={`
                                text-[10px] h-8 px-4 rounded
                                ${filter.value === currentFilter && "bg-foreground text-text-secondary" }
                            `} 
                            onClick={() => setCurrentFilter(filter.value)}
                            >
                                {filter.name}
                            </button>
                        )
                    }
                </div>
            </div>

            {/* Table */}
            <div className="h-100 max-h-100 mt-4 rounded">
                <Table />
            </div>

        </div>
    </div>
}