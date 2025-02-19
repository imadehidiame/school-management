import { SectionData } from '@/definitions/school/section-data';
import axios_request from '@/lib/axios_request';
import { SchoolSections } from '@prisma/client';
import { create } from 'zustand';

interface StoreState {
    id:string,
    setId:(new_id:string)=>void,
    schoolSection:()=>SectionData|null|undefined,
    schoolSections:SectionData[],
    addSchoolSection:(school_section:SectionData)=>void,
    setSchoolSections:(data:SectionData[])=>void,
    getOne:(id:string)=>SectionData|undefined,
    updateSchoolSection:(id:string,data:SectionData)=>void,

    is_update_modal_open:boolean,
    close_update_modal:()=>void,
    open_update_modal:()=>void,

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    delete_section:(id:string)=>Promise<any>
}

const useSchoolSectionStore = create<StoreState>((set,get)=>({
    is_update_modal_open:false,
    close_update_modal:()=>{
        set({id:''});
        set({is_update_modal_open:false});
        
      },
    open_update_modal:()=>set((state)=>({is_update_modal_open:true})),
    updateSchoolSection:async (id,data) => {
        set((state)=>({schoolSections:state.schoolSections.map(e=>e.id === id ? data:e)}));
    },
    id:'',
    setId:(new_id)=>set({id:new_id}),
    schoolSection:()=>get().schoolSections.find((e)=>e.id === get().id),
    schoolSections:[],
    setSchoolSections:(new_sections)=>set({schoolSections:new_sections}),
    addSchoolSection:(new_data)=>set((state)=>({schoolSections:[...state.schoolSections,new_data]})),
    getOne:(id)=>get().schoolSections.find(e=>e.id === id),
    is_modal_open:false,
    close_modal:()=>{
        set({is_modal_open:false});
        set({id:''});
    },
    open_modal:()=>set((state)=>({is_modal_open:true})),
    delete_section:async (id) => {
        
        try {
    const {data,error} = await axios_request(`/api/school-section/${id}`,'delete',undefined,undefined,{message:'Information successfully deleted',cb(data) {},},(error)=>{
                console.log(error);
            },true);
            if(error){
                return Promise.reject(error); 
            }
            set({schoolSections:get().schoolSections.filter(e=>e.id !== id)});
            set({id:''});
            set({is_modal_open:false}); 
            return Promise.resolve(data);
            
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

        
    }
}));

export default useSchoolSectionStore;