import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";


const error_handler = (error:Error,handle_error=false)=>{
    if(handle_error)
    toast.error(error.message,{duration:7000,position:'bottom-center'});
    //return handle_error ? toast.error(error.message,{duration:7000,position:'bottom-center'}): error;
}

export default async function useFetch(url:string,method:'post'|'get'|'patch',submit_data:string|null|undefined,headers:any|undefined,success_toast:{
    message:string,
    cb:(data:any)=>void
}|undefined,handle_error=false){
    
       
            try {
            let response;
            let error:Error|any|null;
            if(method == 'get')
            response = await axios.get(url,{data:submit_data,headers,onUploadProgress(progressEvent) {
                let obj_keys = Object.keys(progressEvent);
                let obj_values = Object.values(progressEvent);
                
                obj_keys.forEach((element,index) => {
                    console.log(`Upload data ${element} ==> `,obj_values[index]);
                });
                let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                console.log('Upload Progress data !=====');
                console.log(progressEvent);
            },onDownloadProgress(progressEvent) {
                let obj_keys = Object.keys(progressEvent);
                let obj_values = Object.values(progressEvent);
                
                obj_keys.forEach((element,index) => {
                    console.log(`Download data ${element} ==> `,obj_values[index]);
                });
                let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                console.log('Download Progress data !=====');
                console.log(progressEvent);
            }});

            else if(method == 'post')
                response = await axios.post(url,submit_data,{onUploadProgress(progressEvent) {
                    let obj_keys = Object.keys(progressEvent);
                    let obj_values = Object.values(progressEvent);
                    
                    obj_keys.forEach((element,index) => {
                        console.log(`Upload data ${element} ==> `,obj_values[index]);
                    });
                    let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                    console.log('Upload Progress data !=====');
                    console.log(progressEvent);
                },onDownloadProgress(progressEvent) {
                    let obj_keys = Object.keys(progressEvent);
                    let obj_values = Object.values(progressEvent);
                    
                    obj_keys.forEach((element,index) => {
                        console.log(`Download data ${element} ==> `,obj_values[index]);
                    });
                    let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                    console.log('Download Progress data !=====');
                    console.log(progressEvent);
                }})

                else (method == 'patch')
                    response = await axios.patch(url,submit_data,{onUploadProgress(progressEvent) {
                        let obj_keys = Object.keys(progressEvent);
                        let obj_values = Object.values(progressEvent);
                        
                        obj_keys.forEach((element,index) => {
                            console.log(`Upload data ${element} ==> `,obj_values[index]);
                        });
                        let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                        console.log('Upload Progress data !=====');
                        console.log(progressEvent);
                    },onDownloadProgress(progressEvent) {
                        let obj_keys = Object.keys(progressEvent);
                        let obj_values = Object.values(progressEvent);
                        
                        obj_keys.forEach((element,index) => {
                            console.log(`Download data ${element} ==> `,obj_values[index]);
                        });
                        let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                        console.log('Download Progress data !=====');
                        console.log(progressEvent);
                }})

            
                const {status,data,statusText} = response;
                console.log('data ',data);
                console.log('status text ',statusText);

                switch (status) {
                  case 500:
                      console.log(data,' ',statusText);
                    throw new Error(data?.data,{cause:500});
                    case 201:
                      //console.log(data,' ',statusText);
                      error = new Error(data?.data,{cause:201});
                    //throw error;
                  case 404:
                      error = new Error("Resource not found",{cause:404});
                      throw error;
                  case 200:
                    console.log('Data from server ',data);
                    if(success_toast){
                        toast.success(success_toast.message,{position:'top-center','duration':7000});
                        success_toast.cb(data);
                    }
                    //else
                    //toast.success('S',{position:'top-center','duration':7000});  
                    //route.refresh();
                    //form.reset({username:'',name:''});
                    break;
                    //throw new Error("Data has been updated successfully",{cause:200})
                  case 401:
                    error = new Error(data?.data+' Please sign in to continue');
                    throw error;
                    //toast.error(data?.data+' Please sign in to continue',{position:'top-center','duration':7000});  
                      //await signOut();
                     break;  
                  case 403:
                    error = new Error(data?.data+' Please sign in to continue');
                    throw error;
                    //toast.error(data?.data+' Please sign in to continue',{position:'top-center','duration':7000});  
                   //await signOut();
                  break;
                  default:
                  break;
                }
                
                return {data,error};

              } catch (error) {
                  if(error instanceof Error)
                  error_handler(error,handle_error);
                return {error};
              }
    }