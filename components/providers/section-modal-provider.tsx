'use client';
//import SchoolModal from "@/components/modals/school-modal";
import SectionModal from "@/components/modals/section-modal";
import { useEffect, useState } from "react";

export default function SectionModalProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted) 
        return null;

    return <SectionModal />

}