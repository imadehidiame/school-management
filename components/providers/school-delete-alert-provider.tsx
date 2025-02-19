'use client';
import SchoolDeleteModal from "@/components/school-delete-modal";
import { useEffect, useState } from "react";

export default function SchoolDeleteAlertProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    },[]);
    
    if(!is_mounted)
        return null;

    return <SchoolDeleteModal />

}