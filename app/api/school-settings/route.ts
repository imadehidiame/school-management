import { NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
//import nodemailer from 'nodemailer';
//import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";



export async function GET(){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    const base_school = await prisma.baseSchoolCategory.findFirst({
        select:{ 
            
            school_naming:true,
            section_naming:true,
            class_naming:true,
            arm_naming:true
        }
    });

    const school = await prisma.school.findMany();

    const setting = await prisma.schoolSections.findMany({
        include:{
            school:true
        }
    })


    return NextResponse.json({base_school,school,setting},{status:200});
}
