import { SchoolDataTable } from "@/components/tables/school-data-table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { SchoolColumnsDefinition } from "@/definitions/school/school-definitions"
//import { School } from "@prisma/client"
//import { BaseData } from "../definitions"
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store"
import useSchoolStore from "@/stores/school-settings/use-school-store"
import { useState, useEffect } from "react"


const SchoolComponent:React.FC = () =>{

  const { data } = useBaseSchoolStore(); 
  const { schools } = useSchoolStore();
  const [sch_key,set_sch_key] = useState('sch-'+Math.random())
    
    useEffect(()=>{
      set_sch_key('sch-'+Math.random());
    },[schools]);

    if(!data)
    return (
      <Card className="w-[50%]">
      <CardHeader>
        <CardTitle>Please Create School Naming Conventions</CardTitle>
        <CardDescription>
          Create naming conventions for schools, sections, classes and arms before proceeding to this section
        </CardDescription>
      </CardHeader>
    </Card>
  )
  
    return (
      /**
       <DataTableUpdate 
              columns={columns} 
              data={data} 
              empty_data_message="No billboards registered yet" 
              filters={[
                  {column:"store",placeholder:"Filter by store"},
                  {column:"label",placeholder:"Filter by billboard label"},
              ]} 
              paginations={[10,20]}
          />
       */
  
          
  
          <Card className="w-full">
          <CardHeader>
            <CardTitle>Create {data.school_naming} Data</CardTitle>
            <CardDescription>
              Register { data.school_naming.toLocaleLowerCase() } information in the database
            </CardDescription>
  
  
          </CardHeader>
  
          
            <CardContent className="space-y-2">
  
              <SchoolDataTable 
              key={sch_key}
              data={useSchoolStore.getState().schools}
              empty_data_message={`No ${data.school_naming.toLocaleLowerCase()} information registered yet`}
              filters={[
                {column:'school_name',placeholder:`Search by ${data.school_naming}`,select_box_name:`${data.school_naming} filter`}
              ]}
              paginations={[10,20]}
              columns={SchoolColumnsDefinition} 
              />
            
            </CardContent>
             <CardFooter>
          
            </CardFooter>
        </Card>
    )
  }

  export default SchoolComponent;