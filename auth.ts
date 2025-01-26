import NextAuth from "next-auth"
import "next-auth/jwt"

import Apple from "next-auth/providers/apple"
// import Atlassian from "next-auth/providers/atlassian"
import Auth0 from "next-auth/providers/auth0"
import AzureB2C from "next-auth/providers/azure-ad-b2c"
import BankIDNorway from "next-auth/providers/bankid-no"
import BoxyHQSAML from "next-auth/providers/boxyhq-saml"
import Cognito from "next-auth/providers/cognito"
import Coinbase from "next-auth/providers/coinbase"
import Discord from "next-auth/providers/discord"
import Dropbox from "next-auth/providers/dropbox"
import Facebook from "next-auth/providers/facebook"
import GitHub from "next-auth/providers/github"
import GitLab from "next-auth/providers/gitlab"
import Google from "next-auth/providers/google"
import Hubspot from "next-auth/providers/hubspot"
import Keycloak from "next-auth/providers/keycloak"
import LinkedIn from "next-auth/providers/linkedin"
import MicrosoftEntraId from "next-auth/providers/microsoft-entra-id"
import Netlify from "next-auth/providers/netlify"
import Okta from "next-auth/providers/okta"
import Passage from "next-auth/providers/passage"
import Passkey from "next-auth/providers/passkey"
import Pinterest from "next-auth/providers/pinterest"
import Reddit from "next-auth/providers/reddit"
import Slack from "next-auth/providers/slack"
import Salesforce from "next-auth/providers/salesforce"
import Spotify from "next-auth/providers/spotify"
import Twitch from "next-auth/providers/twitch"
import Twitter from "next-auth/providers/twitter"
import Vipps from "next-auth/providers/vipps"
import WorkOS from "next-auth/providers/workos"
import Zoom from "next-auth/providers/zoom"
import { redirect } from "next/navigation"
//import { createStorage } from "unstorage"
//import memoryDriver from "unstorage/drivers/memory"
//import vercelKVDriver from "unstorage/drivers/vercel-kv"
//import { UnstorageAdapter } from "@auth/unstorage-adapter"



export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: !!process.env.AUTH_DEBUG,
  theme: { logo: "http://localhost:8999/img/gta_logo.png",colorScheme:'light', brandColor: "#000000" },
  //adapter: UnstorageAdapter(storage),
  providers: [
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
    Google,
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
