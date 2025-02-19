import { School } from "@prisma/client";

export interface SectionData {  
    id: string;
    section_name: string;
    school_id: string;
    createdAt: string;
    updatedAt: string; 
    section_school: string;
    school?:School
}