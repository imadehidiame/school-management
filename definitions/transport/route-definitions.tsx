import { ArrowUpDown, Edit, Link2, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ColumnDef } from '@tanstack/react-table'
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import LoadLink from "@/components/load-link"
//import Image from "next/image";
import useTransportStore from "@/stores/transport/use-route-store";
import { ITransport } from "./interface";





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

export const TransportColumnsDefinition: ColumnDef<ITransport>[] = [
    {
      accessorKey: "route",
      header: ({ column }) => {
        return (
          <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="Route" />
        ) 
    },
      cell: ({ row }) => {
        return <div className="md:block text-left font-medium">{row.original.route}</div>
      },  
  },

  {
    id:'vehicles',
    filterFn:(row,id,value)=>{
        const vehicles = row.original.vehicles.map(
            (vehicle) => vehicle.vehicle.name 
          );
          return vehicles.join(", ").toLowerCase().includes(value.toLowerCase());
    },
    sortingFn:(rowA,rowB)=>{
        const rowAVehicles = rowA.original.vehicles.map(trans=>trans.vehicle.name.toLocaleLowerCase()).join(', ');
        const rowBVehicles = rowB.original.vehicles.map(trans=>trans.vehicle.name.toLocaleLowerCase()).join(', ');
        return rowAVehicles.localeCompare(rowBVehicles);
    },
    header: ({ column }) => {
      return (
        <ColumnHeader action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="Vehicles" />
      )
  },
    cell: ({ row }) => {
      const {vehicles} = row.original;
      return (
      
      <div className="md:block text-left capitalize">
        {
        vehicles.map(transport=>(<span key={transport.vehicle.id} className="text-sm">{transport.vehicle.name}</span>))
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
                        useTransportStore.getState().setId(id);
                        useTransportStore.getState().open_update_modal();
                        //await useSchoolSessionStore.getState().update_session(sessionData.id);
                    }}
                >    <Edit className="h-2 w-2" />
                </Button> 

                
 
                <Button
                    variant="destructive"
                    size={'small_icon'}  
                    className="rounded-full"
                    onClick={() => {
                      useTransportStore.setState({id});
                      useTransportStore.setState({is_modal_open:true});
                        //useArmStore().setId(sessionData.id);
                        //useArmStore().open_modal();
                    }}
                >
                    <Trash className="h-2 w-2" /> 
                </Button>

                <LoadLink href={'/admin/transportation/'+id}>
                    <Button type="button" variant={'success'} className="rounded-full" size={'small_icon'}>
                                <Link2 className="h-2 w-2" />
                      </Button>
                </LoadLink>


            </div>

        );
   
        
      },
    },
  ] 
  