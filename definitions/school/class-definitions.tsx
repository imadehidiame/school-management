import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
 
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
//import { School,SchoolSections } from '@prisma/client';
//import useSchoolModalStore from "@/stores/use-school-modal-store"
//import useSchoolStore from "@/stores/use-school-store"
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store"
import { ClassData } from "./class-data"
import useClassStore from "@/stores/school-settings/use-class-store"



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
}*/

function SchoolSectionButtonMod({action,col}:{action:()=>void,col:string}){
  const store = useBaseSchoolStore();
  
      return <div className="flex items-center gap-1"> {/* Use flexbox for alignment */}
                <span>{store.data ? (store.data as Record<string, any>)[col] : null}</span> {/* Display the name */}
                <Button 
                    variant="ghost" 
                    className="p-0 h-auto" // Adjust button styling
                    onClick={action}
                >
                    <ArrowUpDown className="h-4 w-4" /> {/* Adjust icon size */}
                </Button>
            </div>
}

function SchoolSectionDateButton({action,title}:{action:()=>void,title:string}){
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
  
  function DropdownMenuItemUpdate({title,id}:{title:string,id:string}){
    //const store = useStoreModal();
    //const [loaded,setLoaded] = useState(false);
    //const store_modal = useSchoolSectionStore();
    //const base_store = useBaseSchoolStore();
    //const store = useSchoolStore();
    //const section_store = useSchoolSectionStore();
    const class_store = useClassStore();
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
      {title + " "+class_store.getOne(id)?.class_name} 
      </DropdownMenuItem>
      )
  }

  function DropdownMenuItemDelete({title,id}:{title:string,id:string}){
    //const store = useStoreModal();
    //const [loaded,setLoaded] = useState(false);
    const store_modal = useClassStore();
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
      {title + " "+store_modal.getOne(id)?.class_name} 
      </DropdownMenuItem>
      )
  }


export const ClassColumnsDefinition: ColumnDef<ClassData>[] = [
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
      accessorKey: "class_section",
      //header: "Label",
      header: ({ column }) => {
        return (
          <SchoolSectionButtonMod action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="section_naming" />
        ) 
    },
      cell: ({ row }) => (
        <div className="text-left capitalize">{row.getValue("class_section")}</div>
      ),  
  },

  {
    accessorKey: "class_name",
    //header: "Label",
    header: ({ column }) => {
      return (
        <SchoolSectionButtonMod action={() => column.toggleSorting(column.getIsSorted() === "asc")} col="class_naming" />
      )
  },
    cell: ({ row }) => (
      <div className="text-left capitalize">{row.getValue("class_name")}</div>
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
  