import { ArrowUpDown, MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  //DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  
} from "@/components/ui/dropdown-menu"
//import { Input } from "@/components/ui/input"
import { ColumnDef } from '@tanstack/react-table'
import { School } from '@prisma/client';
//import { useRouter } from "next/navigation"
//import { useEffect, useState } from "react"
//import useSchoolModalStore from "@/stores/school-settings/use-school-modal-store"
import useSchoolStore from "@/stores/school-settings/use-school-store"
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store"


function BaseSchoolButton1({action,title}:{action:()=>void,title?:string}){
  const store = useBaseSchoolStore();

      return   ( <div className="flex items-center gap-1">
                <span>{store.data?.school_naming}</span>
                <Button 
                    variant="ghost" 
                    className="p-0 h-auto"
                    onClick={action}
                >
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            </div>)

  
}


/*function BaseSchoolButton({action}:{action:()=>void}){
    const store = useBaseSchoolStore();
    return <Button
    variant="ghost"
    onClick={action}
  >
    {store.data?.school_naming}
    <ArrowUpDown />
  </Button>
}*/

/*function ActionButton({action,col,alias=''}:{action:()=>void,col:string,alias?:string}){
  const store = useBaseSchoolStore();
  
      return <div className="flex items-center gap-1"> 
                <span>{store.data ? (store.data as Record<string, any>)[col]+alias : null}</span> 
                <Button 
                    variant="ghost" 
                    className="p-0 h-auto" // Adjust button styling
                    onClick={action}
                >
                    <ArrowUpDown className="h-4 w-4" /> 
                </Button>
            </div>
}*/

function DateButton({action,title}:{action?:()=>void,title?:string}){
  //const store = useBaseSchoolStore();

      return   ( <div className="flex items-center gap-1">
                <span>{title}</span>
                <Button 
                    variant="ghost" 
                    className="p-0 h-auto"
                    onClick={action}
                >
                    <ArrowUpDown className="h-4 w-4" />
                </Button>
            </div>)

  
}


/*function DropdownMenuItemRouting({href,title}:{href:string,title:string}){
    const router = useRouter();
      return (
          <DropdownMenuItem
          onClick={() => {
            router.push(href)
          }}>             
          {title}
      </DropdownMenuItem>
      )
  }*/

  function DropdownMenuItemDelete({title,id}:{title:string,id:string}){
    //const store = useStoreModal();
    //const [loaded,setLoaded] = useState(false);
    //const store_modal = useSchoolModalStore()
    //const base_store = useBaseSchoolStore();
    const store = useSchoolStore();
    //const section_store = useSchoolSectionStore();
    //useEffect(() => {
      //  setLoaded(true);
    //}, []);
    //if(!loaded)
      //return null;
  return (
      <DropdownMenuItem
      onClick={() => {
        store.setId(id);
        store.open_modal();
      }}>             
      {title + " "+store.getOne(id)?.school_name} 
      </DropdownMenuItem>
      )
  }
  
  function DropdownMenuItemUpdate({title,id}:{title:string,id:string}){
    //const store = useStoreModal();
    //const [loaded,setLoaded] = useState(false);
    //const store_modal = useSchoolModalStore();
    //const base_store = useBaseSchoolStore();
    const store = useSchoolStore();
    //useEffect(() => {
        //store.setId(id); 
        //setLoaded(true);
    //}, []);
    //if(!loaded)
      //return null;
    return (
      <DropdownMenuItem
      onClick={() => {
        store.setId(id);
        store.open_update_modal();
        //store_modal.open(); 
      }}>             
      {title + " "+store.getOne(id)?.school_name} 
      </DropdownMenuItem>
      )
  }


export const SchoolColumnsDefinition: ColumnDef<School>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "school_name",
      //header: "Label",
      header: ({ column }) => {
        return (
          <BaseSchoolButton1 action={() => column.toggleSorting(column.getIsSorted() === "asc")} />
        )
    },
      cell: ({ row }) => (
        <div className="text-left capitalize">{row.getValue("school_name")}</div>
      ),  
  },
   /* {
      accessorKey: "store_owner",
      header: "Store Owner",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("store_owner")}</div>
      ),
    },
    {
      accessorKey: "store",
      header: "Store",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("store")}</div>
      ),
    },*/
      {
          accessorKey: "createdAt",
          header: ({column}) => <DateButton title="Created At" action={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
          cell: ({ row }) => {
            const date = String(row.getValue("createdAt"));
            
            // Format the amount as a dollar amount
            const formatted = new Date(date).toLocaleString();
            //date.replaceAll("T", " ").replace(/\..*/, '');
       
            return <div className="text-left font-medium">{formatted}</div>
          },
    },
    {
        accessorKey: "updatedAt",
        header: ({column}) => <DateButton title="Updated At" action={() => column.toggleSorting(column.getIsSorted() === "asc")} />,
        cell: ({ row }) => {
          const date = String(row.getValue("updatedAt"));
          
          // Format the amount as a dollar amount
          const formatted = new Date(date).toLocaleString();
          //date.replaceAll("T", " ").replace(/\..*/, '');
     
          return <div className="text-left font-medium">{formatted}</div>
        },
  },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const school = row.original;
  
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(school.id)}
              >
                Copy ID
              </DropdownMenuItem>
  
              <DropdownMenuItemUpdate title="Update" id={school.id} />
              <DropdownMenuSeparator />
              {/*<DropdownMenuItemRouting href={`/dashboard/${billboard.store_id}}`} title="Go To Store" />*/}
              <DropdownMenuItemDelete title="Delete" id={school.id} />
              <DropdownMenuSeparator />
              {/*<DropdownMenuItemRouting href={`/dashboard/${billboard.store_id}/billboards/${billboard.id}`} title="Go To Billboard" />*/}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  