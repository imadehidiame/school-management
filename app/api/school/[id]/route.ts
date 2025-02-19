import { NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
import nodemailer from 'nodemailer';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";



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



export async function PATCH(req:Request,{params}:{params:{id:string}}){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access denied and not authorized'});
    const {school_name} = await req.json();
    const {id} = await params;
    //console.log('Update value ',{school_name,id});
    try {

        const find = await prisma.school.findFirst({
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

        const school = await prisma.school.update({
          data:{
              school_name,
          },
          where:{
            id
          }
        });
      
        //console.log('school vdata ',school);
      

        return NextResponse.json({school},{status:200});    
        //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error:any) {
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
        
        console.log('Error saving information from api/create-school-naming route ',error);
        return NextResponse.json({data:error ? error?.message:'Server error'},{status:201,statusText:error ? error?.message:'Server error'});
    }
}

export async function DELETE(req:Request,{params}:{params:{id:string}}){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access denied and not authorized'});
    //const {school_name} = await req.json();
    const {id} = await params;
    //console.log('Update value ',{school_name,id});
    

    try {

        const {id} = await params;
    //console.log('Update value ',{school_name,id});

    const del = await prisma.school.delete({
        where:{
            id
        }
    });
    /**
     id: string;
         section_name: string;
         school_id: string;
         createdAt: string;
         updatedAt: string; 
         section_school: string;
         school?:School
     * 
     */
    const sections = (await prisma.schoolSections.findMany({include:{school:true}})).map((e:any)=>{
        if(e)
            e['section_school'] = e.school.school_name;
        return e;
    });

    //console.log('Section del data ',{sections,del});

        return NextResponse.json({sections},{status:200});
        //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error:any) {
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
        
        console.log('Error saving information from api/create-school-naming route ',error);
        return NextResponse.json({data:error ? error?.message:'Server error'},{status:201,statusText:error ? error?.message:'Server error'});
    }
}


