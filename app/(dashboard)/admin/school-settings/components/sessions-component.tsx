//import { SectionDataTable } from "@/components/tables/section-data-table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
//import { SectionColumnsDefinition } from "@/definitions/school/section-definitions";
import {  SchoolSessions } from "@prisma/client"; // Import necessary types
//import { BaseData } from "../definitions";
//import { SectionData } from "@/definitions/school/section-data";
//import { ClassData } from "@/definitions/school/class-data";
//import { ClassDataTable } from "@/components/tables/class-data-table";
import React from 'react'; // Import React
//import { ClassColumnsDefinition } from "@/definitions/school/class-definitions";
//import { ArmColumnsDefinition } from "@/definitions/school/arm-definitions";
//import { ArmData } from "@/definitions/school/arm-data";
//import { ArmDataTable } from "@/components/tables/arm-data-table";
import { SessionsDataTable } from "@/components/tables/sessions-data-table";
import { SessionsColumnDefinition } from "@/definitions/school/sessions-definitions";

interface ClassComponentProps {
    sessions: SchoolSessions[];
}

const SessionsComponent: React.FC<ClassComponentProps> = ({ sessions }) => {

    

    

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Create School Session(s)</CardTitle>
                <CardDescription>
                    Register session information in the database.
                </CardDescription>
            </CardHeader>
 
            <CardContent className="space-y-2">
                <SessionsDataTable
                    data={sessions}
                    empty_data_message={`No session information registered yet`}
                    filters={[
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
                        {
                            column: 'session',
                            placeholder: `Search by session`,
                            select_box_name: `Session filter`,
                        }
                    ]}
                    paginations={[10, 20]}
                    columns={SessionsColumnDefinition}
                />
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>
    );
};

export default SessionsComponent;