//import { auth } from "@/authjs";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary} from 'cloudinary';
//import { sign } from "crypto";

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req:Request){

    
        try {
            const body = await req.json();
            const {paramsToSign} = body;
            const signature = cloudinary.utils.api_sign_request(paramsToSign,process.env.CLOUDINARY_API_SECRET as string);
            return Response.json({signature});
            
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