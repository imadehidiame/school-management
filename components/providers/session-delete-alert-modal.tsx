'use client';
//import SectionDeleteModal from "@/components/section-delete-modal";
import { useEffect, useState } from "react";
//import ArmDeleteModal from "../arm-delete-modal";
import SessionDeleteModal from "../session-delete-modal";

export default function SessionDeleteAlertProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted)
        return null;

    return <SessionDeleteModal />

}