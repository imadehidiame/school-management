'use client';
import { useEffect, useState } from "react";
//import ParentModal from "../modals/parent-modal";
//import VehicleModal from "@/components/modals/transports/vehicle-modal";
import RouteModal from "@/components/modals/transports/route-modal";

export default function RouteModalProvider(){
    const [is_mounted,set_is_mounted] = useState(false);
    useEffect(()=>{
        set_is_mounted(true);
    });
    
    //if(!is_mounted) 
       // return null;

    return <RouteModal />

}