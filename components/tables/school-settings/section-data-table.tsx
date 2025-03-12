"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
//import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  //DropdownMenuLabel,
  //DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store"


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    empty_data_message:string 
    filters:{column:string,placeholder:string,select_box_name:string}[],
    paginations?:number[]
  }

  export function SectionDataTable<TData,TValue>({columns,data,empty_data_message,filters,paginations}:DataTableProps<TData, TValue>) {
  const store_modal = useSchoolSectionStore(); 
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [visible_row, setVisibleRow] = useState(paginations?paginations[0]:10);
  const [filter_type, set_filter_type] = useState(0);
  //const [pagination, setPagination] = useState(paginations?paginations[0]:2);
  //const [filter, setFilter] = useState({filter:filter_column,filter_text:filter_placeholder});

  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  useEffect(() => {
    table.setPageSize(paginations?paginations[0]:10);
  }, [table,paginations])
  
  //table.setPageSize(2);

  return (
    <div className="w-full">
        {/*<div className="flex items-center justify-end">
        <Button type="button" onClick={store_modal.open}>Create new</Button>
        </div>*/}
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder={filters[filter_type].placeholder} 
          value={(table.getColumn(filters[filter_type].column)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(filters[filter_type].column)?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-4"
        />
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              {filters[filter_type].select_box_name}<ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="ml-4">
            {
                filters.map((pageSize,index) => (
                    <DropdownMenuItem key={pageSize.column} onClick={() => {
                    //table.setPageSize(pageSize);
                    //setVisibleRow(pageSize);
                        set_filter_type(index);
                    }}>
                    {pageSize.select_box_name}
                    </DropdownMenuItem>
                ))
            }    
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button type="button" className="ml-auto" onClick={store_modal.open_update_modal}>Create new</Button>

      </div>
      <div className="rounded-md border">
        <Table className="w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-left">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-left">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {empty_data_message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="">
              Max {visible_row}<ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            
            {
                paginations?.map(pageSize => (
                    <DropdownMenuItem key={pageSize} onClick={() => {
                    table.setPageSize(pageSize);
                    setVisibleRow(pageSize);
                    }}>
                    Max {pageSize}
                    </DropdownMenuItem>
                ))
            }    
          
          </DropdownMenuContent>
        </DropdownMenu>

        </div>
      </div>
    </div>
  )
}
