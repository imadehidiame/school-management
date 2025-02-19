import NextAuth from "next-auth";
import authConfig from "@/authjs.config";
//import { NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
//import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
 export const { auth } = NextAuth(authConfig);
 //import { auth } from "./authjs";

 export async function middleware(req:NextRequest){
  const token = await getToken({req,secret:process.env.AUTH_SECRET});
  const session = await auth();
  


  //console.log(session);

  //const protected_routes = ["/dashboard"];
  const { pathname,origin,basePath,searchParams } = req.nextUrl;

  

  const roles = ['admin','student','teacher','parent'];
  const error_or_routes = ['/err-page','/login','/logout','/auth/signin','/auth/login','/auth/signout','/auth/sign-in','/verify-request','/auth/verify-request'];
  const callback_urls = ['/auth/callback/google','/auth/callback/github'];
  
  const allowed_auth_pages = ['/list/teachers'];

  if (pathname.startsWith('/public')) {
    return NextResponse.next();   
  }

  if (
    pathname.startsWith('/public') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.ico') ||
    pathname.endsWith('.svg')
  ) {
    return NextResponse.next();
  }
  

  if(callback_urls.includes(pathname)){
    //console.log('Tried going in from here callbak urLL');
    //return NextResponse.redirect(new URL(basePath+'/dashboard',origin));
    //console.log('Callback url encountered ',pathname);
    return NextResponse.next();  
  }

  //console.log('Toekne from middleware ',token);

  if(pathname.includes('/auth/verify-request') || pathname.includes('/verify-request') || pathname == '/auth/verify-request' || pathname.startsWith('/api')){
    return NextResponse.next();  
  }

  //https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=1001842009566-t41f9v9eqkooe7g51bje199l1ohhsjh2.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A8999%2Fauth%2Fcallback%2Fgoogle&prompt=consent&access_type=offline&scope=openid%20profile%20email&code_challenge=xKlmDKgaA9MSudYLTlZAX6WdBDtxewUiJ04WMazdQmE&code_challenge_method=S256&service=lso&o2v=2&ddm=1&flowName=GeneralOAuthFlow

  //http://localhost:8999/auth/callback/google?code=4%2F0ASVgi3Lm-tPJ5BmH61L2AkH2CidjokgxMaikog8d5I7Lz2U7TJda20wiGBjbEfClxFVDWA&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=2&prompt=consent
  

  if(pathname.includes('/logout') || pathname == 'logout'){
      return NextResponse.next();  
  }

  if(!token){
    if(error_or_routes.includes(pathname)){
      //console.log('Callback url encountered ',pathname);
      return NextResponse.next();  
    }
    return NextResponse.redirect(new URL(basePath+'/auth/signin',origin));
  }
  const role = session?.user?.role;
  const name = session?.user.name;

  if(error_or_routes.includes(pathname)){
    return NextResponse.next();  
  }

  if(allowed_auth_pages.includes(pathname)){
    if(role){
      return NextResponse.next();
    }
  }
  
  if(pathname == '/user/profile'){
    if(role && name && roles.includes(role))
      return NextResponse.redirect(new URL(basePath+'/'+role,origin));  
    return NextResponse.next();  
  }
    
    

  if(pathname.startsWith('/dashboard')){
    
    if(!(role && roles.includes(role))){
      //user has no role assigned
      return NextResponse.redirect(new URL(basePath+'/err-page?err=no-role',origin));
    }
    //redirect to role based URL
    return NextResponse.redirect(new URL(basePath+'/'+role,origin));
  }

  //check role match
  const [path_role] = pathname.slice(1).split('/');
  if(!roles.includes(path_role)){
    //check if user has valid role and route to route to role
  
    //error page for invalid role
    //if(path_role == 'list' || path_role.includes('list/teachers'))
    return NextResponse.redirect(new URL(basePath+'/err-page?err=invalid-roles',origin));
  }
  //check for role mismatch
  if(path_role != role){
    //check if role exist in roles defined route to defined role
    //console.log('Catch ne here path_role != role');
    if(roles.includes(role as string)){
      //console.log('Catch ne here path_role != role valid');
      return NextResponse.redirect(new URL(basePath+'/'+role,origin));
    }
    //if(roles.includes(path_role as string)){
      //return NextResponse.redirect(new URL(basePath+'/err-page?err=invalid-role',origin));
      //return NextResponse.redirect(new URL(basePath+'/'+path_role,origin));
    //}
    //role is invalide
    
    return NextResponse.redirect(new URL(basePath+'/err-page?err=no-role',origin));
  }
  if(!name){
    return NextResponse.redirect(new URL(basePath+'/user/profile',origin));
  }
  if(!roles.includes(role as string)){
    return NextResponse.redirect(new URL(basePath+'/err-page?err=invalid-roless',origin));
  }
  return NextResponse.next();

  /*if(protected_routes.some((route)=>req.nextUrl.pathname.startsWith(route))){
    if(!token){
      return NextResponse.redirect(new URL(basePath+'/login',origin));
    }
    
  }
  return NextResponse.next();*/
 }

 /*export default middleware(async (req) => {
  
  
  const {pathname,basePath,origin} = req.nextUrl;

  const token = await getToken({req,secret:process.env.AUTH_SECRET});
  
  if(!token){
    if(pathname?.includes('/dashboardd')){
      return NextResponse.redirect(new URL(basePath,'/auth/signin'));
    }
  }

  console.log('Token value ',token);
  console.log('Base path ',basePath);
  console.log('Path name ',pathname);
  console.log('Request url ',req.nextUrl);

  if(pathname.includes('/dashboardd')){

    const response = await (await fetch(origin+'/api/get_user_data')).json();

    console.log('response value, ',response);
    
    if(!req.auth){

    }
  }

  
  return NextResponse.next();
})*/

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })




// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)",
        '/((?!_next/static|_next/image|favicon.ico|public/|public/img/).*)',
        ],
}
