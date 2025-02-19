'use client'
import { Modal } from "@/components/ui/modal";
//import useSchoolModalStore from "@/stores/use-school-modal-store";
//import { Label } from "@/components/ui/label";
//import { Input } from "@/components/ui/input";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolStore from "@/stores/school-settings/use-school-store"; 
import SchoolForm from "@/app/(dashboard)/admin/school-settings/components/forms/school-form";

export default function SchoolModal(){
    const {close_update_modal,is_update_modal_open} = useSchoolStore() 
    return <Modal is_open={is_update_modal_open} on_close_action={close_update_modal} title={`Create/Update ${useBaseSchoolStore.getState().data?.school_naming}`} description={`Create a new ${useBaseSchoolStore.getState().data?.school_naming} or update an already created ${useBaseSchoolStore.getState().data?.school_naming}`}>

        <SchoolForm /> 

    </Modal>
}