import { create  } from 'zustand';
import { School } from '@prisma/client';
import axios_request from '@/lib/axios_request';
import useSchoolSectionStore from './use-school-section-store';

interface SchoolState {  // Define an interface for your state
    id: string;
    setId: (newId: string) => void;
    schools: School[];
    setSchools: (newSchools: School[]) => void;
    school: () => School | undefined; // Add undefined to return type
    getOne:(id:string)=>School | undefined;
    addSchool:(new_school:School)=>void;
    updateSchool:(id:string,school:School)=>void;

    is_modal_open:boolean,
    close_modal:()=>void,
    open_modal:()=>void,
    is_deleting:boolean,
    delete_error:Error|null,
    delete_school:(id:string)=>Promise<any>

  is_update_modal_open:boolean,
  open_update_modal:()=>void,
  close_update_modal:()=>void
  }
  
  const useSchoolStore = create<SchoolState>((set, get) => ({ // Type the create function
    id: '',
    addSchool:(school_)=>{
      set({schools:[...get().schools,school_]});
      //set((state)=>({schools:[...state.schools,...[school_]]}));
      //get().setSchools([...get().schools,...[school_]]);
    },
    setId: (newId) => set({ id: newId }),
    schools: [],
    setSchools: (newSchools) => set({ schools: newSchools }),
    school: () => get().schools.find((school) => school.id === get().id),
    getOne:(id)=>get().schools.find(e=>e.id === id),
    updateSchool:(id,school)=>{
      set((state)=>({schools:state.schools.map(e=>e.id === id ? school : e )}))
    },
    is_update_modal_open:false,
    open_update_modal:()=>set({is_update_modal_open:true}),
    close_update_modal:()=>{
      set({id:''});
      set({is_update_modal_open:false});
      
    },
    
    is_deleting:false,
    delete_error:null,
    is_modal_open:false,
        close_modal:()=>{
          set({is_modal_open:false});
          set({id:''});
      },
        open_modal:()=>set((state)=>({is_modal_open:true})),
        delete_school:async (id) => {
            set({is_deleting:true});

            try {
            
            const {data,error} = await axios_request(`/api/school/${id}`,'delete',undefined,undefined,{message:'Information successfully deleted',cb(data) {
                
            },},(error)=>{
              set({delete_error:error})
              console.log(error);
            },true);
            set({is_deleting:false});
            set((state)=>({schools:state.schools.filter(e=>e.id !== id)}));
            get().close_modal();
            //console.log('Data from server ',data);
            return Promise.resolve(data); 

            } catch (error) {
              return Promise.reject(error);
            }finally{
              set({is_deleting:false});
            }
            
          }
  }));
  
  export default useSchoolStore;