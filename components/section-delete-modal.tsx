'use client';
import { AlertModal } from "@/components/modals/alert-modal";
import useClassStore from "@/stores/school-settings/use-class-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import { useEffect, useState } from "react";
//import toast from "react-hot-toast";

export default function SectionDeleteModal(){
    const [loading,set_loading] = useState(false);
    const [page,set_page] = useState(false);
    const store = useSchoolSectionStore();
    const school_store = useSchoolStore();
    /*useEffect(()=>{
        set_page(true)
    },[]);*/

    //if(!page)
        //return null;

    const on_confirm = async ()=>{
        set_loading(true);
        const res = await store.delete_section(useSchoolSectionStore.getState().id);
        set_loading(false)
        useClassStore.getState().setClassData(res.class_data); 
        //store.close_modal();
        //store.setSchoolSections(res.school);
        //school_store.setSchools(res.school);
        //toast.success('')
    }

    return <AlertModal is_open={store.is_modal_open} loading={loading} on_close={store.close_modal} on_confirm={on_confirm} /> 

}