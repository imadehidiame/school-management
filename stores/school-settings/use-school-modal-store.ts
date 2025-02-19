import { create } from 'zustand';

interface StoreState {
    is_open:boolean,
    open:()=>void,
    close:()=>void
}

const useSchoolModalStore = create<StoreState>((set,get)=>({
    is_open:false,
    open:()=>set({is_open:true}),
    close:()=>{
        set({is_open:false})
    }
}))

export default useSchoolModalStore;