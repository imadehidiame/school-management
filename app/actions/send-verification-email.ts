'use server';
import { cookies } from "next/headers";
import { createTransport } from "nodemailer"


type Theme = {
    brandColor?: string;
    buttonText?: string;
  }
  
type params_type = {  
  identifier: string;
  url: string;
  provider: {
    server: { host: string; port: number; secure: boolean; auth: { user: string; pass: string } };
    from: string;
  };
  theme: Theme;
 }

export async function sendVerificationRequest(params:params_type) { 

  //await fetch('/api/send_auth_mail',{body:JSON.stringify(params),method:'POST'});


  const { identifier, url, provider, theme } = params
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
  }
  
}
 
function html(params: { url: string; host: string; theme: Theme }) {
  const { url, host, theme } = params
 
  //const escapedHost = host.replace(/\./g, "&#8203;.")
 
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
function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}