import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){

    try {
    
        const cookie_store = await cookies();
        const email = cookie_store.get('resend_email');
        console.log('Email from get_email route ',email);
        if(email){
            return NextResponse.json({email:email.value});
        }else{
            return NextResponse.json({email:null});
        }

    } catch (error) {
        console.log('Error occured in get_email route ',error);
        return NextResponse.json({data:'no'},{status:500});
    }

    
    
}