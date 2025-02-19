'use client';
import { AlertModal } from "@/components/modals/alert-modal";
import useArmStore from "@/stores/school-settings/use-arm-store";
//import useSchoolSectionStore from "@/stores/use-school-section-store";
//import useSchoolStore from "@/stores/use-school-store";
import { useState } from "react";
//import toast from "react-hot-toast";

export default function ArmDeleteModal(){
    const [loading,set_loading] = useState(false);
    //const [page,set_page] = useState(false);
    const store = useArmStore();
    //const school_store = useSchoolStore();
    /*useEffect(()=>{
        set_page(true)
    },[]);*/

    //if(!page)
        //return null;

    const on_confirm = async ()=>{
        set_loading(true);
        try {
            console.log('id value ',useArmStore.getState().id);
            const res = await store.delete_arm(useArmStore.getState().id);
        } catch (error) {
            set_loading(false)
        }finally{
            set_loading(false)
        }
    }

    return <AlertModal is_open={store.is_modal_open} loading={loading} on_close={store.close_modal} on_confirm={on_confirm} />

}