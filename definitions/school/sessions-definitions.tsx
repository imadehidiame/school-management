import { ArrowUpDown, ChevronDown, MoreHorizontal, Trash, Edit, CheckCircle } from "lucide-react"

 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  //DropdownMenu,
  //DropdownMenuCheckboxItem,
  //DropdownMenuContent,
  DropdownMenuItem,
  //DropdownMenuLabel,
  //DropdownMenuSeparator,
  //DropdownMenuTrigger,
  
} from "@/components/ui/dropdown-menu"
//import { Input } from "@/components/ui/input"
import { ColumnDef } from '@tanstack/react-table'
import { SchoolSessions } from '@prisma/client';
import { useRouter } from "next/navigation"
import { useState } from "react"
//import useSchoolModalStore from "@/stores/use-school-modal-store"
//import useSchoolStore from "@/stores/use-school-store"
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store"
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store"
//import useSectionModalStore from "@/stores/use-section-modal-store"
//import { SectionData } from "./section-data"
//import { ClassData } from "./class-data"
//import useClassStore from "@/stores/school-settings/use-class-store"
//import { ArmData } from "./arm-data"
import useArmStore from "@/stores/school-settings/use-arm-store"
import useSchoolSessionStore from "@/stores/school-settings/use-session-store"



/*function BaseSchoolButton({action}:{action:()=>void}){
    const store = useBaseSchoolStore();
    return <Button
    variant="ghost"
    onClick={action}
  >
    {store.data?.section_naming}
    <ArrowUpDown />
  </Button>
}

function SchoolSectionButton({action}:{action:()=>void}){
    const store = useBaseSchoolStore();
    return <Button
    variant="ghost"
    onClick={action}
  >
    {store.data?.section_naming}
    {<ArrowUpDown />}
  </Button>
}

function SchoolSectionButtonMod({action,col,alias=''}:{action:()=>void,col:string,alias?:string}){
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
  

/*function SchoolSectionButtonMod({action,col,alias=''}:{action:()=>void,col:string,alias?:string}){
  const store = useBaseSchoolStore();
  
  return <Button
  variant="ghost"
  onClick={action}
>
  {store.data ? (store.data as Record<string, any>)[col]+alias : null}
  {<ArrowUpDown />}
</Button>
}*/

function SchoolSectionDateButton({action,title}:{action:()=>void,title:string}){
    const store = useBaseSchoolStore();
  
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

  const update_session = async(id:string)=>{
    await useSchoolSessionStore.getState().update_session(id);
  }


  

  /**
   id: string;
       arm_name: string;
       name_alias:string;
       school_class_id: string;
       createdAt: string;
       updatedAt: string;
       arm_class: string;
       school_class: SchoolClasses;
   */

export const SessionsColumnDefinition: ColumnDef<SchoolSessions>[] = [
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
        accessorKey: "session",
        header: ({column}) => <SchoolSectionDateButton action={()=>column.toggleSorting(column.getIsSorted() === 'asc')} title="Session" />,
        cell: ({ row }) => {
          
          return <div className="text-left font-medium">{row.getValue('session')}</div>
        },
  },
      {
          accessorKey: "createdAt",
          header: ({column}) => <SchoolSectionDateButton action={()=>column.toggleSorting(column.getIsSorted() === 'asc')} title="Created At" />,
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
        header: ({column}) => <SchoolSectionDateButton action={()=>column.toggleSorting(column.getIsSorted() === 'asc')} title="Updated At" />,
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
        const sessionData = row.original;
        const is_selected = sessionData.is_selected === 1;
        //const isSelected = row.getIsSelected(); // Check if the row is selected

        return (
            <div className="flex items-center gap-2"> {/* Use flexbox to arrange icons horizontally */}
                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={async () => {
                        await useSchoolSessionStore.getState().update_session(sessionData.id);
                    }}
                >    <Edit className="h-4 w-4 text-blue-500 hover:text-blue-700" />
                </Button> 

                <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => {
                        useSchoolSessionStore.setState({id:sessionData.id});
                        useSchoolSessionStore.setState({is_delete_modal_open:true});
                        //useArmStore().setId(sessionData.id);
                        //useArmStore().open_modal();
                    }}
                >
                    <Trash className="h-4 w-4 text-red-500 hover:text-red-700" /> {/* Delete icon */}
                </Button>

                {is_selected && (
                    <CheckCircle className="h-6 w-6 text-green-500" /> // Selected indicator icon
                )}
            </div>
        );
    },
},
  ] 
  