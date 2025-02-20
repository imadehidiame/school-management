import { SectionDataTable } from "@/components/tables/section-data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionColumnsDefinition } from "@/definitions/school/section-definitions";
//import { School } from "@prisma/client";
//import { BaseData } from "../definitions";
//import { SectionData } from "@/definitions/school/section-data";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import { useEffect, useState } from "react";

 const SectionComponent:React.FC = () =>{
  const { data } = useBaseSchoolStore();
  const { schools } = useSchoolStore();
  const { schoolSections } = useSchoolSectionStore();
  const [section_key,set_section_key] = useState('sect-'+Math.random())
  
  useEffect(()=>{
    set_section_key('sect-'+Math.random());
  },[schoolSections]);

    //console.log("Information");
    //console.log({base_data});
    //console.log({schooling_data});
  
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
  
  if(schools.length < 1)
    return (
      <Card className="w-full">
      <CardHeader>
        <CardTitle>Please Create A {data.school_naming} Information</CardTitle>
        <CardDescription>
          Create at least a {data.school_naming} information before proceeding to this section
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
            <CardTitle>Create {data.section_naming} Data</CardTitle>
            <CardDescription>
              Register { data.section_naming.toLocaleLowerCase() } information in the database
            </CardDescription>
  
  
          </CardHeader>
  
          
            <CardContent className="space-y-2">
  
              <SectionDataTable
                key={section_key}
                data={useSchoolSectionStore.getState().schoolSections}
                empty_data_message={`No ${data.school_naming.toLocaleLowerCase()} information registered yet`}
                filters={[
                  {column:'section_school',placeholder:`Sort by ${data.school_naming}`,select_box_name:`${data.school_naming} filter`},
                  {column:'section_name',placeholder:`Sort by ${data.section_naming}`,select_box_name:`${data.section_naming} filter`}
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