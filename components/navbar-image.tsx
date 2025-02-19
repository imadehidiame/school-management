'use client'

import { Session } from "next-auth";
import { useSession,signOut } from "next-auth/react"
import Image from 'next/image'
import { useEffect, useState } from "react";

export default function NavbarImage(){
    //const [user_data,set_user_data] = useState<Session | null>();
    const {data:session,status} = useSession();
    
    //const {data} = useSession();
    //const role = data?.user.role;
    if(status === 'loading')
        return null;
    return (
        <>
        <div className="flex flex-col" onClick={async ()=>{
            await signOut();
        }}>
                            <span className="text-xs leading-3 font-medium">{session?.user.name}</span>
                            <span className="text-[10px] text-gray-500 text-right">{session?.user.role?.slice(0,1).toLocaleUpperCase()+''+session?.user.role?.slice(1)}</span>
                        </div>
                        <Image src={session?.user.image ? session?.user.image as string : '/avatar.png'} alt="" width={36} height={36} className="rounded-full" />
        </>
    )
}