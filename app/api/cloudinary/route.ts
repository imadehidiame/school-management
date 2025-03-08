import { auth } from "@/authjs";
import { NextResponse } from "next/server";
import cloudinary from 'cloudinary';
import { sign } from "crypto";

export async function GET(){

    const session = await auth();
        if(!session)
        throw new Error(`Not authenticate`,{cause:'authentication_error'});
        
        if(session.user.role !== 'admin')
        throw new Error(`Not authorized`,{cause:'authorization_error'});
        
        try {
    
            const timestamp = Math.round((new Date().getTime())/1000);
            const signature = cloudinary.v2.utils.api_sign_request({timestamp},process.env.CLOUDINARY_API_SECRET as string);

            return NextResponse.json({timestamp,signature},{status:200});     
            //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
            
        } catch (error:unknown) {
            
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