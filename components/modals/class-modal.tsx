'use client'
import { Modal } from "@/components/ui/modal";
//import useSchoolModalStore from "@/stores/use-school-modal-store";
//import { Label } from "@/components/ui/label";
//import { Input } from "@/components/ui/input";
//import useSectionModalStore from "@/stores/use-section-modal-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
//import SectionForm from "@/app/(dashboard)/admin/school-settings/components/forms/section-form";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useClassStore from "@/stores/school-settings/use-class-store";
import ClassForm from "@/app/(dashboard)/admin/school-settings/components/forms/class-form";

export default function ClassModal(){
   // const {close,open} = useSchoolModalStore();
    const store = useClassStore();
    const base_store = useBaseSchoolStore(); 
    return <Modal is_open={store.is_update_modal_open} on_close_action={store.close_update_modal} title={`Create/Update ${useBaseSchoolStore.getState().data?.class_naming}`} description={`Create a new ${base_store.data?.class_naming} or update an already existing one`}> 

        <ClassForm />

    </Modal>
}