'use client'
import  { Modal } from "@/components/ui/modal";
import useVehicleStore from "@/stores/transport/use-vehicle-store";
import React from "react";
import VehicleForm from "@/app/(dashboard)/admin/(transportation)/components/vehicle-form";
//import



const VehicleModal:React.FC = ()=>{
    const store = useVehicleStore();
    const { is_update_modal_open } = useVehicleStore();

    //useEffect(()=>{
        //console.log(is_update_modal_open);
    //},[is_update_modal_open])
    
    return <Modal is_open={is_update_modal_open} on_close_action={store.close_update_modal} title={`Create/Update Vehicle`} description={`Create a new Vehicle or update an already existing one`} classes="md:max-w-screen-md lg:max-w-[90%] xl:max-w-[90%]"> 

        <VehicleForm />

    </Modal>
}

export default VehicleModal;