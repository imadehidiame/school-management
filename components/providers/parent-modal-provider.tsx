'use client';
import { useEffect, useState } from "react";
import ParentModal from "../modals/parent-modal";

export default function ParentModalProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    });
    
    //if(!is_mounted) 
       // return null;

    return <ParentModal />

}