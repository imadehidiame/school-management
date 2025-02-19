'use client';

import { useOrigin } from "@/hooks/use-origin";
import { useSearchParams } from "next/navigation";
//import { useRouter } from "next/router";
import { useEffect } from "react";
import { signOut } from 'next-auth/react'


export const Error = ()=>{
    //const router = useRouter(); 
    const origin = useOrigin();
    const search = useSearchParams();
    const type = search.get('type');
    const err = search.get('err');
    const error = search.get('error');
    
    useEffect(() => {
      console.log('Origin value ', origin);
      console.log('Search Params:', type);
    }, [origin?.origin, origin?.href, origin?.search, type]);
    
    let error_message = '';
    switch (err) {
      case 'invalid-role':
          error_message='Trying to access with an invalid role'
        break;
      case 'no-role':
          error_message='Your role has not been assigned'
        break;
    
      default:
        break;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
          <h1 className="text-3xl font-bold text-center text-red-500 mb-4">Error Encountered</h1>
          {error ? <p className="text-center text-gray-300">An error was encountered along the way. Error: {`${error}`} </p>: (
            <p className="text-center text-gray-300">An error was encountered along the way. 
            {error_message && `Error: ${error_message}`} {(err && !error_message) && `Error Type: [${err}]`} </p>
          )}
          
          <div className="flex justify-center mt-4">
            <button
              onClick={async() => {
                await signOut();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
      );

}