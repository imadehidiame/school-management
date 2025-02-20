import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";






export async function PATCH(req:Request,{ params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access denied and not authorized'});
    const {arm_name,school_class_id,name_alias} = await req.json();
    const {id} = await params;
    console.log('Update value ',{arm_name,school_class_id,name_alias});

    
    try {

        const find = await prisma.classArms.findFirst({
            select:{ 
                id:true 
            },
            where:{
                id
            }
        });
        if(!find){
            throw new Error(`No data was sent for update`,{cause:'duplicate'});
        }

        const arm = await prisma.classArms.update({
          data:{
              arm_name,
              school_class_id,
              name_alias
          },
          where:{
            id
          },
          include:{
              school_class:true
          }
        }); 

        //const final_section = Object.assign({},arm,{arm_class:arm.school_class.class_name});
      
        //console.log('school vdata ',school);

        //const v = Object.assign({},arm,{arm_class:arm.school_class.class_name});
        
        //console.log('school vdata ',v);

        return NextResponse.json({arm_datum:Object.assign({},arm,{arm_class:arm.school_class.class_name})},{status:200});    
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
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access denied and not authorized'});
    //const {school_name} = await req.json();
    const {id} = await params;
    console.log('Delete ID ',id);
    

    try {

        //const {id} = await params;
    //console.log('Update value ',{school_name,id});

    await prisma.classArms.delete({
        where:{
            id:id as string
        }
    });

    //const classes = (await prisma.schoolClasses.findMany({include:{school_section:true}}));    

    //console.log('Section del data ',{ca,del});

        return NextResponse.json({logged:true},{status:200});
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


