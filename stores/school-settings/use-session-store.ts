import { ModalLoadingAnimation } from "@/components/ui/loader/loading-anime";
import axios_request from "@/lib/axios_request";
import { SchoolSessions } from "@prisma/client";
import { create } from "zustand";

interface StoreState {
  is_open: boolean;
  open: () => void;
  close: () => void;
  is_delete_modal_open: boolean;
  open_delete_modal: () => void;
  close_delete_modal: () => void;
  id: string;
  set_id: (new_id: string) => void;
  sessions: SchoolSessions[];
  set_sessions: (sessions: SchoolSessions[]) => void;
  current_session: ()=> SchoolSessions | undefined | null;
  session: ()=> SchoolSessions | undefined | null;
  add_session: (session: SchoolSessions) => Promise<void>;
  delete_session: (id: string) => Promise<any>;
  update_session: (id: string) => Promise<any>;
}

const useSchoolSessionStore = create<StoreState>((set, get) => ({  
    id: '',
    set_id: (new_id) => set({ id: new_id }), 
    is_open: false,
    open: () => set({ is_open: true }),
    close: () => set({ is_open: false }),
    is_delete_modal_open: false,
    open_delete_modal: () => set({ is_delete_modal_open: true }),
    close_delete_modal: () => set({ is_delete_modal_open: false }),
    sessions: [],
    set_sessions: (sessions) => set({ sessions }),
    session:()=>get().sessions.find((e) => e.id === get().id),
    current_session:()=>get().sessions.find((e) => e.is_selected === 1),
    add_session: async (session) => {
        /*console.log('Session value ',session);
        const init_lent = get().sessions.length;
        console.log('Length of sessions ',init_lent);*/
        set((state) => ({ sessions: [...state.sessions, session] }))
        /*const final_lent = get().sessions.length;
        console.log('Length of sessions after ',final_lent);
        const is_equal_lengths = init_lent === final_lent;
        console.log(`is session length increased ${is_equal_lengths}`);
        const all_sessions = get().sessions;*/
        //set({ sessions: all_sessions });
    },
    delete_session: async (id) => {
        try {
         const {error} = await axios_request(`/api/school-session/${id}`, 'delete', undefined, undefined, undefined, true,()=>{
                     ModalLoadingAnimation.show('circular');
                 },()=>{
                     ModalLoadingAnimation.hide('circular');
                 });
        if(!error){
            set({ sessions: get().sessions.filter(e => e.id !== id) });
            set({ id: '' });
            set({ is_delete_modal_open: false }); 
        }
        } catch (error) {
        console.log(error);
        }
    },
    update_session: async (id) => {
        const check = get().sessions.find(e=>e.id === id);
        if(check?.is_selected === 1)
        return;
        try {
         const {data,error} = await axios_request(`/api/school-session/${id}`, 'patch', undefined, undefined, { message: 'Current session has been set to '+check?.session, cb(data) { }, }, true);
        if(!error){
            set({ sessions: data.session_data });
            //set({ id: '' });
            //set({ is_delete_modal_open: false });
        }
        

        } catch (error) {
        console.log(error);
        }
    }   
}));    

export default useSchoolSessionStore;