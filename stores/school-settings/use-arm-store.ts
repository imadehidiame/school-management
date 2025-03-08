import axios_request from '@/lib/axios_request';
import { create } from 'zustand';
import { ArmData } from '@/definitions/school/arm-data';
import { ModalLoadingAnimation } from '@/components/ui/loader/loading-anime';

interface StoreState {
    id:string,
    setId:(new_id:string)=>void,
    armDatum:()=>ArmData|null|undefined,
    armData:ArmData[],
    addArmDatum:(arm_datum:ArmData)=>void,
    setArmData:(data:ArmData[])=>void,
    getOne:(id:string)=>ArmData|undefined,
    updateArmData:(id:string,data:ArmData)=>void,

    is_update_modal_open:boolean,
    close_update_modal:()=>void,
    open_update_modal:()=>void,

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    delete_arm:(id:string)=>Promise<any>
}

const useArmStore = create<StoreState>((set,get)=>({
    is_update_modal_open:false,
    close_update_modal:()=>{
        set({id:''});
        set({is_update_modal_open:false});
        
      },
    open_update_modal:()=>set((state)=>({is_update_modal_open:true})),
    updateArmData:async (id,data) => {
        set((state)=>({armData:state.armData.map(e=>e.id === id ? data:e)}));
    },
    id:'',
    setId:(new_id)=>set({id:new_id}),
    armDatum:()=>get().armData.find((e)=>e.id === get().id),
    armData:[],
    setArmData:(new_arms)=>set({armData:new_arms}),
    addArmDatum:(new_data)=>set((state)=>({armData:[...state.armData,new_data]})), 
    getOne:(id)=>get().armData.find(e=>e.id === id),
    is_modal_open:false,
    close_modal:()=>{
        set({is_modal_open:false});
        set({id:''});
    },
    open_modal:()=>set((state)=>({is_modal_open:true})),
    delete_arm:async (id) => {
        console.log('ID in state ',id);
        try {
    const {data,error} = await axios_request(`/api/class-arm/${id}`,'delete',undefined,undefined,undefined,true,()=>{
                ModalLoadingAnimation.show('circular');
            },()=>{
                ModalLoadingAnimation.hide('circular');
            });
            if(error){
                return Promise.reject(error);
            }
            set({armData:get().armData.filter(e=>e.id !== id)});
            set({id:''});
            set({is_modal_open:false});
            return Promise.resolve(data);
            
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

        
    }
}));

export default useArmStore;