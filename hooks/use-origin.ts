//'use client';
import { useEffect, useState } from "react"

type location_props = {
    origin:string|null
    href:string|null
    search:string|null
}

export const useOrigin = ()=>{
    const [origin,set_origin] = useState<location_props|null>(null);
    
    useEffect(()=>{
        if(typeof window !== 'undefined'){
            const {origin,href,search} = window.location;
            set_origin({origin,href,search});
            //set_origin(window.location.origin);
            //console.log('origin in hook ',location);
        }
    },[])
    //if(origin)
    return origin;
    //return null;
}