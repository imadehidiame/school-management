import { SchoolDataTable } from "@/components/tables/school-data-table"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { SchoolColumnsDefinition } from "@/definitions/school/school-definitions"
import { BaseSchoolCategory, School } from "@prisma/client"
import { BaseData } from "../definitions"


const SchoolComponent:React.FC<{base_data:BaseData,school_data:School[]}> = ({base_data,school_data}:{base_data:BaseData,school_data:School[]}) =>{

    if(!base_data)
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
            <CardTitle>Create {base_data.school_naming} Data</CardTitle>
            <CardDescription>
              Register { base_data.school_naming.toLocaleLowerCase() } information in the database
            </CardDescription>
  
  
          </CardHeader>
  
          
            <CardContent className="space-y-2">
  
              <SchoolDataTable 
              data={school_data}
              empty_data_message={`No ${base_data.school_naming.toLocaleLowerCase()} information registered yet`}
              filters={[
                {column:'school_name',placeholder:`Search by ${base_data.school_naming}`,select_box_name:`${base_data.school_naming} filter`}
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