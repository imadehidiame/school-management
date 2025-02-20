import { NextResponse } from "next/server";
import { auth } from "@/authjs";
import { prisma } from "@/prisma";
import nodemailer from 'nodemailer';
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

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
    const session = await auth();
    if(!session)
    throw new Error(`Not authenticate`,{cause:'authentication_error'});
    //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
    if(session.user.role !== 'admin')
    throw new Error(`Not authorized`,{cause:'authorization_error'});
    //return NextResponse.json({data:'Not authorized'},{status:401,statusText:'Access denied and not authorized'});
    const {name,role,username} = await req.json();
    try {

        const find = await prisma.user.findFirst({
            where:{
                email:username
            },
            select:{ 
                email:true
            }
        });

        if(find){
            throw new Error(`Email account already exists`,{cause:'email_exists'});
            //return NextResponse.json({data:'Email account already exists'},{status:500,statusText:'Email exists'}); 
        }

        const create = await prisma.user.create({
          data:{
              role,
              name,
              email:username
          }
      });

        const result = await transporter.sendMail({
          from:process.env.EMAIL_FROM,
          to:username,
          subject:`Account created on GTA's portal`,
          text:text({url:'/auth/signin',host:process.env.NEXT_URL as string}),
          html:html({url:'/auth/signin',host:process.env.NEXT_URL as string,is_gmail:username.includes('@gmail.com')})
      });

      const failed = result.rejected.filter(Boolean);
      if(failed.length){
          throw new Error(`Email (${failed.join(", ")}) could not be sent`,{cause:'email_unsent'});
      }


        

        

        return NextResponse.json({create},{status:200});    
        //return NextResponse.json({data:'Not authentication'},{status:403,statusText:'Access denied'});
        
    } catch (error:unknown) {
        if(error instanceof PrismaClientKnownRequestError || error instanceof PrismaClientInitializationError || error instanceof PrismaClientUnknownRequestError || error instanceof PrismaClientValidationError || error instanceof PrismaClientRustPanicError){
            console.log('Prisma error api/create-user route: ',error.name,': ',error.message);
            console.log(error);
            return NextResponse.json({data:'DB error'},{status:201,statusText:'Account could not be created because of an error on the server'});
        }
        if(error instanceof Error){

            switch (error.cause) {
                case 'authorization_error':
                return NextResponse.json({data:'Not authorized'},{status:403,statusText:'Access denied for an authorization error'});
                //break;
                case 'authentication_error':
                return NextResponse.json({data:'Not authenticated'},{status:401,statusText:'Access denied for an authentication error'});
                //break;
                case 'email_exists':
                return NextResponse.json({data:error.message},{status:201,statusText:error.message});
                //break;
                case 'email_unsent':
                return NextResponse.json({data:'Account not created because email could not be sent'},{status:201,statusText:'Email not sent'});
                //break;
                default:
                return NextResponse.json({data:'server error'},{status:500,statusText:error ? error?.message as string:'Server error'});
                //break;
            }

            /*if(error?.cause == 'email_unsent'){
                console.log('Email sending error from api/create-user route');
                return NextResponse.json({data:'Email could not be sent'},{status:500,statusText:'Email not sent'});                
            }

            if(error?.cause == 'email_exists'){
                console.log('Email already exists from api/create-user route');
                return NextResponse.json({data:error.message},{status:500,statusText:error.message});                
            }*/
        }
        
        if(error instanceof Error){
          console.log('Error saving information from api/create-school-naming route ',error);
      return NextResponse.json({data:error ? error?.message:'Server error'},{status:201,statusText:error ? error?.message:'Server error'});
      }
    }
}


function html(params: { url: string; host: string; is_gmail:boolean }) {
  const { is_gmail } = params;
  let {url} = params; 

    
  if(!(url.includes('http://') || url.includes('https://'))){
    url = url.startsWith('/') ? `${process.env.NEXT_URL}${url}` : `${process.env.NEXT_URL}/${url}`;
  }

  //const escapedHost = host.replace(/\./g, "&#8203;.")
 
  //const brandColor = theme.brandColor || "#346df1"

  const brandColor = "#000000"

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: "#fff",
  }

  //console.log('is_gmail from api/create-user ',is_gmail);

  const extra = is_gmail ? `<p>An account has been created for you on Greater Tomorrow Academy's portal. Click the button below to sign in with your email address. You can sign in with the Gmail option too using this email address if you prefer that option:</p>` : `<p>An account has been created for you on Greater Tomorrow Academy's portal. Click the button below to sign in with your email address:</p>`

  

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to GTA's Portal</title>
  <style>
    body {
      background-color: ${color.mainBackground};
      color: ${color.text};
      font-family: Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      color: ${color.text};
    }
    .content {
      text-align: center;
      padding: 20px 0;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 18px;
      color: ${color.buttonText};
      background-color: ${color.buttonBackground};
      border: 1px solid ${color.buttonBorder};
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
    }
    .footer {
      text-align: center;
      padding: 20px 0;
      font-size: 14px;
      color: ${color.text};
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sign in to <strong>Greater Tomorrow Academy Portal</strong></h1>
    </div>
    <div class="content">
      
    ${extra}
    
      <a href="${url}" target="_blank" class="button">Sign in</a>
    </div>
    <div class="footer">
      <p>If you did not request this email, you can safely ignore it.</p>
    </div>
  </div>
</body>
</html>
  `;

 
  /*return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>Greater Tomorrow Academy Portal</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                target="_blank"
                style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`*/
}
 
// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url }: { url: string; host: string }) {
    if(!(url.includes('http://') || url.includes('https://'))){
        url = url.startsWith('/') ? `${process.env.NEXT_URL}${url}` : `${process.env.NEXT_URL}/${url}`;
      }
  return `Sign in to GTA's Portal\n${url}\n\n`
}