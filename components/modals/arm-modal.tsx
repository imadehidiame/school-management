'use client'
import { Modal } from "@/components/ui/modal";
//import useSchoolModalStore from "@/stores/use-school-modal-store";
//import { Label } from "@/components/ui/label";
//import { Input } from "@/components/ui/input";
//import useSectionModalStore from "@/stores/use-section-modal-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
//import SectionForm from "@/app/(dashboard)/admin/school-settings/components/forms/section-form";
//import useSchoolSectionStore from "@/stores/use-school-section-store";
//import useClassStore from "@/stores/use-class-store";
//import ClassForm from "@/app/(dashboard)/admin/school-settings/components/forms/class-form";
// md:max-w-screen-md lg:max-w-screen-lg xl:max-w-full
import useArmStore from "@/stores/school-settings/use-arm-store";
import ArmForm from "@/app/(dashboard)/admin/school-settings/components/forms/arm-form";

export default function ArmModal(){
   // const {close,open} = useSchoolModalStore();
    const store = useArmStore();
    const base_store = useBaseSchoolStore(); 
    return <Modal is_open={store.is_update_modal_open} on_close_action={store.close_update_modal} title={`Create/Update ${useBaseSchoolStore.getState().data?.arm_naming}`} description={`Create a new ${base_store.data?.arm_naming} or update an already existing one`}> 

        <ArmForm />

    </Modal>
}