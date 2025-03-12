'use client';

import Link from "next/link";
import { LinkProps } from "next/link";
import { LoadAnimation } from "./loader/loading-anime";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
    children:React.ReactNode;
    className?:string;
    is_sidebar_link?:string;
}



export default function LoadLink(props:Props){
    const pathname = usePathname();
    useEffect(()=>{
        if(!LoadAnimation.is_animation_invisible('bar'))
            LoadAnimation.hide('bar');
    },[pathname]);
    return <Link {...props} onClick={()=>{
        LoadAnimation.show('bar');
        if(typeof window !== 'undefined'){
            //window.dispatchEvent(new CustomEvent(''));
            if(window.innerWidth < 1024 && props.is_sidebar_link !== undefined && props.is_sidebar_link === 'true')
            window.dispatchEvent(new CustomEvent('closeSidebar'));
        }
    }}>{props.children}</Link> 
}

   