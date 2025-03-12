"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useVehicleStore from "@/stores/transport/use-vehicle-store";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  empty_data_message: string;
  filters: { column: string; placeholder: string; select_box_name: string }[];
  paginations?: number[];
}

type filtering_type = { 
    
  column: string,
  placeholder: string,
  select_box_name: string,

}

export function VehicleDataTable<TData, TValue>({
  columns,
  data,
  empty_data_message,
  filters,
  paginations,
}: DataTableProps<TData, TValue>) {
  //const store_modal = useParentStore();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    {}
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [visible_row, setVisibleRow] = useState(paginations ? paginations[0] : 10);
  const [filter_type, set_filter_type] = useState(0);
  const [filter_state,set_filter_state] = useState(filters);
  const [base_filter] = useState(filters);
  const [visible_columns,set_visible_columns] = useState(['updatedAt','createdAt','transports','name']);
  

  const filtering = (array:filtering_type[],keys:string[])=>{
    let sliced_array = array.slice();
    keys.forEach(element => {
      sliced_array = sliced_array.slice().filter(e=>{
        return e.column !== element;
      });
    });

    return sliced_array;


    /*return array.slice().filter(e=>{
      let check = true;
      keys.forEach(element => {
        check = check || e.column !== element;
      });
    })*/
  }

  const display_search_filters = ()=>{

  }

  useEffect(()=>{
    const handle_resize = ()=>{
      const window_size = window.innerWidth;
      if(window_size < 640){
        setColumnVisibility({
          updatedAt:false,
          createdAt:false,
          transports:false,
          //phoneNumber:false,
        });
        set_filter_state(filtering(base_filter,['updatedAt','createdAt','transports']));
        set_visible_columns(['name']);
        set_filter_type(0);
      }
      /*else if(window_size <= 500){
        setColumnVisibility({
          updatedAt:false,
          createdAt:false,
          city:false,
          phoneNumber:false,
        });
        set_filter_state(filtering(base_filter,['updatedAt','city','createdAt','phoneNumber']));
        set_visible_columns(['firstName']);
        set_filter_type(0);
      }*/
      else if(window_size >= 640 && window_size < 768){
        setColumnVisibility({
          updatedAt:false,
          createdAt:false,
          //city:false,
          transports:true,
        });
        set_filter_state(filtering(base_filter,['updatedAt','createdAt']));
        set_visible_columns(['name','transports']);
        set_filter_type(0);
      }
      else if(window_size >= 768 && window_size < 1024){
        setColumnVisibility({
          updatedAt:false,
          createdAt:true,
          transports:true,
          //phoneNumber:true,
        });
        set_filter_state(filtering(base_filter,['updatedAt']));
        set_visible_columns(['name','transports','createdAt']);
        set_filter_type(0);
      }

      else if(window_size >= 1024 && window_size < 1280){
        setColumnVisibility({
          updatedAt:false,
          createdAt:true,
          transports:true,
          //phoneNumber:true,
        });
        set_filter_state(filtering(base_filter,['updatedAt']));
        set_visible_columns(['name','transports','createdAt']);
        set_filter_type(0);
      }

      else if(window_size >= 1280 && window_size < 1536){
        setColumnVisibility({
          updatedAt:true,
          createdAt:true,
          //city:true,
          transports:true,
        });
        set_filter_state(filtering(base_filter,[]));
        set_visible_columns(['name','transports','createdAt','updatedAt']);
        set_filter_type(0);
      }

      else if(window_size >= 1536){
        setColumnVisibility({
            updatedAt:true,
            createdAt:true,
            //city:true,
            transports:true,
        });
        set_filter_state(filtering(base_filter,[]));
        set_visible_columns(['name','transports','createdAt','updatedAt']);
        set_filter_type(0);
      }

      /*else if(window_size <= 700){
        setColumnVisibility({
          updatedAt:false,
          createdAt:false,
          city:false,
          phoneNumber:true,
        });
        set_filter_state(filtering(base_filter,['updatedAt','createdAt','city']));
        set_visible_columns(['firstName','phoneNumber']);
        set_filter_type(0);
      }
      else if(window_size <= 800){
        setColumnVisibility({
          updatedAt:false,
          createdAt:false,
          city:false,
          phoneNumber:true,
        });
        set_filter_state(filtering(base_filter,['updatedAt','createdAt','city']));
        set_visible_columns(['firstName','phoneNumber']);
        set_filter_type(0);
      }
      else if(window_size <= 900){
        setColumnVisibility({
          updatedAt:true,
          createdAt:false,
          city:true,
          phoneNumber:true,
        });
        set_filter_state(filtering(base_filter,['createdAt','updatedAt']));
        set_visible_columns(['firstName','phoneNumber','city']);
        set_filter_type(0);
      }
      else if(window_size <= 1000){
        setColumnVisibility({
          updatedAt:true,
          createdAt:false,
          city:true,
          phoneNumber:true,
        });
        set_filter_state(filtering(base_filter,['createdAt']));
        set_visible_columns(['firstName','phoneNumber','city','updatedAt']);
        set_filter_type(0);
      }*/
      else{
        setColumnVisibility({
            updatedAt:true,
            createdAt:true,
            //city:true,
            transports:true,
        });
        set_filter_state(filtering(base_filter,[]));
        set_visible_columns(['name','transports','createdAt','updatedAt']);
        set_filter_type(0);
      }
    }
    handle_resize();
    window.addEventListener('resize',handle_resize);
    return ()=>{
      window.removeEventListener('resize',handle_resize);
    }
  },[]);

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
  });

  useEffect(() => {
    table.setPageSize(paginations ? paginations[0] : 10);
  }, [table, paginations]);

  const filter_defiinitions: Record<string, string> = {
    transports: "Routes",
    name: "Basic Info",
    //city: "City",
    createdAt: "Created At",
    updatedAt: "Updated At",
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col lg:flex-row gap-2 p-2">
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              {filter_state[filter_type].select_box_name} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="ml-4">
            {filter_state.map((pageSize, index) => (
              <DropdownMenuItem
                key={pageSize.column}
                onClick={() => {
                  set_filter_type(index);
                }} 
              >
                {pageSize.select_box_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Input
          placeholder={filter_state[filter_type].placeholder} 
          value={
            (table.getColumn(filter_state[filter_type].column)?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table.getColumn(filter_state[filter_type].column)?.setFilterValue(event.target.value)
          }
          className="w-full lg:max-w-[300px] text-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm">
              Select/Unselect Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide() && visible_columns.includes(column.id) )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize text-sm"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {filter_defiinitions[column.id]
                      ? filter_defiinitions[column.id]
                      : column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button type="button" className="sm:ml-auto text-sm" onClick={() => {
          useVehicleStore.setState({ is_update_modal_open: true });
        }}>
          Create new
        </Button>
      </div>
      <div className="rounded-md border overflow-x-auto w-full">
        <Table className="w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-left text-sm px-2 py-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                    <TableCell key={cell.id} className="text-left text-sm px-2 py-1">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm"
                >
                  {empty_data_message}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-end space-x-2 py-4">
  <div className="flex-1 text-sm text-muted-foreground">
    {table.getFilteredSelectedRowModel().rows.length} of{" "}
    {table.getFilteredRowModel().rows.length} row(s) selected.
  </div>
  <div className="flex flex-row space-x-2"> {/* Modified this div */}
    <Button
      variant="outline"
      size="sm"
      onClick={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
      className="text-sm"
    >
      Previous
    </Button>
    <Button
      variant="outline"
      size="sm"
      onClick={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
      className="text-sm"
    >
      Next
    </Button>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-sm">
          Max {visible_row} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {paginations?.map((pageSize) => (
          <DropdownMenuItem
            key={pageSize}
            onClick={() => {
              table.setPageSize(pageSize);
              setVisibleRow(pageSize);
            }}
          >
            Max {pageSize}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
    </div>
  )
}
