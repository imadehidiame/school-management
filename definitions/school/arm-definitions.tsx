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
import { ColumnDef } from '@tanstack/react-table'
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store"
import { ArmData } from "./arm-data"
import useArmStore from "@/stores/school-settings/use-arm-store"



/*function BaseSchoolButton({action}:{action:()=>void}){
    const store = useBaseSchoolStore();
    return <Button
    variant="ghost"
    onClick={action}
  >
    {store.data?.section_naming}
    <ArrowUpDown />
  </Button>
}*/

/*function SchoolSectionButton({action}:{action:()=>void}){
    const store = useBaseSchoolStore();
    return <Button
    variant="ghost"
    onClick={action}
  >
    {store.data?.section_naming}
    {<ArrowUpDown />}
  </Button>
}*/

function SchoolSectionButtonMod({action,col,alias=''}:{action:()=>void,col:string,alias?:string}){
    const store = useBaseSchoolStore();
    
        return <div className="flex items-center gap-1"> {/* Use flexbox for alignment */}
                  <span>{store.data ? (store.data as Record<string, any>)[col]+alias : null}</span> {/* Display the name */}
                  <Button 
                      variant="ghost" 
                      className="p-0 h-auto" // Adjust button styling
                      onClick={action}
                  >
                      <ArrowUpDown className="h-4 w-4" /> {/* Adjust icon size */}
                  </Button>
              </div>
  }
  

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
  
  function DropdownMenuItemUpdate({title,id}:{title:string,id:string}){
    //const store = useStoreModal();
    //const [loaded,setLoaded] = useState(false);
    //const store_modal = useSchoolSectionStore();
    //const base_store = useBaseSchoolStore();
    //const store = useSchoolStore();
    //const section_store = useSchoolSectionStore();
    const class_store = useArmStore();
    /*useEffect(() => {
        setLoaded(true);
      
    }, []);*/
  
    
    //if(!loaded)
      //return null;
  
    
    
    return (
      <DropdownMenuItem
      onClick={() => {
        //setting_id();
        class_store.setId(id);
        class_store.open_update_modal(); 
        //console.log('ID value from state variant ',store.id);
        //store.set_id(id);
      }}>             
      {title + " "+class_store.getOne(id)?.arm_name} 
      </DropdownMenuItem>
      )
  }

  function DropdownMenuItemDelete({title,id}:{title:string,id:string}){
    //const store = useStoreModal();
    //const [loaded,setLoaded] = useState(false);
    const store_modal = useArmStore();
    //const base_store = useBaseSchoolStore();
    //const store = useSchoolStore();
    //const section_store = useSchoolSectionStore();
    //useEffect(() => {
        //setLoaded(true);
    //}, []);
  
    //store.set_id(id);
    
    //store?.set_id('1');
  
    //if(!loaded)
      //return null;
  
    
    
    return (
      <DropdownMenuItem
      onClick={() => {

        store_modal.setId(id);
        store_modal.open_modal();
        
      }}>             
      {title + " "+store_modal.getOne(id)?.arm_name} 
      </DropdownMenuItem>
      )
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

export const ArmColumnsDefinition: ColumnDef<ArmData>[] = [
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
      accessorKey: "arm_class",
      //id:'Class',
      //header: "Label",
      header: ({ column }) => {
        return (
          <SchoolSectionButtonMod action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="class_naming" />
        ) 
    },
      cell: ({ row }) => (
        <div className="text-left capitalize">{row.getValue("arm_class")}</div>
      ),  
  },

  {
    accessorKey: "arm_name",
    //id:'Arm',
    //header: "Label",
    header: ({ column }) => {
      return (
        <SchoolSectionButtonMod action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="arm_naming" />
      )
  },
    cell: ({ row }) => (
      <div className="text-left capitalize">{row.getValue("arm_name")}</div>
    ),  
},

{
    accessorKey: "name_alias",
    //id:'Alias',
    //header: "Label",
    header: ({ column }) => {
      return (
        <SchoolSectionButtonMod action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="arm_naming" alias=" alias" />
      )
  },
    cell: ({ row }) => (
      <div className="text-left capitalize">{row.getValue("name_alias")}</div>
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
          //id:'Created At',
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
        //id:'Updated At',
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
        const class_data = row.original;
  
   
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
              <DropdownMenuItemUpdate title="Update" id={class_data.id} />
              <DropdownMenuSeparator />
              <DropdownMenuItemDelete title="Delete" id={class_data.id} />
              {/*<DropdownMenuItemRouting href={`/dashboard/${billboard.store_id}}`} title="Go To Store" />*/}
              
              <DropdownMenuSeparator />
              {/*<DropdownMenuItemRouting href={`/dashboard/${billboard.store_id}/billboards/${billboard.id}`} title="Go To Billboard" />*/}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ] 
  