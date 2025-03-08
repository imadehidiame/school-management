'use client';
import { ParentDataTable } from "@/components/tables/parent-data-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ParentsColumnsDefinition } from "@/definitions/parents/parent-definitions";
import { delete_cloudinary_file } from "@/lib/axios_request";
import useParentStore from "@/stores/parents/use-parent-store";
import { Parent } from "@prisma/client";
import { useEffect, useState } from "react";


export default function Parents({parents_data}:{parents_data:Parent[]}){
    const { parents } = useParentStore();
    const [table_key,set_table_key] = useState(new Date().getTime());
    useEffect(()=>{
        useParentStore.setState({parents:parents_data});
    },[parents_data]);

    useEffect(()=>{
        set_table_key(new Date().getTime());
    },[parents]);

    /*useEffect(()=>{
        const delete_cloudinary = async ()=>{
            await delete_cloudinary_file('Screen_Shot_2023-02-20_at_5.44.45_PM_u8jdth');
        }
        delete_cloudinary();
    },[]);*/


    
    return (
        <Card className="w-full"> 
            <CardHeader>
                <CardTitle>Create Parent/Guardian Data</CardTitle>
                <CardDescription>
                    Register parent information in the database.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <ParentDataTable
                    key={table_key}
                    data={useParentStore.getState().parents}
                    empty_data_message={`No parent/guardian information registered yet`}
                    filters={[
                        {
                            column: 'firstName',
                            placeholder: `Searching by name`,
                            select_box_name: `Name filter`,
                        },
                        {
                            column: 'phoneNumber',
                            placeholder: `Searching by phone number`,
                            select_box_name: `Phone number filter`,
                        },
                        {
                            column: 'city',
                            placeholder: `Searching by city`,
                            select_box_name: `City filter`,
                        },
                        {
                            column: 'createdAt',
                            placeholder: `Searching by Date`,
                            select_box_name: `Date filter`,
                        },
                    ]}
                    paginations={[10, 20]}
                    columns={ParentsColumnsDefinition}
                />
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>
    );

}