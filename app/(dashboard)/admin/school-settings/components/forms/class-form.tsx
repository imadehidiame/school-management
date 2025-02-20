'use client';
import { FormFieldComponent, FormSelectComponent } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios_request from "@/lib/axios_request";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useClassStore from "@/stores/school-settings/use-class-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
//import useSchoolStore from "@/stores/use-school-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function ClassForm(){
    const {id,addClassDatum,setId,updateClassData } = useClassStore();
    const { data } = useBaseSchoolStore(); 
    const form_schema = z.object({
        class_name:z.string().nonempty({message:`Please enter ${data?.class_naming}'s name`}).trim(),
        section_id:z.string().nonempty({message:`Please select ${data?.section_naming}'s name`})
    });

    //type formType = z.infer<typeof form_schema>;

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues: id ? useClassStore.getState().classDatum() as z.infer<typeof form_schema> : {
            section_id:'',
            class_name:''   
        }
    })

    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useClassStore.getState().id){
        //value = Object.assign({},value,{id:useSchoolStore.getState().id});
        const {data} = await axios_request(`/api/section-class/${useClassStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb() {
            
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
        console.log('Client data ',data.class_datum);
        //updateSchool(useSchoolStore.getState().id,data.school);
        updateClassData(useClassStore.getState().id,data.class_datum);
        //setId(data.school.id);

        }else{

        //value = Object.assign({},values);
        const {data,error} = await axios_request('/api/section-class','post',JSON.stringify(values),undefined,{message:'Data successfully saved',cb() {
            
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

        if(error){
            toast.error(error.message,{duration:7000});
            return;
        }
        console.log('Client datum ',data.class_datum);
        //useClassStore.setState({classData:[...useClassStore.getState().classData,data.class_datum]});
        addClassDatum(data.class_datum);  
        setId(data.class_datum.id);
    }
    }

    return (

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{id ? `Update ${data?.section_naming}` : `Create A New ${data?.class_naming}`}</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>
  
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="">
            <CardContent className="space-y-4">

            <FormSelectComponent form={form} name='section_id' label={`Select ${data?.section_naming}`} placeholder={`Select ${data?.school_naming}`} selects={useSchoolSectionStore.getState().schoolSections.map(e=>({name:e.section_name,value:e.id}))} />
  
            <FormFieldComponent form={form} name='class_name' label={`Name of ${data?.class_naming}`} placeholder={`Enter name of ${data?.class_naming}`} />
  
              
  
            </CardContent>
              <CardFooter>
              <Button type="submit">{id ? 'Update':'Save'}</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    )

    

}