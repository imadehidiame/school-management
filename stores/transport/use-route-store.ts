//import { SectionData } from '@/definitions/school/section-data';
import { Transport as TransportData, Vehicle } from '@prisma/client';
import axios_request from '@/lib/axios_request';

import { create } from 'zustand';
import { ModalLoadingAnimation } from '@/components/ui/loader/loading-anime';
import { ITransport } from '@/definitions/transport/interface';

interface Transport extends TransportData {
    vehicles:{vehicle:Vehicle}[];
    vehicle_ids:string[]; 
}

interface StoreState {
    id:string,
    current_transport:ITransport|null,
    setId:(new_id:string)=>void,
    setTransport:( transport:ITransport )=>void,
    transport:()=>ITransport|null|undefined,
    transports:ITransport[],
    addTransport:(transport:ITransport)=>void,
    setTransports:(data:ITransport[])=>void,
    getOne:(id:string)=>ITransport|undefined,
    updateTransport:(id:string,data:ITransport)=>void,

    is_update_modal_open:boolean,
    close_update_modal:()=>void,
    open_update_modal:()=>void,

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    delete_transport:(id:string)=>Promise<any>
}

const useTransportStore = create<StoreState>((set,get)=>({
    is_update_modal_open:false,
    close_update_modal:()=>{
        set({id:''});
        set({is_update_modal_open:false});
        set({current_transport:null});
        
      },
    open_update_modal:()=>{
        //console.log('is modal update value ',get().is_update_modal_open);
        set((state)=>({is_update_modal_open:true}))
        //console.log('is modal update value ',get().is_update_modal_open);
    },
    updateTransport:async (id,data) => {
        set((state)=>({transports:state.transports.map(e=>e.id === id ? data:e)}));
    },
    id:'',
    current_transport:null,
    setId:(new_id)=>{
        set({id:new_id})
        if(get().transports){
            set({current_transport:get().getOne(new_id)})
        }
    },
    setTransport:(new_id)=>set({current_transport:new_id}),
    transport:()=>get().transports.find((e)=>e.id === get().id),
    transports:[],
    setTransports:(new_transports)=>set({transports:new_transports}),
    addTransport:(new_data)=>set((state)=>({transports:[...state.transports,new_data]})),
    getOne:(id)=>get().transports.find(e=>e.id === id),
    is_modal_open:false,
    close_modal:()=>{
        set({is_modal_open:false});
        set({id:''});
    },
    open_modal:()=>set((state)=>({is_modal_open:true})),
    delete_transport:async (id) => {
        
        try {
    const {data,error} = await axios_request(`/api/transport/${id}`,'delete',undefined,undefined,undefined,true,()=>{
                ModalLoadingAnimation.show('circular');
            },()=>{
                ModalLoadingAnimation.hide('circular');
            });
            if(error){ 
                return Promise.reject(error); 
            }
            set({transports:get().transports.filter(e=>e.id !== id)});
            set({id:''});
            set({is_modal_open:false}); 
            return Promise.resolve(data);
            
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

        
    } 
}));

export default useTransportStore;