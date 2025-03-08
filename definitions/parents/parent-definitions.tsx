import { ArrowUpDown, Edit, Link2, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
//import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from '@tanstack/react-table'
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import { Parent } from "@prisma/client";
import useParentStore from "@/stores/parents/use-parent-store";
import LoadLink from "@/components/load-link"
import Image from "next/image";


function ColumnHeader({action,col}:{action:()=>void|null|undefined,col:string}){
    const store = useBaseSchoolStore();
    
        return <div className="flex items-center gap-1"> 
                  <span>{col}</span>
                  {
                  action && <Button 
                      variant="ghost" 
                      className="p-0 h-auto"
                      onClick={action}
                  >
                      <ArrowUpDown className="h-4 w-4" />
                  </Button>
                  }
              </div>
  }

export const ParentsColumnsDefinition: ColumnDef<Parent>[] = [
    /*{
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
    },*/
    {
      accessorKey: "firstName",
      //minSize:450,
      header: ({ column }) => {
        return (
          <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="Basic Info" />
        ) 
    },
      cell: ({ row }) => {
        const {photo,firstName,lastName,email} = row.original;
        return (
        
            <div className="flex items-center">
  {/*<div className="hidden sm:block w-10 h-10 rounded-full mr-2 relative">
    <Image
      src={(photo as string).split('<=>')[0]}
      alt={`${firstName}'s avatar`}
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-full"
    />
  </div>*/}

  <div className="hidden sm:block relative w-10 h-10 rounded-full mr-2">
    <Image
      src={(photo as string).split('<=>')[0]}
      alt={`${firstName}'s avatar`}
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-full"
    />
  </div>

  <div>
    <div className="font-semibold capitalize">{firstName + ' ' + lastName}</div>
    <div className="text-sm text-gray-600">{email}</div> 
  </div>
</div>

      )},  
  },

  {
    accessorKey: "phoneNumber",
    //minSize:150,
    //header: "Label",
    header: ({ column }) => {
      return (
        <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="Phone Number" />
      )
  },
    cell: ({ row }) => {
      const {phoneNumber} = row.original;
      return (
      
      <div className="md:block text-left capitalize">{phoneNumber}</div>
    )
  },  
}, 

{
    accessorKey: "city",
    //minSize:150,
    //header: "Label",
    header: ({ column }) => {
      return (
        <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="City" />
      )
  },
    cell: ({ row }) => (
      <div className="md:block text-left capitalize">{row.getValue("city")}</div>
    ),  
},
      {
          accessorKey: "createdAt",
          minSize:250,
          header: ({column}) => <ColumnHeader action={()=>column.toggleSorting(column.getIsSorted() === 'asc')} col="Created At" />,
          cell: ({ row }) => {
            const date = String(row.getValue("createdAt"));
            const formatted = new Date(date).toLocaleString();
            return <div className="md:block text-left font-medium">{formatted}</div>
          },
    },
    {
        accessorKey: "updatedAt",
        //minSize:250,
        header: ({column}) => <ColumnHeader action={()=>column.toggleSorting(column.getIsSorted() === 'asc')} col="Updated At" />,
        cell: ({ row }) => {
          const date = String(row.getValue("updatedAt"));
          const formatted = new Date(date).toLocaleString();
          return <div className="md:block text-left font-medium">{formatted}</div>
        },
  },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const {id} = row.original;
        
        return (

            <div className="flex items-center gap-1"> {/* Use flexbox to arrange icons horizontally */}
                <Button
                    variant={"info"}
                    size="small_icon"
                    className="rounded-full"
                    onClick={() => {
                        useParentStore.setState({id});
                        useParentStore.getState().open_update_modal();
                        //await useSchoolSessionStore.getState().update_session(sessionData.id);
                    }}
                >    <Edit className="h-2 w-2" />
                </Button> 

                
 
                <Button
                    variant="destructive"
                    size={'small_icon'}  
                    className="rounded-full"
                    onClick={() => {
                        useParentStore.setState({id});
                        useParentStore.setState({is_modal_open:true});
                        //useArmStore().setId(sessionData.id);
                        //useArmStore().open_modal();
                    }}
                >
                    <Trash className="h-2 w-2" /> 
                </Button>

                <LoadLink href={'/admin/parents/'+id}>
                    <Button type="button" variant={'success'} className="rounded-full" size={'small_icon'}>
                                <Link2 className="h-2 w-2" />
                      </Button>
                </LoadLink>


            </div>

        );
   
        
      },
    },
  ] 
  