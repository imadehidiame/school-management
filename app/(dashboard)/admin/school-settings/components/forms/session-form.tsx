'use client';
import { FormFieldComponent } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios_request from "@/lib/axios_request";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolSessionStore from "@/stores/school-settings/use-session-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function SessionForm(){
    const {id,add_session,set_sessions,set_id } = useSchoolSessionStore();
    useBaseSchoolStore();
    const form_schema = z.object({
        session:z.string().nonempty({message:`Please enter session usually in the format, 2024/2025`}).trim()
    });

    //const state_form = 

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues:id ? useSchoolSessionStore.getState().session() as z.infer<typeof form_schema> : {
            session:'' 
        }
    })

    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useSchoolSessionStore.getState().id){
        //value = Object.assign({},value,{id:useSchoolStore.getState().id});
        const {data} = await axios_request(`/api/school-session/${useSchoolSessionStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb(data) {
            
        },},(error)=>{
            if(error?.cause == 401 || error?.cause == 403){
                toast.error(error.message,{duration:7000});
                signOut();
            }else{
                toast.error(error.message,{duration:7000});
            }
                console.log('error auth');
                //signOut();
        },false);
        set_sessions(data.session_data);
        set_id(data.id);
        //updateSchool(useSchoolStore.getState().id,data.school);

        //setId(data.school.id);

        }else{

        //value = Object.assign({},values);
        try {
            const {data,error} = await axios_request('/api/school-session','post',JSON.stringify(values),undefined,{message:'Data successfully saved',cb(data) {
            
            },},(error)=>{
                if(error?.cause == 401 || error?.cause == 403){
                    toast.error(error.message,{duration:7000});
                    signOut();
                }else{
                    toast.error(error.message,{duration:7000});
                }
                    console.log('error auth');
                    //signOut();
            },false);
            if(error){
                console.log('An error occured');
                toast.error(error.message,{duration:7000})
            }else{
                console.log('Session Data ',data.session_datum);
                //add_session(data.session_datum);
                if(data.session_datum instanceof Array){
                  set_sessions(data.session_datum);
                }else{
                   await add_session(data.session_datum);
                }
                //set_sessions(data.session_datum); n
                set_id(data.session_datum.id);
            }
            
            
        } catch (error) {
            
        }

        

        

        
    }
    }

    return (

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{id ? `Update Session` : `Create A New Session`}</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
  
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="">
            <CardContent className="space-y-">

            
  
            <FormFieldComponent form={form} name='session' label={`Name of session`} placeholder={`Enter name of session usually in the form of 2025/2026`} />
  
            
  
            </CardContent>
              <CardFooter>
              <Button type="submit">{id ? 'Update':'Save'}</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    )

    

}