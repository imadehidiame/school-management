//import { cookies } from "next/headers";
//import { redirect } from "next/navigation";
//import { createTransport } from "nodemailer"

import type { User, Account, Profile } from 'next-auth';
import type { CredentialInput } from 'next-auth/providers';
import { prisma } from "./prisma";

type Theme = {
  brandColor?: string;
  buttonText?: string;
}


type SignInCallback = (params: {
  user: User;
  account: Account | null;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, CredentialInput>;
}) => Promise<boolean | string> | boolean | string;


export const signIn : SignInCallback = async ({account,profile,email,credentials,user})=>{
  //user is submitted user from signin
  //profile is profile related data from providers
  //account is account related data from providers

  console.log('user information ',user);
  console.log('provider information ',account);
  console.log('profile information ',profile); 

  const is_user = await prisma.user.findUnique({
    where: {
        email:user.email  as string //providerId: providerAccountId,
      },
   });

    if(is_user){
      //check if provider exists for user
      const provider = await prisma.account.findFirst({
        where:{
          userId:is_user.id  
        }
      });
      //update account for only google and github providers  
      if(account?.provider == 'google' || account?.provider == 'github'){

        //check if provider exists
        
  
        //console.log('Provider check ',provider);
        
        if(!provider){
          //provider does not exist, create one
          await prisma.account.create({
              data:{
                provider:account?.provider as string,
                providerAccountId:account?.providerAccountId as string,
                access_token:account?.access_token,
                refresh_token:account?.refresh_token,
                type:account?.type as string,
                userId:is_user.id,
                scope:account?.scope,
                expires_at:account?.expires_at,
                token_type:account?.token_type,
                id_token:account?.id_token,
              }
          });

          //check if user has image, if not give user one only if account provider is google
  
          if(!is_user.image){
            if(account?.provider == 'google'){
              await prisma.user.update({
                where:{
                  email:is_user.email as string
                },
                data:{
                  image:profile?.picture
                }
              })
            } 
          }
          return true;
  
        }else{
          //provider exists, please update
          await prisma.account.update({
            data:{
              provider:account?.provider as string,
              providerAccountId:account?.providerAccountId as string,
              access_token:account?.access_token,
              refresh_token:account?.refresh_token,
              type:account?.type as string,
              //userId:is_user.id
              scope:account?.scope,
              expires_at:account?.expires_at,
              token_type:account?.token_type,
              id_token:account?.id_token,
            },
            where:{
              //userId:is_user.id,
              id:provider.id
            }
        });

        //check if user has image, if not give user one only if account provider is google

          if(!is_user.image){
            if(account?.provider == 'google'){
              await prisma.user.update({
                where:{
                  email:is_user.email as string
                },
                data:{
                  image:profile?.picture
                }
              })
            } 
          }
  
        
        
        }


      }else{


        //check if account provider has token and expires_at values
        if(account?.access_token && account.expires_at){


          
          if(provider){
            //provider exists. update provider if account provider has token and expires_at values

            /*interface data_account {
             provider?: string;
              providerAccountId?: string;
              access_token?: string;
              expires_at?: number;
              refresh_token?: string | undefined;
              type?: string;
              scope?: string | undefined;
              token_type?: Lowercase<string> | undefined;
              id_token?: string | undefined;
            }*/

            //let new_account:data_account = Object.assign({},account);

            let update:any = {};

            (['access_token','expires_at','provider', 'providerAccountId', 'refresh_token', 'type', 'scope', 'token_type', 'id_token']).forEach((element) => {

              if (account[element]) {
                update[element] = account[element];
              }
            });

            console.log('Update object ',update);

            await prisma.account.update({
              data:update,
              where:{
                //userId:is_user.id,
                id:provider.id
              }
          });


          }else{
          //provider does not exist. create provider if account provider has token and expires_at values

          let update:any = {};

          (['access_token','expires_at','provider', 'provider_account_id', 'refresh_token', 'type', 'scope', 'token_type', 'id_token']).forEach((element) => {

            if (account[element]) {
              update[element] = account[element];
            }
          });

          update['user_id'] = is_user.id;

          console.log('create object ',update);

          await prisma.account.create({
            data:update,
          });


          }          

        }
        console.log('Expires at key unavailable in provider ',account?.provider);

      }

      return true;
    }
    
  return false;
}

 
export async function sendVerificationRequest(params:any) {

  await fetch('/api/send_auth_mail',{body:JSON.stringify(params),method:'POST'});


  /*const { identifier, url, provider, theme } = params
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: html({ url, host, theme }),
  })

  const cookie_store = await cookies();
  cookie_store.set('resend_email',identifier,{expires:new Date(Date.now()+24*60*60*1000),maxAge:(60*60*24)})
  const verifyRequestUrl = `/auth/verify-request?email=${encodeURIComponent(identifier)}`;
  console.log(`Verify Request URL: ${verifyRequestUrl}`);

  
  const failed = result.rejected.filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }*/
  
}
 
export function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params
 
  const escapedHost = host.replace(/\./g, "&#8203;.")
 
  //const brandColor = theme.brandColor || "#346df1"

  const brandColor = "#000000"

  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }


  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign in to ${host}</title>
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
      <p>Click the button below to sign in:</p>
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
export function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}