import { NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";

export async function POST(req:Request){
    const session = await auth();
    if(!session)
    return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    const {name} = await req.json();
    try {
        if(session.user.email){
            const update = await prisma.user.update(
                {
                where:
                {
                    email:session.user.email
                },
                data:{
                    name
                }
            });
            return NextResponse.json({update},{status:200});    
        }
        return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error) {
        console.log('Error updating user ',error);
        return NextResponse.json({data:'server error'},{status:500,statusText:'Server error'});
    }
}