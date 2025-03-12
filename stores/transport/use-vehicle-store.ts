//import { SectionData } from '@/definitions/school/section-data';
import { Transport, Vehicle } from '@prisma/client';
import axios_request from '@/lib/axios_request';
//ik8,
import { create } from 'zustand';
import { ModalLoadingAnimation } from '@/components/ui/loader/loading-anime';
import { IVehicle } from '@/definitions/transport/interface';

interface VehicleProps extends Vehicle {
    transports:{transport:Transport}[];
    trans?:string[]
}   

interface StoreState {
    id:string,
    current_vehicle:IVehicle|null,
    setId:(new_id:string)=>void,
    //asyncSetId:(new_id:string)=>Promise<void>,
    setCurrentVehicle:( vehicle:IVehicle )=>void,
    vehicle:()=>IVehicle|null|undefined,
    vehicles:IVehicle[],
    addVehicle:(vehicle:IVehicle)=>void,
    setVehicles:(data:IVehicle[])=>void,
    getOne:(id:string)=>IVehicle|undefined,
    updateVehicle:(id:string,data:IVehicle)=>void,

    is_update_modal_open:boolean,
    close_update_modal:()=>void,
    open_update_modal:()=>void,

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    delete_vehicle:(id:string)=>Promise<any>
}

const useVehicleStore = create<StoreState>((set,get)=>({
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
    updateVehicle:async (id,data) => {
        set((state)=>({vehicles:state.vehicles.map(e=>e.id === id ? data:e)}));
    },
    id:'',
    current_vehicle:null,
    setId:(new_id)=>{
        set({id:new_id})
        if(get().vehicles){
            set({current_vehicle:get().getOne(new_id)})
        }
    },
    setCurrentVehicle:(new_id)=>set({current_vehicle:new_id}),
    vehicle:()=>get().vehicles.find((e)=>e.id === get().id),
    vehicles:[],
    setVehicles:(new_vehicles)=>set({vehicles:new_vehicles}),
    addVehicle:(new_data)=>set((state)=>({vehicles:[...state.vehicles,new_data]})),
    getOne:(id)=>get().vehicles.find(e=>e.id === id),
    is_modal_open:false,
    close_modal:()=>{
        set({is_modal_open:false});
        set({id:''});
    },
    open_modal:()=>set((state)=>({is_modal_open:true})),
    delete_vehicle:async (id) => {
        
        try {
    const {data,error} = await axios_request(`/api/vehicle/${id}`,'delete',undefined,undefined,undefined,true,()=>{
                ModalLoadingAnimation.show('circular');
            },()=>{
                ModalLoadingAnimation.hide('circular');
            });
            if(error){ 
                return Promise.reject(error); 
            }
            set({vehicles:get().vehicles.filter(e=>e.id !== id)});
            set({id:''});
            set({is_modal_open:false}); 
            return Promise.resolve(data);
            
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }

        
    } 
}));

export default useVehicleStore;
//ik8,