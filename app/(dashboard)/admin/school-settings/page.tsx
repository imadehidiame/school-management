import { prisma } from "@/prisma"
import { SchoolSettingsTab } from "./components/school-settings-tab";
import { SchoolSections } from "@prisma/client";
import { SectionData } from "@/definitions/school/section-data";


export default async function SchoolSettings(){
try {
    
const base_school_data = await prisma.baseSchoolCategory.findFirst();
const school_data = await prisma.school.findMany();
const section_data = (await prisma.schoolSections.findMany({include:{
    school:true
}})).map((e:any)=>{
    if(e)
        e['section_school'] = e.school?.school_name
    return e;
});
const class_data = (await prisma.schoolClasses.findMany({include:{school_section:true}})).map((e:any)=>{ 
    if(e)
        e['class_section'] = e.school_section?.section_name
    return e;
});   

const arm_data = (await prisma.classArms.findMany({include:{school_class:true}})).map((e:any)=>{ 
    if(e)
        e['arm_class'] = e.school_class?.class_name
    return e;
});

const school_sessions = await prisma.schoolSessions.findMany();

return <SchoolSettingsTab base_data={base_school_data} school_data={school_data} section_data={section_data} class_data={class_data} arm_data={arm_data} school_sessions={school_sessions} />;


} catch (error) {
    console.log(error);
    return <div className="p-4">An error occured</div>   
}


}