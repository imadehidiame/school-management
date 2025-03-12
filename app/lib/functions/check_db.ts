'use server';

import { ITransport, IVehicle } from "@/definitions/transport/interface";
import { prisma } from "@/prisma";

export async function check_db_table(table_name: string,is_single:boolean=true,where:Record<string,any> = {}) {
    let check;
    switch (table_name) {
        case 'user':
            check = is_single ? await prisma.user.findFirst({where}) : await prisma.user.findMany({where})
        break;
        case 'transport':
            check = is_single ? await prisma.transport.findFirst({where}) : await prisma.transport.findMany({where})
        break;
        case 'vehicle':
            check = is_single ? await prisma.vehicle.findFirst({where}) : await prisma.vehicle.findMany({where})
        break;
        // Add more cases for other tables
        default:
            throw new Error(`Table ${table_name} not found`);
    }
    return check;
}

export async function vehicle_transport_data(table_name:string,id?:string,transform?:boolean){
    let result:IVehicle|ITransport|IVehicle[]|ITransport[]|null|[];
    if(table_name =='transport'){
        if(id){
            result = await prisma.transport.findUnique({
                where:{
                    id
                },
                include:{
                    vehicles:{
                        include:{
                            vehicle:true
                        }
                    }
                }
            });
            if(result){
                if(transform){
                    result = Object.assign({},result,{vehicle_ids:result.vehicles.map(e=>e.vehicleId)});
                }
            }    
        }else{
            result =  await prisma.transport.findMany({
                include:{
                    vehicles:{
                        include:{
                            vehicle:true
                        }
                    }
                }
            });
            if(result){
                if(transform){
                    result = result.slice().map(e=>{
                        return Object.assign({},e,{vehicle_ids:e.vehicles.map(r=>r.vehicleId)});
                    });
                }
            }
        }
        return result;
    }else{
        if(id){
            result = await prisma.vehicle.findUnique({
                where:{id},
                include:{
                    transports:{
                        include:{
                            transport:true
                        }
                    }
                }
            });
            if(result){
                if(transform){
                    result = Object.assign({},result,{trans:result?.transports.map(e=>e.transportId)}); 
                }
            }
            
        }else{
            result = await prisma.vehicle.findMany({
                include:{
                    transports:{
                        include:{
                            transport:true
                        }
                    }
                }
            });  
            if(result){
                if(transform){
                    result = result.slice().map(e=>{
                        return Object.assign({},e,{trans:e.transports.map(r=>r.transportId)});
                    })
                }
            } 
        }
     return result;
    }
}
