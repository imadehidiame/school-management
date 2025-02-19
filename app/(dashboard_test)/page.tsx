import { signIn,auth } from "@/auth";
import SessionData from "@/components/session-data";
import Login from "@/ui/auth/login-mod";

export default async function Home() {

const logins = [
    {
      action: async () => {
        'use server';
        const res = await signIn('github');
        console.log(res);
      },
      text: 'Sign in with Github'
    },
    {
      action: async () => {
        'use server';
        const res = await signIn('google');
        console.log(res);
      },
      text: 'Sign in with Google'
    }
]

  const session = await auth();

  
  //const aut = await auth();
  console.log('Auth value, ',session);

  if(session?.user){ 
    return (
      <SessionData session={session} />
    )
      
   }

  return (
      <Login login={logins} />
  );
}
