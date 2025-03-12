import { ArrowUpDown, Edit, Link2, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from '@tanstack/react-table'
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import { Vehicle,Transport } from "@prisma/client";
import useVehicleStore from "@/stores/transport/use-vehicle-store";
import LoadLink from "@/components/load-link"
import Image from "next/image";

interface VehicleProps extends Vehicle {
    transports:{transport:Transport}[];
}

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

export const VehiclesColumnsDefinition: ColumnDef<VehicleProps>[] = [
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
      accessorKey: "name",
      filterFn:(row,col_id,value)=>{
        const {name,plate_no} = row.original;
        return `${name}, ${plate_no}`.toLocaleLowerCase().includes(value.toLocaleLowerCase());
      },
      //minSize:450,
      header: ({ column }) => {
        return (
          <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="Basic Info" />
        ) 
    },
      cell: ({ row }) => {
        const {photo,name,plate_no} = row.original;
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

  <div className="hidden sm:block relative w-30 h-30 rounded-lg mr-2">
    <Image
      src={(photo as string).split('<=>')[0]} 
      alt={`${name}'s avatar`}
      fill
      style={{ objectFit: 'cover' }}
      className="rounded-lg"
      sizes="120px"
    />
  </div>

  <div>
    <div className="font-semibold capitalize">{name}</div>
    <div className="text-sm text-gray-600">{plate_no}</div> 
  </div>
</div>

      )},  
  },

  {
    //accessorKey: "transports.transport.route",
    id:'transports',
    //minSize:150,
    //header: "Label",
    filterFn:(row,id,value)=>{
        const routes = row.original.transports.map(
            (transport) => transport.transport.route
          );
          return routes.join(", ").toLowerCase().includes(value.toLowerCase());
    },
    sortingFn:(rowA,rowB)=>{
        const rowARoutes = rowA.original.transports.map(trans=>trans.transport.route.toLocaleLowerCase()).join(', ');
        const rowBRoutes = rowB.original.transports.map(trans=>trans.transport.route.toLocaleLowerCase()).join(', ');
        return rowARoutes.localeCompare(rowBRoutes);
    },
    header: ({ column }) => {
      return (
        <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="Routes" />
      )
  },
    cell: ({ row }) => {
      const {transports} = row.original;
      return (
      
      <div className="md:block text-left capitalize">
        {
        transports.map(transport=>(<span key={transport.transport.id} className="text-sm">{transport.transport.route}</span>))
        }
      </div>
    )
  },  
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
                        useVehicleStore.getState().setId(id);
                        useVehicleStore.getState().open_update_modal();
                        //await useSchoolSessionStore.getState().update_session(sessionData.id);
                    }}
                >    <Edit className="h-2 w-2" />
                </Button> 

                
 
                <Button
                    variant="destructive"
                    size={'small_icon'}  
                    className="rounded-full"
                    onClick={() => {
                        useVehicleStore.setState({id});
                        useVehicleStore.setState({is_modal_open:true});
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
  