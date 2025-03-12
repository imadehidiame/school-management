import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { vehicle_transport_data } from "@/app/lib/functions/check_db";
import { IVehicle } from "@/definitions/transport/interface";
import axios from "axios";



const form_schema = z.object({
    name:z.string().nonempty({message:`Please enter the name of vehicle`}).trim(),
    photo:z.string().nonempty({message:`Please upload image of vehicle`}).trim(),
    trans:z.array(z.string()).nullable(),
    plate_no:z.string().nonempty({message:`Please enter vehicle plate number`}).trim(),
});

8
export async function PATCH(req:Request,{ params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access deni8ied and not authorized'});

    const valid_data = form_schema.safeParse(await req.json());

    if(!valid_data.success)
        return NextResponse.json({data:valid_data.error.flatten().fieldErrors},{status:201,statusText:'validation'});

    const {id} = await params;
    try {

        const existing = (await vehicle_transport_data('vehicle',id,true));
    
        if(!existing)
            return NextResponse.json({data:'Invlid ID sent for update'},{status:201,statusText:'invalid_update'});   
        
        const existing_data = (existing as IVehicle).trans?.slice();
        //existing [1,2,3] submitted [4,1,3]
        let popped_data = existing_data?.filter(v=>!valid_data.data.trans?.includes(v));
    
        let pushed_data = valid_data.data.trans?.filter(v=>!existing_data?.includes(v));

        if(valid_data.data.trans?.length === 0){
            pushed_data = [];
            popped_data = existing_data?.slice();
        }
        const {name,plate_no,photo} = valid_data.data;
        const vehicle = await prisma.vehicle.update({
            where: { id },
            data: {
              name,
              photo,
              plate_no,
              transports: {
                connect: pushed_data?.map((transportId) => ({
                  vehicleId_transportId: {
                    transportId : transportId,
                    vehicleId: id, 
                  },
                })),
                disconnect: popped_data?.map((transportId) => ({
                  vehicleId_transportId: {
                    transportId : transportId,
                    vehicleId: id,
                  },
                })),
              },
            },
            include: { transports: { include: { transport: true } } },
          });
        
    
   
          return NextResponse.json({vehicle:Object.assign({},vehicle,{trans:vehicle.transports.map(e=>e.transportId)})},{status:200});        
        //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error:unknown) {
        if(error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientInitializationError || error instanceof PrismaClientUnknownRequestError || error instanceof PrismaClientValidationError || error instanceof PrismaClientRustPanicError){
            console.log('Prisma error api/create-school-naming route: ',error.name,': ',error.message);
            console.log(error);
            return NextResponse.json({data:'DB error'},{status:201,statusText:'Information could not be saved on the server'});
        }
        if(error instanceof Error){

            switch (error.cause) {
                case 'authorization_error':
                return NextResponse.json({data:'Not authorized'},{status:403,statusText:'Access denied for an authorization error'});
                //break;
                case 'authentication_error':
                return NextResponse.json({data:'Not authenticated'},{status:401,statusText:'Access denied for an authentication error'});
                //break;
                case 'duplicate':
                return NextResponse.json({data:error.message},{status:201,statusText:error.message});
                //break;
                case 'email_unsent':
                return NextResponse.json({data:'Account not created because email could not be sent'},{status:201,statusText:'Email not sent'});
                //break;
                default:
                return NextResponse.json({data:'server error'},{status:500,statusText:error ? error?.message as string:'Server error'});
                //break;
            }

        

        }
        if(error instanceof Error){
        console.log('Error saving information from api/create-school-naming route ',error);
        return NextResponse.json({data:error ? error?.message:'Server error'},{status:201,statusText:error ? error?.message:'Server error'});
        }
        
    }
}
 
export async function DELETE(req:NextRequest,{ params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    const {id} = await params;
    
    

    try {
        let existing = await vehicle_transport_data('vehicle',id);
        if(!existing)
            return NextResponse.json({data:'Invlid ID sent for delete operation'},{status:201,statusText:'invalid_update'});   

        await axios.delete(`/api/cloudinary/${(existing as IVehicle).photo.split('<=>')[1]}`);
        
        await prisma.vehicle.delete({
                 where: { id },
         });
         

        return NextResponse.json({logged:true,vehicles:await vehicle_transport_data('vehicle','',true),transports:await vehicle_transport_data('transport','',true)},{status:200});
        //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error:unknown) {
        if(error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientInitializationError || error instanceof PrismaClientUnknownRequestError || error instanceof PrismaClientValidationError || error instanceof PrismaClientRustPanicError){
            console.log('Prisma error api/create-school-naming route: ',error.name,': ',error.message);
            console.log(error);
            return NextResponse.json({data:'DB error'},{status:201,statusText:'Information could not be saved on the server'});
        }
        if(error instanceof Error){

            switch (error.cause) {
                case 'authorization_error':
                return NextResponse.json({data:'Not authorized'},{status:403,statusText:'Access denied for an authorization error'});
                //break;
                case 'authentication_error':
                return NextResponse.json({data:'Not authenticated'},{status:401,statusText:'Access denied for an authentication error'});
                //break;
                case 'duplicate':
                return NextResponse.json({data:error.message},{status:201,statusText:error.message});
                //break;
                case 'email_unsent':
                return NextResponse.json({data:'Account not created because email could not be sent'},{status:201,statusText:'Email not sent'});
                //break;
                default:
                return NextResponse.json({data:'server error'},{status:500,statusText:error ? error?.message as string:'Server error'});
                //break;
            }

        }
        if(error instanceof Error){
            console.log('Error saving information from api/create-school-naming route ',error);
        return NextResponse.json({data:error ? error?.message:'Server error'},{status:201,statusText:error ? error?.message:'Server error'});
        }
        
    }
}

