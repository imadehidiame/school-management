'use client';

import Link from "next/link";
import { LinkProps } from "next/link";
import { LoadAnimation } from "./loader/loading-anime";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
    children:React.ReactNode;
    className?:string
}



export default function LoadLink(props:Props){
    const pathname = usePathname();
    useEffect(()=>{
        if(!LoadAnimation.is_animation_invisible('bar'))
            LoadAnimation.hide('bar');
    },[pathname]);
    return <Link {...props} onClick={()=>{
        LoadAnimation.show('bar');
    }}>{props.children}</Link> 
}

   