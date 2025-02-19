import { BaseSchoolCategory } from '@prisma/client'
//import { z } from 'zod';
import { create } from 'zustand'

interface SchoolSettingsState {
    data: BaseSchoolCategory | null;
    setData: (settings: BaseSchoolCategory | null) => void;
  }



const useBaseSchoolStore = create<SchoolSettingsState>((set,get)=>({
    data:null,
    setData:(new_data)=>set({data:new_data})
}))

export default useBaseSchoolStore;