'use client';
//import { prisma } from "@/prisma";
//import { useSession } from "next-auth/react";
import Error from "./components/err_page";

export default function UserValid(){
    /*useEffect(()=>{
        const fetch = async()=>{
            try {
                const response = await axios.get('/api/get_user_data');
                console.log("response ",response);    
            } catch (error) {
                console.log('error ',error);
            }
            

        }
        fetch();

    },[session,update]);*/

    //const user = await prisma.user.findFirst({where:{email:session?.user?.email}});
    //console.log('user value ',user);
    //console.log('Status ',status);
    return (
        <Error />
        
      );    
}