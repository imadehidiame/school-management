import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth"
import "next-auth/jwt"
import Nodemailer from 'next-auth/providers/nodemailer';
import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { sendVerificationRequest,signIn as signInCallback } from "@/mail"
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { auth_paths } from "@/lib/data";
//import { NextRequest } from "next/server";
//import authConfig from "@/authjs.config"
//import EmailProvider from 'next-auth/providers/email'
//const { providers} = authConfig;

//import type { User, Account, Profile } from 'next-auth';
//import type { CredentialInput } from 'next-auth/providers';


/*type SignInCallback = (params: {
  user: User;
  account: Account | null;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
  credentials?: Record<string, CredentialInput>;
}) => Promise<boolean | string> | boolean | string;*/


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

export const auth_options = {
    secret: process.env.AUTH_SECRET,
    //basePath: "",
    session: { strategy: "jwt" as const },
    //debug: !!process.env.AUTH_DEBUG,
    debug:false,
    //debug: !!process.env.AUTH_DEBUG,
    theme: { logo: "http://localhost:8999/img/gta_logo.png", colorScheme: 'light' as 'light', brandColor: "#FFFFFF" },
    adapter: PrismaAdapter(prisma),
    providers: [
        Nodemailer({
            name: 'Email Address',
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT ? parseInt(process.env.EMAIL_SERVER_PORT, 10) : undefined,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,

            sendVerificationRequest/*: async (params) => {
                const { url, theme } = params;
                const { host } = new URL(params.url)
                const response = await fetch(`${host}/api/send_mail`,
                    {
                        method: 'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            to: params.identifier,
                            from: params.provider.from,
                            subject: `Sign in to ${host}`,
                            text: text({ url, host }),
                            html: html({ url, host, theme }),
                        })
                    }
                );
                if (!response.ok) {
                    throw new Error(`Failed to send verification email`);
                }
            }*/,
            normalizeIdentifier(identifier: string): string {
                let [local, domain] = identifier.toLowerCase().trim().split("@")
                domain = domain.split(",")[0]
                return `${local}@${domain}`
            },
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
            style: {
                //brandColor:"FFFFFF"
            },
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                    redirect_uri:'http://localhost:8999/api/auth/callback/google'
                }
            }
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
            style: {
                brandColor: '#FFFFFF',
            },
            authorization:{
                redirect_uri:'http://localhost:8999/api/auth/callback/github'
            }
        })
    ],
    pages:{
        signIn:'/auth/signin',
        error:'/err-page',
        verifyRequest:'/auth/verify-request'
    },
    callbacks: {
        
        async authorized({request, auth}){
            const { pathname,origin } = request.nextUrl;
            //const auth_paths = ['/dashboard','/admin','/teacher','/student','/parent','/list'];
            if (auth_paths.includes(pathname as string)) 
                    return !!auth  
                return true;
        },
        jwt({ token, trigger, session, account, user, profile }) {
            //console.log('User ',user);
            //console.log('trigger ',trigger);
            //console.log('Session ',session);
            //console.log('Account ',account);
            //console.log('Token ',token);
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
        async session({ session, token }: { session: any, token: any }) {
            if (token?.accessToken)
                session.accessToken = token.accessToken;
            if (token?.provider)
                session.provider = token.provider as string;
            session.user.role = token.role as string | undefined;
            session.user.name = token.name;
            //if (token?.accessToken) session.accessToken = token.accessToken

            return session
        },
        async redirect({ url, baseUrl }: { url: any, baseUrl: any }) {
            if(url.includes('/callback/')){
                return `${baseUrl}/dashboard`;
            }
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
    }


} satisfies NextAuthConfig

/*type SignInCallback = (params: {
    user: User;
    account: Account | null;
    profile?: Profile;
    email?: { verificationRequest?: boolean };
    credentials?: Record<string, CredentialInput>;
  }) => Promise<boolean | string> | boolean | string;
*/


const auth_options_addition = Object.assign({},auth_options,{
    callbacks:{...auth_options.callbacks,signIn:signInCallback }
});


export const { auth,handlers,signIn,signOut } = NextAuth(auth_options_addition);


export default NextAuth(auth_options_addition);

