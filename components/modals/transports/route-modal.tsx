'use client'
import  { Modal } from "@/components/ui/modal";
import React from "react";
import useTransportStore from "@/stores/transport/use-route-store";
import TransportForm from "@/app/(dashboard)/admin/(transportation)/components/transport-form";
//import



const RouteModal:React.FC = ()=>{
    const store = useTransportStore();
    const { is_update_modal_open } = useTransportStore();

    //useEffect(()=>{
        //console.log(is_update_modal_open);
    //},[is_update_modal_open])
    
    return <Modal is_open={is_update_modal_open} on_close_action={store.close_update_modal} title={`Create/Update Route`} description={`Create a new Route or update an already existing one`} classes="md:max-w-screen-md lg:max-w-[90%] xl:max-w-[90%]"> 

        <TransportForm />

    </Modal>
}

export default RouteModal;