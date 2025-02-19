import { SchoolSections } from "@prisma/client";

export interface ClassData { 
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
    class_name: string;
    section_id: string;
    createdAt: string;
    updatedAt: string;
    class_section: string;
    school_section: SchoolSections;
 }