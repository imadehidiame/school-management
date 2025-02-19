import NextAuth, {DefaultSession} from "next-auth"
import "next-auth/jwt"

//import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
//import { createStorage } from "unstorage"
//import memoryDriver from "unstorage/drivers/memory"
//import vercelKVDriver from "unstorage/drivers/vercel-kv"
//import { UnstorageAdapter } from "@auth/unstorage-adapter"

import Nodemailer from 'next-auth/providers/nodemailer';
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sendVerificationRequest } from "@/mail"
import authConfig from "@/auth.config"

declare module "next-auth" {
    interface User {
        role?: string
    }
    interface Session {
      provider?:string;
      accessToken?: string
        user: {
            role?: string;
        } & DefaultSession["user"]
    }
    interface JWT {
        role?:string
        accessToken?: string
        provider?: string
    }
}


const { providers} = authConfig;


export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  //debug,
  //theme,
  theme: { logo: "http://localhost:8999/img/gta_logo.png",colorScheme:'light', brandColor: "#FFFFFF" },
  //adapter: UnstorageAdapter(storage),
  adapter:PrismaAdapter(prisma),
  providers: [
    Nodemailer({
        name:'Email Address',
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
      
    ...providers
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
    //GitHub,
    //GitLab,
    /*Google({authorization:{
        params:{
            prompt:'consent',
            access_type:'offline',
            response_type:'code'
        }
    }}),*/
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
    /*async authorized({ request, auth }) {    
      const { pathname,origin } = request.nextUrl;
      const token = await getToken({req:request,secret:process.env.AUTH_SECRET});
      
      if (token) {
        console.log("User role:", token.role); // Access custom session data
        console.log("User name:", token.name);
        console.log('user token,  ',token);
      }
      //console.log("Pathname value is ",pathname);
      //console.log('Origin value is ',origin);
      console.log("Auth value, ",auth);

      const fetch_function = async ()=>{
       // return await is_profile_set('imadehidiame@gmaill.com');
      }

      //const memoize_data = memoize_util(fetch_function);

      //console.log('Memoized data ',await memoize_data());
      

      if (pathname.includes('/dashboardd')) return !!auth  
      
      if(auth){
        if(!pathname.includes('/dashboardd'))
          
            return Response.redirect(new URL('/dashboardd/home',origin).toString(), 302); 
      }
      return true
    },*/
    jwt({ token, trigger, session, account,user,profile }) {
      if(user){
        //profile.
        token.role = user.role;
        token.name = user.name;
      }
      
      if (trigger === "update") 
        token.name = session.user.name
      if(account){
        token.accessToken = account.access_token;
        token.provider = account.provider
      }
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if(token?.accessToken)
        session.accessToken = token.accessToken;
      if(token?.provider)
      session.provider = token.provider as string;
      session.user.role = token.role as string | undefined;
      session.user.name = token.name;
      //if (token?.accessToken) session.accessToken = token.accessToken

      return session
    },
    async redirect({ url, baseUrl }) {
        // Redirect to the dashboard if the user is authenticated
        if (!url.startsWith(baseUrl)) {
          return `${baseUrl}/dashboardd/home`;
        }
        // Allow relative URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`;
        return url;
    },
  },

  experimental: { enableWebAuthn: true },
  pages:{
    signIn:'login'
  }
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
