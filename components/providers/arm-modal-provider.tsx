'use client';
//import SchoolModal from "@/components/modals/school-modal";
//import SectionModal from "@/components/modals/section-modal";
import { useEffect, useState } from "react";
//import ClassModal from "../modals/class-modal";
import ArmModal from "../modals/arm-modal";

export default function ArmModalProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted) 
        return null;

    return <ArmModal />

}