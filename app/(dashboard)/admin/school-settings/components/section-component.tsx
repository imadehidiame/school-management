import { SectionDataTable } from "@/components/tables/section-data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionColumnsDefinition } from "@/definitions/school/section-definitions";
import { School } from "@prisma/client";
import { BaseData } from "../definitions";
import { SectionData } from "@/definitions/school/section-data";

 const SectionComponent:React.FC<{base_data:BaseData,section_data:SectionData[],school_data:School[]}> = ({base_data,section_data,school_data}:{base_data:BaseData,section_data:SectionData[],school_data:School[]}) =>{

    //console.log("Information");
    //console.log({base_data});
    //console.log({schooling_data});
  
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
  
  if(school_data.length < 1)
    return (
      <Card className="w-full">
      <CardHeader>
        <CardTitle>Please Create A {base_data.school_naming} Information</CardTitle>
        <CardDescription>
          Create at least a {base_data.school_naming} information before proceeding to this section
        </CardDescription>
      </CardHeader>
    </Card>
  );
  
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
            <CardTitle>Create {base_data.section_naming} Data</CardTitle>
            <CardDescription>
              Register { base_data.section_naming.toLocaleLowerCase() } information in the database
            </CardDescription>
  
  
          </CardHeader>
  
          
            <CardContent className="space-y-2">
  
              <SectionDataTable
                data={section_data}
                empty_data_message={`No ${base_data.school_naming.toLocaleLowerCase()} information registered yet`}
                filters={[
                  {column:'section_school',placeholder:`Sort by ${base_data.school_naming}`,select_box_name:`${base_data.school_naming} filter`},
                  {column:'section_name',placeholder:`Sort by ${base_data.section_naming}`,select_box_name:`${base_data.section_naming} filter`}
                ]}
                paginations={[10,20]}
                columns={SectionColumnsDefinition}
              />
  
            </CardContent>
             <CardFooter>
          
            </CardFooter>
        </Card>
    )
  }

  export default SectionComponent;