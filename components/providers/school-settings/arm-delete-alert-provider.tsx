'use client';
//import SectionDeleteModal from "@/components/section-delete-modal";
import { useEffect, useState } from "react";
import ArmDeleteModal from "@/components/modals/school-settings/arm-delete-modal";

export default function ArmDeleteAlertProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted)
        return null;

    return <ArmDeleteModal />

}