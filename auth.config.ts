import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig} from "next-auth"
import { DefaultSession } from "next-auth";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getToken } from "next-auth/jwt";
//import { is_profile_set, memoize_util } from "./lib/utils";

 
// Notice this is only an object, not a full Auth.js instance
declare module "next-auth" {
    interface User {
        role?: string
    }
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"]
    }
    interface JWT {
        role?:string
    }
}

export default {
debug: !!process.env.AUTH_DEBUG,
//theme: { logo: "http://localhost:8999/img/gta_logo.png",colorScheme:'light', brandColor: "#000000" },
  providers: [
    
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      style:{
          brandColor:'#FFFFFF',
        }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
     clientSecret: process.env.AUTH_GOOGLE_SECRET,
     style:{
          //brandColor:"FFFFFF"
      },
      authorization:{
          params:{
              prompt:'consent',
              access_type:'offline',
              response_type:'code'
          }
  }}),
],
adapter:PrismaAdapter(prisma),
secret: process.env.AUTH_SECRET,
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    async authorized({ request, auth }) {    
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

      

      //const memoize_data = memoize_util(fetch_function);

      //console.log('Memoized data ',await memoize_data());
      

      if (pathname.includes('/dashboardd')) 
        return !!auth  
      
      if(auth){
        if(!auth.user?.role){

        }
        //const response = await (await fetch(request.nextUrl.origin+'/api/get_user_data')).json();

        //console.log('response value, ',response);

        //if(!pathname.includes('/dashboardd'))
          
            //return Response.redirect(new URL('/dashboardd/home',origin).toString(), 302); 
      }
      return true
    },
    jwt({ token, trigger, session, account,user }) {
      if(user){
        token.role = user.role;
        token.name = user.name;
      }
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      session.user.role = token.role as string | undefined;
      session.user.name = token.name;
      if (token?.accessToken) session.accessToken = token.accessToken

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
} satisfies NextAuthConfig


