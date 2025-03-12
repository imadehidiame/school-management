//import { SectionData } from '@/definitions/school/section-data';
import { Parent } from '@prisma/client';
import axios_request from '@/lib/axios_request';

import { create } from 'zustand';
import { ModalLoadingAnimation } from '@/components/ui/loader/loading-anime';

interface StoreState {
    id:string,
    current_parent:Parent|null,
    setId:(new_id:string)=>void,
    asyncSetId:(new_id:string)=>Promise<void>,
    setParent:( parent:Parent )=>void,
    parent:()=>Parent|null|undefined,
    parents:Parent[],
    addParent:(parent:Parent)=>void,
    setParents:(data:Parent[])=>void,
    getOne:(id:string)=>Parent|undefined,
    updateParent:(id:string,data:Parent)=>void,

    is_update_modal_open:boolean,
    close_update_modal:()=>void,
    open_update_modal:()=>void,

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    delete_parent:(id:string)=>Promise<any>
}

const useParentStore = create<StoreState>((set,get)=>({
    is_update_modal_open:false,
    close_update_modal:()=>{
        set({id:''});
        set({is_update_modal_open:false});
        
      },
    open_update_modal:()=>{
        //console.log('is modal update value ',get().is_update_modal_open);
        set((state)=>({is_update_modal_open:true}))
        //console.log('is modal update value ',get().is_update_modal_open);
    },
    updateParent:async (id,data) => {
        set((state)=>({parents:state.parents.map(e=>e.id === id ? data:e)}));
    },
    id:'',
    current_parent:null,
    asyncSetId:async (new_id)=>{
        set({id:new_id});
    },
    setId:(new_id)=>{
        set({id:new_id})
        if(get().parents){
            set({current_parent:get().getOne(new_id)})
        }
    },
    setParent:(new_id)=>set({current_parent:new_id}),
    parent:()=>get().parents.find((e)=>e.id === get().id),
    parents:[],
    setParents:(new_parents)=>set({parents:new_parents}),
    addParent:(new_data)=>set((state)=>({parents:[...state.parents,new_data]})),
    getOne:(id)=>get().parents.find(e=>e.id === id),
    is_modal_open:false,
    close_modal:()=>{
        set({is_modal_open:false});
        set({id:''});
    },
    open_modal:()=>set((state)=>({is_modal_open:true})),
    delete_parent:async (id) => {
        
        try {
    const {data,error} = await axios_request(`/api/parent/${id}`,'delete',undefined,undefined,undefined,true,()=>{
                ModalLoadingAnimation.show('circular');
            },()=>{
                ModalLoadingAnimation.hide('circular');
            });
            if(error){ 
                return Promise.reject(error); 
            }
            set({parents:get().parents.filter(e=>e.id !== id)});
            set({id:''});
            set({is_modal_open:false}); 
            return Promise.resolve(data);
            
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

        
    } 
}));

export default useParentStore;