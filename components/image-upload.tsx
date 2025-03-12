'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlusIcon, Trash } from "lucide-react";
import Image from "next/image";
import {CldUploadWidget} from 'next-cloudinary';
import axios from "axios";
import { delete_cloudinary_file } from "@/lib/axios_request";
import { generate_rand } from "@/lib/utils";

interface ImageUploadProps {
    disabled?:boolean; 
    onChange:(value:string)=>void;
    onRemove:(value?:string)=>void;
    on_close_action?:(value:string)=>void;
    value:string[],
    button_name:string,
    upload_folder?:string
}

export default function ImageUpload({disabled,onChange,onRemove,value,button_name,upload_folder='profile_pictures'}:ImageUploadProps){
    const [isMounted,setIsMounted] = useState(false);
    const [ url,set_url ] = useState('');
    const [public_id,set_public_id] = useState(value && value.length > 0 && value[0] ? value[0].split('<=>')[1] : generate_rand());
    const [img_key,set_img_key] = useState(Date.now());
    const [timestamp,set_timestamp] = useState(0);
    const [signature,set_signature] = useState('');

    useEffect(()=>{
        set_img_key(Date.now());
        console.log('value in effect = ',value);
    },[value]);

    useEffect(()=>{

        /*async function get_signature(){
            try {
                const {data,status} = await axios.get('/api/cloudinary');
                if(status == 200){
                    console.log('Data frim server ',data);
                    set_timestamp(data.timestamp);
                    set_signature(data.signature);
                }else{
                    console.log('An error occured with status ',status);
                }    
            } catch (error) {
                console.log(error);
            }

        }
        get_signature();*/
        setIsMounted(true);
        console.log('Public id value = ',public_id);
        
    },[]);

    useEffect(()=>{
        console.log('Url value in effect ');
        console.log(url);
    },[url]);

    const set_url_mod = async (new_url:string)=>{
        if(url){
            console.log('delete url ',url);
            await delete_action(`${url.split('<=>')[1]}`);
        }
        set_url(new_url);
        if(new_url)
            onChange(new_url)
        else
            onRemove('');
    }
    const onUpload = async (results:any) =>{
        console.log('{Res} value ',results);
        //console.log(typeof results.info.file);
        const {secure_url,public_id} = results.info;
        console.log(secure_url+' <==>'+public_id);
        await set_url_mod(secure_url+"<=>"+public_id);
        //onChange(secure_url+"<=>"+public_id);  
    }

    interface SuccessProps {
        asset_folder: string,
        asset_id: string,
        batchId: string,
        bytes: number,
        created_at: Date|string,
        display_name: string,
        etag: string,
        existing: false,
        format: string,
        height: number,
        id: string,
        info:{ 
            background_removal: Record<string,any>,
            original_filename: string,
            path: string,
            placeholder: boolean,
            public_id: string,
            resource_type: string,
            secure_url: string,
            signature: string,
            tags: string[],
            thumbnail_url: string,
            type: string,
            url: string,
            version: number|string,
            version_id: string,
            width: number
        }
    }

//img-url:https://domain/original_upload_preset_value/resource_type_value[image|video]/type_value[upload]/path_value
    const on_success = (results:any) => {
        //document.body.style.pointerEvents = 'none';
        console.log('Upload results ',results);
        set_url(results.info.secure_url+"<=>"+results.info.public_id);
        onChange(results.info.secure_url+"<=>"+results.info.public_id);
        //console.log('SUccess url ',url);
        //onChange(results.info.secure_url+"<=>"+results.info.public_id);
    }

    const delete_action = async (url:string)=>{
        try {
            await delete_cloudinary_file(url);
        } catch (error) {
            console.log(error);
        }
    }
    interface CloseProps {
        event:string,
        info:{
            message:string
        }
    }
    interface DisplayChangedProps {
        data: {
            event: string|"display-changed", 
            info: 'expanded'
        },
        event: "display-changed",
        info: "expanded"|"hidden"|"shown",
        uw_event: true
    }
    const on_close = () =>{
        console.log('Close is callied');
        if(url){
            console.log('Url value is ',url);
            onChange(url);
            //set_url('');
        }else{
            console.log('url value is empty');
            console.log(url);
        }
    }
    //https://res.cloudinary.com/dulpu5zkx/image/upload/v1741067488/1741067463956_750338.jpg<=>1741067463956_750338

    const close_action = async ()=>{
        console.log('Close action called');
        if(url){
            //await delete_cloudinary_file(url.split('<=>')[1]);
        }
        //set_url('');
    }

    const on_remove = async (url:string)=>{
        await delete_cloudinary_file(url.split('<=>')[1]);
        set_url('');
        onRemove();
    }


    if(!isMounted)
        return null; 

    return ( 
        <div>
            <div className="mb-4 flex items-center justify-center gap-4" key={img_key}>
                {value.map((urll)=>(
                    <div key={urll} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={()=>on_remove(urll)} variant={'destructive'} size={'icon'}>
                                <Trash className="h-4 w-4" /> 
                            </Button>
                        </div>
                        <Image fill className="object-cover" src={urll.split('<=>')[0]} alt="Image" />
                    </div>
                ))}
            </div>
            <CldUploadWidget 
                uploadPreset={upload_folder}
                onSuccess={on_success}
                options={
                {
                    publicId:public_id,
                    maxFileSize:1000000
                }
            } 
            onOpen={()=>{
                document.body.style.pointerEvents = 'auto';
            }} 
            onClose={on_close}
            signatureEndpoint={'/api/sign-cloudinary-upload'}
            >
                {({open})=>{
                    const onClick = () =>{
                        open(); 
                    }
                    return( 
                        <Button type="button" disabled={disabled} onClick={onClick} variant={'secondary'}>
                            <ImagePlusIcon className="h-4 w-4 mr-2" />
                            {button_name}
                        </Button>
                    )
                }}

            </CldUploadWidget>
        </div>
    )
}