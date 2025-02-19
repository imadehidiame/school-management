'use client';
import { useEffect, useState } from "react";
import SessionModal from "../modals/session-modal";

export default function SessionModalProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted)
        return null;

    return <SessionModal />

}