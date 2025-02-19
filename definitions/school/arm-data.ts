import { SchoolClasses } from "@prisma/client";

export interface ArmData { 
    /**
       school_section: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        section_name: string;
        school_id: string;
    };
} & {
    id: string;
    class_name: string;
    section_id: string;
    createdAt: Date;
    updatedAt: Date;
}) | undefined
     */
    id: string;
    arm_name: string;
    name_alias:string;
    school_class_id: string;
    createdAt: string;
    updatedAt: string;
    arm_class: string;
    school_class: SchoolClasses;
 }