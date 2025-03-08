'use client'
import  { Modal } from "@/components/ui/modal";
import useParentStore from "@/stores/parents/use-parent-store";
import ParentForm from "@/app/(dashboard)/admin/parents/components/parent-form";


export default function ParentModal(){
   // const {close,open} = useSchoolModalStore();
    const store = useParentStore();
    const { is_update_modal_open } = useParentStore();

    //useEffect(()=>{
        //console.log(is_update_modal_open);
    //},[is_update_modal_open])
    
    return <Modal is_open={is_update_modal_open} on_close_action={store.close_update_modal} title={`Create/Update Parent`} description={`Create a new Parent or update an already existing one`} classes="md:max-w-screen-md lg:max-w-[90%] xl:max-w-[90%]"> 

        <ParentForm />

    </Modal>
}