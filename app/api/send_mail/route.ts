import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';

/**
 EMAIL_SERVER_USER="no_reply@echang.com.ng"
EMAIL_SERVER_PASSWORD="no_replyageat89#"
EMAIL_SERVER_HOST="echang.com.ng"
EMAIL_SERVER_PORT=465
EMAIL_FROM="no_reply@echang.com.ng"
 */

const transporter = nodemailer.createTransport( 
    {
        host:process.env.EMAIL_SERVER_HOST,
        port:parseInt(process.env.EMAIL_SERVER_PORT as string),
        auth:{
            user:process.env.EMAIL_SERVER_USER,
            pass:process.env.EMAIL_SERVER_PASSWORD
        },
    }
);

export async function POST(req:Request){
    const {to,subject,text,html} = await req.json();
    try {
        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to,
            subject,
            text,
            html
        });
        return NextResponse.json({data:'yes'});
    } catch (error) {
        console.log('Error sending email ',error);
        return NextResponse.json({data:'no'},{status:500});
    }
}