'use client';
import { AlertModal } from "@/components/modals/alert-modal";
import useArmStore from "@/stores/school-settings/use-arm-store";
import useClassStore from "@/stores/school-settings/use-class-store";
//import useSchoolSectionStore from "@/stores/use-school-section-store";
//import useSchoolStore from "@/stores/use-school-store";
import { useState } from "react";
//import toast from "react-hot-toast";

export default function ClassDeleteModal(){
    const [loading,set_loading] = useState(false);
    //const [page,set_page] = useState(false);
    const store = useClassStore();
    //const school_store = useSchoolStore();
    /*useEffect(()=>{
        set_page(true)
    },[]);*/

    //if(!page)
        //return null;

    const on_confirm = async ()=>{
        set_loading(true);
        const res = await store.delete_class(useClassStore.getState().id);
        console.log('Response from delete class ',res);
        console.log('response from delete class ',res.arm_data);
        useArmStore.getState().setArmData(res.arm_data); 
        set_loading(false)
        //store.close_modal();
        //store.setSchoolSections(res.school);
        //school_store.setSchools(res.school);
        //toast.success('')
    }

    return <AlertModal is_open={store.is_modal_open} loading={loading} on_close={store.close_modal} on_confirm={on_confirm} />

}