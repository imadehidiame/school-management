'use client';
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/menu";
import Navbar from "@/components/navbar";
import { SessionProvider, useSession } from "next-auth/react";
import SchoolModalProvider from "@/components/providers/school-settings/school-modal-provider";
import SectionDeleteAlertProvider from "@/components/providers/school-settings/section-delete-alert-provider";
import SchoolDeleteAlertProvider from "@/components/providers/school-settings/school-delete-alert-provider";
import SectionModalProvider from "@/components/providers/school-settings/section-modal-provider";
import ClassDeleteAlertProvider from "@/components/providers/school-settings/class-delete-alert-provider";
import ClassModalProvider from "@/components/providers/school-settings/class-modal-provider";
import ArmModalProvider from "@/components/providers/school-settings/arm-modal-provider";
import ArmDeleteAlertProvider from "@/components/providers/school-settings/arm-delete-alert-provider";
import SessionModalProvider from "@/components/providers/school-settings/session-modal-provider";
import SessionDeleteAlertProvider from "@/components/modals/school-settings/session-delete-alert-modal";
//import ParentModalProvider from "@/components/providers/parent-modal-provider";
import { useState, useEffect } from 'react';
import { Menu as MenuIcon } from 'lucide-react';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const { data: session, status } = useSession();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [window_size,set_window_size] = useState(0);

    useEffect(() => {
        const handleCloseSidebar = () => {
            setIsSidebarOpen(false);
        };

        const setWindowSize = ()=>{
            set_window_size(window.innerWidth);
        }

        setWindowSize();

        if (typeof window !== 'undefined') {
            window.addEventListener('closeSidebar', handleCloseSidebar);
            window.addEventListener('resize',setWindowSize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('closeSidebar', handleCloseSidebar);
                window.removeEventListener('resize', setWindowSize);
            }
        };
    }, []);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }

    if (!session) {
        return null;
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
            <SessionDeleteAlertProvider />

            <div className="flex">
                {/* left - Sidebar */}
                <div className={`fixed h-screen overflow-y-auto transition-transform duration-300 ease-in-out w-[80%] md:w-[40%] lg:w-[18%] xl:w-[14%] p-4 bg-white z-50 lg:block`}
                     style={{ transform: isSidebarOpen || (window_size >= 1024 ) ? 'translateX(0)' : 'translateX(-100%)' }}>
                    <div className="sm:flex items-center align-center justify-start gap-2">
                        <Link href={'/' + role} className="hidden max-sm:flex sm:flex md:hidden items-center md:justify-start">
                            <Image src={'/img/gta_logo.png'} width={52} height={52} alt="logo" />
                            <span className="inline font-bold">GTA Portal</span>
                        </Link>
                        <div className="max-sm:hidden sm:flex md:hidden w-[62%] items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                    
                            <Image src={'/search.png'} alt="" height={14} width={14} />
                            <input type="text" placeholder="Search" className="w-[100%] p-2 bg-transparent outline-none" />
                        </div>
                    </div>

                    <div className="max-sm:flex sm:hidden w-full items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 mt-2">
                    
                            <Image src={'/search.png'} alt="" height={14} width={14} />
                            <input type="text" placeholder="Search" className="w-[90%] p-2 bg-transparent outline-none" />
                    </div>

                    <Link href={'/' + role} className="hidden md:flex items-center md:justify-start gap-2">
                            <Image src={'/img/gta_logo.png'} width={52} height={52} alt="logo" />
                            <span className="inline font-bold">GTA Portal</span>
                    </Link>
                    <Menu />
                </div>
                {/* right - Page Content */}
                <div className={`ml-0 lg:ml-[18%] xl:ml-[14%] w-full lg:w-[82%] xl:w-[86%] bg-[#F7FBFA] overflow-y-auto flex flex-col`}>
                    <Navbar onMenuClick={() => {
                        console.log('Hamburger clicked');
                        setIsSidebarOpen(!isSidebarOpen);
                    }} />
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </SessionProvider>
    );
}