'use client';
import Link from "next/link"
import Image from "next/image"
import Menu from "@/components/menu"
import Navbar from "@/components/navbar"
//import { auth } from "@/authjs"
import { SessionProvider, useSession } from "next-auth/react"
import SchoolModalProvider from "@/components/providers/school-modal-provider"
import SectionDeleteAlertProvider from "@/components/providers/section-delete-alert-provider"
import SchoolDeleteAlertProvider from "@/components/providers/school-delete-alert-provider"
import SectionModalProvider from "@/components/providers/section-modal-provider"
import ClassDeleteAlertProvider from "@/components/providers/class-delete-alert-provider";
import ClassModalProvider from "@/components/providers/class-modal-provider";
import ArmModalProvider from "@/components/providers/arm-modal-provider";
import ArmDeleteAlertProvider from "@/components/providers/arm-delete-alert-provider";
import SessionModalProvider from "@/components/providers/session-modal-provider";
//import { useEffect, useState } from "react";
//import { Session } from "next-auth";

export default function DashboardLayout({ children }:Readonly<{children: React.ReactNode}>) {
   // const [session,set_session] = useState<Session|null>();
   const {data:session} = useSession();
   
    //const [role,set_role] = useState<string|null|undefined>('admin');

    /*auth().then((e)=>{
        set_session(e);
        set_role(e?.user.role);
    });*/

    

  
    //const role = session?.user.role;
    if (!session) {
        return null;
        //return <div>Loading...</div>; // Or a more appropriate loading indicator
    }

    const role = session?.user?.role;

  return (
        <SessionProvider session={session}>
            <SectionModalProvider />
            <SectionDeleteAlertProvider />
            <SchoolModalProvider />
            <SchoolDeleteAlertProvider />
            <ClassModalProvider />
            <ClassDeleteAlertProvider />
            <ArmModalProvider />
            <ArmDeleteAlertProvider />
            <SessionModalProvider />
            <div className="h-screen flex">
            {/* left */}
            <div className="w-[18%] md:w-[8%] lg:w-[18%] xl:w-[14%] p-4">
                <Link href={'/'+role} className="flex items-center justify-center lg:justify-start gap-2">
                    <Image src={'/img/gta_logo.png'} width={32} height={32} alt="logo" />
                    <span className="hidden lg:block font-bold">GTA Portal</span>        
                </Link>
                <Menu />     
            </div>
            {/* right */}
            <div className="w-[82%] md:w-[92%] lg:w-[82%] xl:w-[86%] bg-[#F7FBFA] overflow-scroll flex flex-col">
                <Navbar />
                {children}
            </div>
            {/*children*/}
        </div>
        </SessionProvider> 
       
    )
}
