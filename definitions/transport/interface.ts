import { Transport as TransportData,Vehicle as VehicleData } from "@prisma/client"
export interface ITransport extends TransportData{
    vehicles:{vehicle:VehicleData,vehicleId:string}[];
    vehicle_ids?:string[]
}

export interface IVehicle extends VehicleData {
    transports:{transport:TransportData,transportId:string}[];
    trans?:string[]
}
