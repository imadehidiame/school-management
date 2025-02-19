'use client'
import { Modal } from "@/components/ui/modal";
//import useSchoolModalStore from "@/stores/use-school-modal-store";
//import { Label } from "@/components/ui/label";
//import { Input } from "@/components/ui/input";
import useSchoolSessionStore from "@/stores/school-settings/use-session-store";
import SessionForm from "@/app/(dashboard)/admin/school-settings/components/forms/session-form";

export default function SessionModal(){
    const {is_open,close} = useSchoolSessionStore() 
    return <Modal is_open={is_open} on_close_action={close} title={`Create/Update Session`} description={`Create a new session or update an existing one`}>

        <SessionForm /> 

    </Modal>
}