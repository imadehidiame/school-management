'use client';
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Logout(){
    useEffect(()=>{
        const log_out = async ()=>{
            await signOut();
        }
        log_out()
    },[]);
    //signOut();
    return null;
}