'use client';

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type item_options = {
    icon:string;
    label:string;
    href:string,
    visible:string[]
}

type items = {
    title:string;
    items:item_options[]
}

type items_array = items[]

const route = (url='',role='')=>{
  let ret = ''
  if(url == '/'){
    ret = `${role}`;
  }else {
    if(url.startsWith('/list'))
      ret = url.slice(1);
      else
      ret = `${role}${url}`;
  }
  return ret;
}


export default function MenuItems({items}:{items:items_array}){
    //const router = useRouter();
    const {data:session} = useSession();
    const role = session?.user.role as string;
    //console.log('Rerendered from menu');

    //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return (
        
        <>
         {
             items.map(
                (i) => (
                <div className="flex flex-col gap-2" key={i.title}>
                  <span className="hidden lg:block text-gray-400 font-light my-4">
                    {i.title}
                  </span>
                  {i.items.slice(0).map((item) => {
                    //if (item.visible.includes(role)) {

                    
                    //console.log(locs);

                    
                      return item.visible.includes(role) &&  (item.href !== '/logout' ?
                        <Link
                          href={`/${route(item.href,role)}`}
                          key={item.label}
                          className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gainsboro"
                        >
                          <Image src={item.icon} alt="" width={20} height={20} />
                          <span className="hidden lg:block">{item.label}</span>
                        </Link>

                        
                        :
                        <Button
                         onClick={async()=>await signOut()}
                          variant={'ghost'}
                          key={item.label}
                          className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-gainsboro"
                        >
                          <Image src={item.icon} alt="" width={20} height={20} />
                          <span className="hidden lg:block">{item.label}</span>
                        </Button>

                      );
                    //}
                  })}
                </div>
              ))   
            }
        </>
        
    );
}