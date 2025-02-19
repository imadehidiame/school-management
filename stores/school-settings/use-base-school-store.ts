import { BaseSchoolCategory } from '@prisma/client'
import { z } from 'zod';
import { create } from 'zustand'

interface SchoolSettingsState {
    data: BaseSchoolCategory | null;
    setData: (settings: BaseSchoolCategory | null) => void;
  }

interface StoreState {
    data:BaseSchoolCategory|null;
    setData:(new_data:BaseSchoolCategory|null)=>void
}

const base_school_schema = z.object({
        school_naming:z.string().nonempty({message:'Enter the conventional school name'}).trim(),
        section_naming: z.string().nonempty({message:'Enter the conventional section name'}).trim(),
        class_naming:z.string().nonempty({message:'Enter the conventional class name'}).trim(),
        arm_naming:z.string().nonempty({message:'Enter the conventional arm name'}).trim()
    });

const useBaseSchoolStore = create<SchoolSettingsState>((set,get)=>({
    data:null,
    setData:(new_data)=>set({data:new_data})
}))

export default useBaseSchoolStore;