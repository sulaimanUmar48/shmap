import { ColumnDef, getCoreRowModel, useReactTable } from "@tanstack/react-table"


type TableProps<T> = {
    data: T[],
    columns: ColumnDef<T>[]
}  

export const Table = <T,>({data, columns}: TableProps<T>) => {
    
    const tableInstance = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })



    return <div>
        {/* Table Container */}
        <div>
            <table className="table-auto"> 

            </table>
        </div>

        {/* Footer */}
        <div>

        </div>
    </div>
}
