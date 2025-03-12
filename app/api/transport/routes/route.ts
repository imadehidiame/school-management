import { NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { z } from "zod";
import { check_db_table } from "@/app/lib/functions/check_db";
//import { send_registration_mail } from "@/app/lib/functions/send_email";

export async function GET(){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    const find = await prisma.baseSchoolCategory.findFirst({
        select:{ 
            
            school_naming:true,
            section_naming:true,
            class_naming:true,
            arm_naming:true
        }
    });
    return NextResponse.json({find},{status:200});
}

const form_schema = z.object({
    route:z.string().nonempty({message:`Please enter the name of route`}).trim(),
    vehicle_ids:z.array(z.string()).nullable(),
});



export async function POST(req:Request){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});

    const form_data = await req.json();

    const valid_form_data = form_schema.safeParse(form_data);
    
    if(!valid_form_data.success)
    return NextResponse.json({data:valid_form_data.error.flatten().fieldErrors},{status:201,statusText:'validation'});
    //throw new Error(JSON.stringify(valid_form_data.error),{cause:'validation'});

    console.log('Serverd data ',valid_form_data.data);

    if(await check_db_table('transport',true,{route:valid_form_data.data.route})){
        throw new Error(JSON.stringify({route:[valid_form_data.data.route+' has already been registered']}),{cause:'duplicate_data'});
    }


    //console.log({arm_name,school_class_id,name_alias});
    try {

        const { data } = valid_form_data;

        const transport = await prisma.transport.create({
          data:{
            route:data.route,
            vehicles:{
                create:data.vehicle_ids?.map(e=>({vehicleId:e}))
            }
        },
        include:{
            vehicles:{
                include:{
                    vehicle:true
                }
            }
        }
        });
        return NextResponse.json({transport:Object.assign({},transport,{vehicle_ids:transport.vehicles.map(e=>e.vehicleId)})},{status:200});    
        
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
                case 'duplicate_data':
                return NextResponse.json({data:JSON.parse(error.message)},{status:201,statusText:'duplicate_data'});
                case 'validation':
                return NextResponse.json({data:JSON.parse(error.message)},{status:201,statusText:'validation'});
                //break;
                //case 'email_unsent':
                //return NextResponse.json({data:'Account not created because email could not be sent'},{status:201,statusText:'Email not sent'});
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


//ik8yik8,ik,