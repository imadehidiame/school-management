'use client';
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import LoadLink from "./load-link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { X as XIcon } from "lucide-react";

type item_options = {
    icon: string|React.ReactNode;
    label: string;
    href: string;
    visible: string[];
};

type items = {
    title: string;
    items: item_options[];
};

type items_array = items[];

const route = (url = '', role = '') => {
    let ret = '';
    if (url === '/') {
        ret = `${role}`;
    } else {
        if (url.startsWith('/list')) ret = url.slice(1);
        else ret = `${role}${url}`;
    }
    return ret;
};

export default function MenuItems({ items }: { items: items_array }) {
    const { data: session } = useSession();
    const role = session?.user.role as string;
    const pathname = usePathname();
    const [current_path, set_current_path] = useState(pathname);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        set_current_path(pathname);
    }, [pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {items.map((i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                    <span className="text-gray-400 font-light my-4">{i.title}</span> {/* Removed hidden lg:block */}
                    {i.items.slice(0).map((item) => {
                        return item.visible.includes(role) &&
                            (item.href !== '/logout' ? (
                                <LoadLink
                                    is_sidebar_link={'true'}
                                    href={`/${route(item.href, role)}`}
                                    key={item.label}
                                    className={cn(
                                        'flex items-center justify-start gap-4 text-gray-500 py-2 px-2 md:px-2 rounded-md hover:bg-gainsboro',
                                        { 'bg-gainsboro': current_path === `/${route(item.href, role)}` }
                                    )}
                                >
                                    {typeof item.icon === 'string' ? <Image src={item.icon} alt="" width={20} height={20} /> : item.icon}
                                    <span>{item.label}</span>
                                </LoadLink>
                            ) : (
                                <Button
                                    onClick={async () => await signOut()}
                                    variant={'ghost'}
                                    key={item.label}
                                    className="flex items-center justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gainsboro"
                                >
                                    <Image src={item.icon as string} alt="" width={20} height={20} />
                                    <span>{item.label}</span>
                                </Button>
                            ));
                    })}
                </div>
            ))}
            {isMobile && (
                <button
                    onClick={() => {
                        if (typeof window !== 'undefined') {
                            window.dispatchEvent(new CustomEvent('closeSidebar'));
                        }
                    }}
                    className="absolute top-5 right-4 bg-gray-200 rounded-full p-2"
                >
                    <XIcon />
                </button>
            )}
        </>
    );
}