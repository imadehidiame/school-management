import NextAuth from "next-auth"
import "next-auth/jwt"

import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
//import { createStorage } from "unstorage"
//import memoryDriver from "unstorage/drivers/memory"
//import vercelKVDriver from "unstorage/drivers/vercel-kv"
//import { UnstorageAdapter } from "@auth/unstorage-adapter"

import Nodemailer from 'next-auth/providers/nodemailer';
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sendVerificationRequest } from "@/mail"



export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "http://localhost:8999/img/gta_logo.png",colorScheme:'light', brandColor: "#000000" },
  //adapter: UnstorageAdapter(storage),
  adapter:PrismaAdapter(prisma),
  providers: [
    Nodemailer({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT, 10) : undefined,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
        sendVerificationRequest,
        normalizeIdentifier(identifier: string): string {
            // Get the first two elements only,
            // separated by `@` from user input.
            let [local, domain] = identifier.toLowerCase().trim().split("@")
            // The part before "@" can contain a ","
            // but we remove it on the domain part
            domain = domain.split(",")[0]
            return `${local}@${domain}`
     
            // You can also throw an error, which will redirect the user
            // to the sign-in page with error=EmailSignin in the URL
            // if (identifier.split("@").length > 2) {
            //   throw new Error("Only one email allowed")
            // }
          },
    }),
    /*Apple,
    // Atlassian,
    Auth0,
    AzureB2C,
    BankIDNorway,
    BoxyHQSAML({
      clientId: "dummy",
      clientSecret: "dummy",
      issuer: process.env.AUTH_BOXYHQ_SAML_ISSUER,
    }),
    Cognito,
    Coinbase,
    Discord,
    Dropbox,
    Facebook,*/
    GitHub,
    //GitLab,
    Google({authorization:{
        params:{
            prompt:'consent',
            access_type:'offline',
            response_type:'code'
        }
    }}),
    /*Hubspot,
    Keycloak({ name: "Keycloak (bob/bob)" }),
    LinkedIn,
    MicrosoftEntraId,
    Netlify,
    Okta,
    Passkey({
      formFields: {
        email: {
          label: "Username",
          required: true,
          autocomplete: "username webauthn",
        },
      },
    }),
    Passage,
    Pinterest,
    Reddit,
    Salesforce,
    Slack,
    Spotify,
    Twitch,
    Twitter,
    Vipps({
      issuer: "https://apitest.vipps.no/access-management-1.0/access/",
    }),
    WorkOS({ connection: process.env.AUTH_WORKOS_CONNECTION! }),
    Zoom,*/
  ],
  secret: process.env.AUTH_SECRET,
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {    
      const { pathname,origin } = request.nextUrl;
      console.log("Pathname value is ",pathname);
      console.log('Origin value is ',origin);
      console.log("Auth value, ",auth);

      /*const get_base_url = (url:string)=>{

        if(url.includes(':')){
            let colon_split_url = url.split('://');
            let host = colon_split_url[1].split('/')[0];
            return colon_split_url[0]+'://'+host;
        }else{
            let split_url = url.split('/');
            return split_url[0];
        }
        }

        console.log("Base URL is ",get_base_url(request.nextUrl.toString()));*/

      if (pathname.includes('/dashboard')) return !!auth
      if(auth){
        if(!pathname.includes('/dashboard'))
            return Response.redirect(new URL('/dashboard/home',origin).toString(), 302); 
        //return redirect('/dashboard/home');
      }
      return true
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
    async redirect({ url, baseUrl }) {
        // Redirect to the dashboard if the user is authenticated
        if (!url.startsWith(baseUrl)) {
          return `${baseUrl}/dashboard/home`;
        }
        // Allow relative URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        return url;
    },
  },
  experimental: { enableWebAuthn: true },
})

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}
