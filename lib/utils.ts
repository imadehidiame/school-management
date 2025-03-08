
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import NodeCache from 'node-cache';
//import {  }

const cache = new NodeCache({stdTTL:3600,checkperiod:120});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
//const emails = ['imadehidiame@gmail.com','ehimade@gmail.com'];
//const role = [];

export function generate_rand(){
  return Date.now().toString()+'_'+(Math.floor(Math.random()*1000000)).toString();
}

export async function is_profile_set() {
  //prisma.user.findFirst({select:{ro}})
  //const user = await AdminSessionDB.get({email},{role:true,name:true},false) as { role?: boolean; name?: string } | null;
  //return check_profile(email);
  /*let user = await prisma.user.findFirst({
    select:{
      role:true,
      name:true
    },
    where:{
      email
    }
  });*/

 //let user = 

  console.log('Function called=====');
  /*return {
    role:role.length>0,
    name:emails.includes(email)
  }*/
  return {
    
  }
}

export function memoize_util(fn:Function):Function{
  //const cache = new Map();
  return async function (...args:unknown[]){
     const key = JSON.stringify(args);
     console.log('cache key ',key);
     const cached_value = cache.get(key);
     if(cached_value){
      console.log('Cache has key');
      return cached_value;
     } 
     const res = await fn(...args);
     cache.set(key,res);
     //console.log('res value ', res instanceof Promise ? await res : res);
     console.log('res value ', res);
     return res;
  }
}

