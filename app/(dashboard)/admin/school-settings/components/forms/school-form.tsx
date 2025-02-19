'use client';
import { FormFieldComponent } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios_request from "@/lib/axios_request";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function SchoolForm({school_id}:{school_id?:string}){
    const {id,addSchool,setId,updateSchool } = useSchoolStore();
    const { data } = useBaseSchoolStore();
    const form_schema = z.object({
        school_name:z.string().nonempty({message:`Please enter ${data?.school_naming}'s name`}).trim()
    });

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues:id ? useSchoolStore.getState().school() : {
            school_name:''
        }
    })

    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useSchoolStore.getState().id){
        //value = Object.assign({},value,{id:useSchoolStore.getState().id});
        const {data} = await axios_request(`/api/school/${useSchoolStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb(data) {
            
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
        updateSchool(useSchoolStore.getState().id,data.school);
        //setId(data.school.id);

        }else{

        //value = Object.assign({},values);
        const {data} = await axios_request('/api/school','post',JSON.stringify(values),undefined,{message:'Data successfully saved',cb(data) {
            
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
        addSchool(data.school);
        setId(data.school.id);
    }
    }

    return (

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{id ? `Update ${data?.school_naming}` : `Create A New ${data?.school_naming}`}</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
  
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="">
            <CardContent className="space-y-">

            
  
            <FormFieldComponent form={form} name='school_name' label={`Name of ${data?.school_naming}`} placeholder={`Enter name of ${data?.school_naming}`} />
  
            
  
            </CardContent>
              <CardFooter>
              <Button type="submit">{id ? 'Update':'Save'}</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    )

    

}