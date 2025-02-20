import toast from "react-hot-toast";
import axios from "axios";


const error_handler = (error:Error,handle_error=false)=>{
    if(handle_error)
    toast.error(error.message,{duration:7000,position:'bottom-center'});
    //return handle_error ? toast.error(error.message,{duration:7000,position:'bottom-center'}): error;
}

interface HeaderProps<T extends object>{
    [key:string]:T
}

export default async function axios_request(url:string,method:'post'|'get'|'patch'|'delete',request_data:string|FormData|null|undefined,headers:HeaderProps<any>|undefined,success_toast:{
    message:string,
    cb:(data:any)=>void
}|undefined,error_callback:(error:Error)=>void|undefined,handle_error=false):Promise<{data?:any,error?:any}>{
     
       
            try {
            let response;
            let error:Error|null;
            
            //console.log('Method type ',method); 
            
            switch (method) {
                case 'get':
                    response = await axios.get(url,{data:request_data,headers,onUploadProgress() {
                      // const obj_keys = Object.keys(progressEvent);
                        //let obj_values = Object.values(progressEvent);
                        
                        //let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                        //console.log('Upload Progress data !=====');
                        //console.log(progressEvent);
                    },onDownloadProgress() {
                        //let obj_keys = Object.keys(progressEvent);
                        //let obj_values = Object.values(progressEvent);
                        
                        //obj_keys.forEach((element,index) => {
                          //  console.log(`Download data ${element} ==> `,obj_values[index]);
                        //});
                        //let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                        //console.log('Download Progress data !=====');
                        //console.log(progressEvent);
                    }});
                    break;
                case 'post':
                    response = await axios.post(url,request_data,{onUploadProgress() {
                       // let obj_keys = Object.keys(progressEvent);
                       // let obj_values = Object.values(progressEvent);
                        
                       // obj_keys.forEach((element,index) => {
                      //      console.log(`Upload data ${element} ==> `,obj_values[index]);
                        //});
                        //let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                        //console.log('Upload Progress data !=====');
                        //console.log(progressEvent);
                    },onDownloadProgress() {
                        //let obj_keys = Object.keys(progressEvent);
                        //let obj_values = Object.values(progressEvent);
                        
                       // obj_keys.forEach((element,index) => {
                          //  console.log(`Download data ${element} ==> `,obj_values[index]);
                       // });
                        //let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                        //console.log('Download Progress data !=====');
                        //console.log(progressEvent);
                    }});
                    break
                case 'patch':
                    console.log('Patch encountered');
                        response = await axios.patch(url,request_data,{onUploadProgress() {
                            //let obj_keys = Object.keys(progressEvent);
                            //let obj_values = Object.values(progressEvent);
                            
                            //obj_keys.forEach((element,index) => {
                          //      console.log(`Upload data ${element} ==> `,obj_values[index]);
                            //});
                            //let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                            //console.log('Upload Progress data !=====');
                            //console.log(progressEvent);
                        },onDownloadProgress() {
                            //let obj_keys = Object.keys(progressEvent);
                            //let obj_values = Object.values(progressEvent);
                            
                           // obj_keys.forEach((element,index) => {
                              //  console.log(`Download data ${element} ==> `,obj_values[index]);
                            //});
                            //let {lengthComputable,loaded,progress,bytes,download,upload,estimated,rate,total } = progressEvent;
                            //console.log('Download Progress data !=====');
                            //console.log(progressEvent);
                    }})
                    break;
                case 'delete':
                    response = await axios.delete(url, { data: request_data });
                    break;
                    
                default:
                    throw new Error('Invalid request type',{cause:'Invalid request'});
                    //break;
            }


                    
                const {status,data} = response;
                //console.log('data ',data);
                //console.log('status text ',statusText);
                //let error:Error|null;

                switch (status) {
                    case 500:
                      //console.log(data,' ',statusText);
                    throw new Error(data?.data,{cause:500});
                    case 201:
                      error = new Error(data?.data,{cause:201});
                      throw error;
                     break; 
                    case 404:
                      error = new Error("Resource not found",{cause:404});
                      throw error;
                    case 200:
                    //console.log('Data from server ',data);
                    if(success_toast){
                        if(success_toast.message)
                        toast.success(success_toast.message,{position:'top-center','duration':7000});
                        success_toast.cb(data);
                    }
                    return {data};
                    //break;
                     case 401:
                    error = new Error(data?.data,{cause:401});
                    throw error;
                    case 403:
                    error = new Error(data?.data,{cause:403});
                    throw error;
                  default:
                    error = new Error("Unknown error",{cause:100});
                    return {data,error};
                  //break;
                }
                //if(error_callback !== undefined)
                  //  error_callback(error);
                  //else  
                //return {data,error};

              } catch (error) {
                  if(error instanceof Error)
                  error_handler(error,handle_error);
                return {error};
              }
    }