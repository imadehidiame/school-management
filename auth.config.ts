import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
 
// Notice this is only an object, not a full Auth.js instance
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
    }})
],
adapter:PrismaAdapter(prisma),
secret: process.env.AUTH_SECRET,
  basePath: "/auth",
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ request, auth }) {    
      const { pathname,origin } = request.nextUrl;
      console.log("Pathname value is ",pathname);
      console.log('Origin value is ',origin);
      console.log("Auth value, ",auth);

      if (pathname.includes('/dashboard')) return !!auth
      if(auth){
        if(!pathname.includes('/dashboard'))
            return Response.redirect(new URL('/dashboard/home',origin).toString(), 302); 
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
} satisfies NextAuthConfig


