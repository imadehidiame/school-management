'use client';
import { AlertModal } from "@/components/modals/alert-modal";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import { useState } from "react";
//import toast from "react-hot-toast";

export default function SchoolDeleteModal(){
    const [loading,set_loading] = useState(false);
    //const [page,set_page] = useState(false);
    const section_store = useSchoolSectionStore();
    const store = useSchoolStore();
    

    const on_confirm = async ()=>{
        set_loading(true);
        const res = await store.delete_school(useSchoolStore.getState().id);
        set_loading(false)
        //store.close_modal();
        section_store.setSchoolSections(res.sections);
        //store.setSchools(res.school);
        //toast.success('')
    }

    return <AlertModal is_open={store.is_modal_open} loading={loading} on_close={store.close_modal} on_confirm={on_confirm} />

}