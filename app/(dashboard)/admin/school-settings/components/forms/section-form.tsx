'use client';
import { FormFieldComponent, FormSelectComponent } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios_request from "@/lib/axios_request";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function SectionForm(){
    const {id,addSchoolSection,setId,updateSchoolSection } = useSchoolSectionStore();
    const { data } = useBaseSchoolStore();
    const form_schema = z.object({
        section_name:z.string().nonempty({message:`Please enter ${data?.section_naming}'s name`}).trim(),
        school_id:z.string().nonempty({message:`Please select ${data?.school_naming}'s name`})
    });

    //type formType = z.infer<typeof form_schema>;

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues: id ? useSchoolSectionStore.getState().schoolSection() as z.infer<typeof form_schema> : {
            school_id:'',
            section_name:''
        }
    })

    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useSchoolSectionStore.getState().id){
        //value = Object.assign({},value,{id:useSchoolStore.getState().id});
        const {data} = await axios_request(`/api/school-section/${useSchoolSectionStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb() {
            
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
        //updateSchool(useSchoolStore.getState().id,data.school);
        updateSchoolSection(useSchoolSectionStore.getState().id,data.section); 
        //setId(data.school.id);

        }else{

        //value = Object.assign({},values);
        const {data} = await axios_request('/api/school-section','post',JSON.stringify(values),undefined,{message:'Data successfully saved',cb() {
            
        },},(error)=>{
            if(error?.cause == 401 || error?.cause == 403){
                toast.error(error.message,{duration:7000});
                signOut();
            }else{
                toast.error(error.message,{duration:7000});
            }
                //console.log('error auth');
                //signOut();
        },false);
        addSchoolSection(data.section);
        setId(data.section.id);
    }
    }

    return (

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{id ? `Update ${data?.section_naming}` : `Create A New ${data?.section_naming}`}</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
  
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="">
            <CardContent className="space-y-4">

            
  
            <FormFieldComponent form={form} name='section_name' label={`Name of ${data?.section_naming}`} placeholder={`Enter name of ${data?.section_naming}`} />
  
            <FormSelectComponent form={form} name='school_id' label={`Select ${data?.school_naming}`} placeholder={`Select ${data?.school_naming}`} selects={useSchoolStore.getState().schools.map(e=>({name:e.school_name,value:e.id}))} />
  
            </CardContent>
              <CardFooter>
              <Button type="submit">{id ? 'Update':'Save'}</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    )

    

}