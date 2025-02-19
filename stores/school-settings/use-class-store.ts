//import { SectionData } from '@/definitions/school/section-data';
import { ClassData } from '@/definitions/school/class-data';
import axios_request from '@/lib/axios_request';
//import { SchoolSections } from '@prisma/client';
import { create } from 'zustand';

interface StoreState {
    id:string,
    setId:(new_id:string)=>void,
    classDatum:()=>ClassData|null|undefined,
    classData:ClassData[],
    addClassDatum:(class_datum:ClassData)=>void,
    setClassData:(data:ClassData[])=>void,
    getOne:(id:string)=>ClassData|undefined,
    updateClassData:(id:string,data:ClassData)=>void,

    is_update_modal_open:boolean,
    close_update_modal:()=>void,
    open_update_modal:()=>void,

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    delete_class:(id:string)=>Promise<any>
}

const useClassStore = create<StoreState>((set,get)=>({
    is_update_modal_open:false,
    close_update_modal:()=>{
        set({id:''});
        set({is_update_modal_open:false});
        
      },
    open_update_modal:()=>set((state)=>({is_update_modal_open:true})),
    updateClassData:async (id,data) => {
        set((state)=>({classData:state.classData.map(e=>e.id === id ? data:e)}));
    },
    id:'',
    setId:(new_id)=>set({id:new_id}),
    classDatum:()=>get().classData.find((e)=>e.id === get().id), 
    classData:[],
    setClassData:(new_classes)=>set({classData:new_classes}),
    addClassDatum:(new_data)=>set((state)=>({classData:[...state.classData,new_data]})),
    getOne:(id)=>get().classData.find(e=>e.id === id),
    is_modal_open:false,
    close_modal:()=>{
        set({is_modal_open:false});
        set({id:''});
    },
    open_modal:()=>set((state)=>({is_modal_open:true})),
    delete_class:async (id) => {
        
        try {
    const {data,error} = await axios_request(`/api/section-class/${id}`,'delete',undefined,undefined,{message:'Information successfully deleted',cb(data) {},},(error)=>{
                console.log(error);
            },true);
            if(error){
                return Promise.reject(error);
            }
            set({classData:get().classData.filter(e=>e.id !== id)});
            set({id:''});
            set({is_modal_open:false}); 
            return Promise.resolve(data);
            
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

        
    }
}));

export default useClassStore;