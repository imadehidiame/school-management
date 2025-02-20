import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from 'react'; // Import React
import { SessionsDataTable } from "@/components/tables/sessions-data-table";
import { SessionsColumnDefinition } from "@/definitions/school/sessions-definitions";
import useSchoolSessionStore from "@/stores/school-settings/use-session-store";


const SessionsComponent: React.FC = () => {
const { sessions } = useSchoolSessionStore();
const [sess_key,set_sess_key] = useState('sess-'+Math.random())
  
  useEffect(()=>{
    set_sess_key('sess-'+Math.random());
  },[sessions]);
    

    

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
                    key={sess_key}
                    data={useSchoolSessionStore.getState().sessions}
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