'use client';
//import { prisma } from "@/prisma";
import { useSession } from "next-auth/react";
import axios from 'axios';
import { useEffect } from "react";
import Error from "./components/err_page";
import LoginPage from "./components/login";

export default function UserValid(){
    const {update,data:session,status} = useSession();
    console.log('User data ',session);
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