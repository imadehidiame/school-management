import ErrorPage from "@/components/error-page";
import { prisma } from "@/prisma";
//import Parents from "./components/parents";
import Vehicles from "../components/vehicles";

export default async function VehiclesPage(){
    try {
    
        const vehicles = (await prisma.vehicle.findMany({
            include:{
                transports:{
                    include:{
                        transport:true
                    }
                }
            }
        })).map(e=>{
            return Object.assign({},e,{trans:e.transports.map(t=>t.transport.id)});
        });

        const transports = (await prisma.transport.findMany({
            include:{
                vehicles:{
                    include:{
                        vehicle:true
                    }
                }
            }
        })).map(e=>{
            return Object.assign({},e,{vehicle_ids:e.vehicles.map(v=>v.vehicle.id)})
        })


        return <Vehicles vehicle_data={vehicles} transport_data={transports} />

    } catch (error) {
        console.log(error);
        return <ErrorPage title="Error Page" />
    }
} 