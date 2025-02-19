import { NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
//import nodemailer from 'nodemailer';
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


export async function POST(req:Request){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access denied and not authorized'});
    const {class_name,section_id} = await req.json();
    try {

        const find = await prisma.schoolClasses.findFirst({
            select:{ 
                id:true
            },
            where:{
                class_name
            }
        });
        //let school;
        if(find){
            throw new Error(`Duplicate entry`,{cause:'duplicate'});
        }

        const class_datum = await prisma.schoolClasses.create({
          data:{
              class_name,
              section_id
          },
          include:{
            school_section:true
          }
        });

        console.log('class_datum value ',class_datum);
        /**
         * 
         * id: string;
             class_name: string;
             section_id: string;
             createdAt: string;
             updatedAt: string;
             class_section: string;
             school_section: SchoolSections;
         */
      
        //console.log('school vdata ',school);

        //const school = await prisma.school.findFirst({where:{id:school_id},select:{school_name:true}});
        //const ob = Object.assign({},class_datum,{class_section:class_datum.school_section.section_name});

        //console.log('Ob value ',ob);
      

        return NextResponse.json({class_datum:Object.assign({},class_datum,{class_section:class_datum.school_section.section_name})},{status:200});    
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


