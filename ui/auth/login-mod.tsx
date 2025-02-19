'use client';
//import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
//import { SessionProvider, useSession } from "next-auth/react";

interface LoginProps {
  login:{action:()=>void,text:String}[];
}

export default function Login({login}:LoginProps) {
  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>


        <div className="space-y-4">
            {login.map((item,index)=>(
                <form action={item.action} key={index}>
                    <Button key={index} variant={'default'} size={'lg'} className="w-full">{item.text}</Button>
                </form>
            ))}
        </div>
      </div>
    </div>
    
    
  );
}