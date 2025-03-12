'use client';
import { AlertModal } from "@/components/modals/alert-modal";
import useSchoolSessionStore from "@/stores/school-settings/use-session-store";
import { useState } from "react";
//import toast from "react-hot-toast";

export default function SessionDeleteModal(){
    const [loading,set_loading] = useState(false);
    //const [page,set_page] = useState(false);
    const store = useSchoolSessionStore();
    //const school_store = useSchoolStore();
    /*useEffect(()=>{
        set_page(true)
    },[]);*/

    //if(!page)
        //return null;

    const on_confirm = async ()=>{
        set_loading(true); 
        try {
            //console.log('id value ',useArmStore.getState().id);
            await store.delete_session(useSchoolSessionStore.getState().id);
        } catch (error) {
            console.log(error)
            set_loading(false)
        }finally{
            set_loading(false)
        }
    }

    return <AlertModal is_open={store.is_delete_modal_open} loading={loading} on_close={store.close_delete_modal} on_confirm={on_confirm} />

}