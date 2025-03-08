import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/authjs";
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME
});


export async function DELETE(req:NextRequest,{ params }: { params: Promise<{ id: string }> }){
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    const {id} = await params;
    console.log('Delete PUBLIC ID ',id);


    

    try {

    const results /*= await cloudinary.v2.uploader.destroy(id)*/
    = await cloudinary.v2.api.delete_resources([id]);
    //cloudinary.v2.utils.api_sign_request({ti})
    //cloudinary.v2.utils.
    //cloudinary.v2.utils.
    console.log('results = ',results);
    
    return NextResponse.json({logged:true,results},{status:200});
        //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error:unknown) {
        
        if(error instanceof Error){

            if(error.cause){

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

        }
        if(error instanceof Error){
            console.log('Error deleting file ',error);
        return NextResponse.json({data:error ? error?.message:'Server error'},{status:201,statusText:error ? error?.message:'Server error'});
        }
        
    }
}
