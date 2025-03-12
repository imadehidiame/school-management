'use client';
import SchoolModal from "@/components/modals/school-settings/school-modal";
import { useEffect, useState } from "react";

export default function SchoolModalProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted)
        return null;

    return <SchoolModal />

}