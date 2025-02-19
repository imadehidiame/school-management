import { useEffect, useState } from "react";

export default function useOriginFull(){
    const [origin,set_origin] = useState(()=>{
        if(window != undefined && window.location)
            return window.location;
        else
            return null;
    });

    useEffect(()=>{
        set_origin(origin)
            
    },[origin]);

    return origin;
}