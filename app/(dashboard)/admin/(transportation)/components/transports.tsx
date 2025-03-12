'use client';
import { RouteDataTable } from "@/components/tables/transport/route-data-table";
//import { VehicleDataTable } from "@/components/tables/transport/vehicle-data-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ITransport, IVehicle } from "@/definitions/transport/interface";
import { TransportColumnsDefinition } from "@/definitions/transport/route-definitions";
//import useParentStore from "@/stores/parents/use-parent-store";
//import { VehiclesColumnsDefinition } from "@/definitions/transport/vehicle-definitions";
import useTransportStore from "@/stores/transport/use-route-store";
import useVehicleStore from "@/stores/transport/use-vehicle-store";
import { useEffect, useState } from "react";


export default function Transports({vehicle_data,transport_data}:{vehicle_data:IVehicle[],transport_data:ITransport[]}){
    const { vehicles } = useVehicleStore();
    const { transports  } = useTransportStore();
    const [table_key,set_table_key] = useState(new Date().getTime());
    useEffect(()=>{
        useVehicleStore.setState({vehicles:vehicle_data});
    },[vehicle_data]);

    useEffect(()=>{
        //useVehicleStore.setState({vehicles:vehicle_data});
        useTransportStore.setState({transports:transport_data});
    },[transport_data]);

    useEffect(()=>{
        set_table_key(new Date().getTime());
    },[vehicles,transports]);

    return (
        <Card className="w-full"> 
            <CardHeader>
                <CardTitle>Create Bus Route Data</CardTitle>
                <CardDescription>
                    Register bus route information in the database.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
                <RouteDataTable
                    key={table_key}
                    data={useTransportStore.getState().transports}
                    empty_data_message={`No route information registered yet`}
                    filters={[
                        {
                            column: 'route',
                            placeholder: `Searching by route`,
                            select_box_name: `Route filter`,
                        },
                        {
                            column: 'vehicles',
                            placeholder: `Searching by vehicles`,
                            select_box_name: `Vehicles filter`,
                        },
                        {
                            column: 'createdAt',
                            placeholder: `Searching by Date`,
                            select_box_name: `Date filter`,
                        },
                    ]}
                    paginations={[10, 20]}
                    columns={TransportColumnsDefinition}
                />
            </CardContent>
            <CardFooter /> {/* Empty CardFooter */}
        </Card>
    );
}