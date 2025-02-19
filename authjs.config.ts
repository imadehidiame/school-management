import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig} from "next-auth"
import { DefaultSession } from "next-auth";
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
//import { getToken } from "next-auth/jwt";
import { auth_paths } from "@/lib/data";
//import { is_profile_set, memoize_util } from "./lib/utils";
 
// Notice this is only an object, not a full Auth.js instance
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

export default {
//debug: !!process.env.AUTH_DEBUG,
debug:false,
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
  //basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    async authorized({ request, auth }) {    
        const { pathname,origin } = request.nextUrl;
        //const auth_paths = ['/dashboard','/admin','/teacher','/student','/parent'];
        if (auth_paths.includes(pathname as string)) 
                return !!auth  
            return true;
    },
    jwt({ token, trigger, session, account,user }) {
        if (user) {
            //profile.
            token.role = user.role;
            token.name = user.name;
        }

        if (trigger === "update")
            token.name = session.user.name
        if (account) {
            token.accessToken = account.access_token;
            token.provider = account.provider
        }
        if (account?.provider === "keycloak") {
            return { ...token, accessToken: account.access_token }
        }
        return token
    },
    async session({ session, token }) {
        if (token?.accessToken)
            session.accessToken = token.accessToken;
        if (token?.provider)
            session.provider = token.provider as string;
        session.user.role = token.role as string | undefined;
        session.user.name = token.name;
        //if (token?.accessToken) session.accessToken = token.accessToken

        return session
    },
    async redirect({ url, baseUrl }) {
        if(url.includes('/auth/signout')){
            return `${baseUrl}/auth/signin`;
        }
        if(url.includes('/auth/error')){
            return `${baseUrl}/err-page`;
        }
        if(url.includes('/auth/signin') || url == '/auth/signin'){
            return `${baseUrl}/dashboard`;
        }
        if (url.startsWith('/')) return `${baseUrl}/dashboard`;
        // Allow callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url;
        //return baseUrl;

        if (!url.startsWith(baseUrl)) {
            return `${baseUrl}/dashboard`; 
        }
        // Allow relative URLs
        //if (url.startsWith("/")) return `${baseUrl}${url}`;
        return url;
    },
  },
  experimental: { enableWebAuthn: true },
} satisfies NextAuthConfig


