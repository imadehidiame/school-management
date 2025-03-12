'use client';
import { VehicleDataTable } from "@/components/tables/transport/vehicle-data-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ITransport, IVehicle } from "@/definitions/transport/interface";
import { VehiclesColumnsDefinition } from "@/definitions/transport/vehicle-definitions";
import useTransportStore from "@/stores/transport/use-route-store";
import useVehicleStore from "@/stores/transport/use-vehicle-store";
import { useEffect, useState } from "react";



export default function Vehicles({vehicle_data,transport_data}:{vehicle_data:IVehicle[],transport_data:ITransport[]}){
    const { vehicles } = useVehicleStore();
    const [table_key,set_table_key] = useState(new Date().getTime());
    useEffect(()=>{
        useVehicleStore.setState({vehicles:vehicle_data});
    },[vehicle_data]);

    useEffect(()=>{
        //useVehicleStore.setState({vehicles:vehicle_data});
        useTransportStore.setState({transports:transport_data})
    },[transport_data]);

    useEffect(()=>{
        set_table_key(new Date().getTime());
    },[vehicles]);

    /*useEffect(()=>{
        const delete_cloudinary = async ()=>{
            await delete_cloudinary_file('Screen_Shot_2023-02-20_at_5.44.45_PM_u8jdth');
        }
        delete_cloudinary();
    },[]);*/


    
    return (
        <Card className="w-full"> 
            <CardHeader>
                <CardTitle>Create Vehicle Data</CardTitle>
                <CardDescription>
                    Register vehicle information in the database.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <VehicleDataTable
                    key={table_key}
                    data={useVehicleStore.getState().vehicles}
                    empty_data_message={`No vehicle information registered yet`}
                    filters={[
                        {
                            column: 'name',
                            placeholder: `Searching by name`,
                            select_box_name: `Name filter`,
                        },
                        {
                            column: 'transports',
                            placeholder: `Searching by routes`,
                            select_box_name: `Routes filter`,
                        },
                        {
                            column: 'createdAt',
                            placeholder: `Searching by Date`,
                            select_box_name: `Date filter`,
                        },
                    ]}
                    paginations={[10, 20]}
                    columns={VehiclesColumnsDefinition}
                />
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>
    );

}