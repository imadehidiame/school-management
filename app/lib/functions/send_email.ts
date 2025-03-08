'use server';
import nodemailer from 'nodemailer';

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

export async function send_email(email_address:string,subject:string,html_string:string,text_string?:string){
    const result = await transporter.sendMail({
        from:process.env.EMAIL_FROM,
        to:email_address,
        subject,
        text:text_string,
        html:html_string
    });

    const failed = result.rejected.filter(Boolean);
      if(failed.length){
          throw new Error(`Email (${failed.join(", ")}) could not be sent the welcome account creation email`,{cause:'email_unsent'});
      }
}

export async function send_registration_mail(email:string){

    try {
        await send_email(email,`Account Created on GTA's Portal`,html({url:'/auth/signin',host:process.env.NEXT_URL as string,is_gmail:email.includes('@gmail.com')}),text({url:'/auth/signin',host:process.env.NEXT_URL as string}));    
        return {sent:true,message:'sent'};
    } catch (error) {
        if(error instanceof Error)
        return {sent:false,message:error?.message ? error?.message : 'Email could not be sent to '+email};
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




