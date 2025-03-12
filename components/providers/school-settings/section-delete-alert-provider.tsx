'use client';
import SectionDeleteModal from "@/components/modals/school-settings/section-delete-modal";
import { useEffect, useState } from "react";

export default function SectionDeleteAlertProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted)
        return null;

    return <SectionDeleteModal />

}