'use client';
import { FormFieldComponent, FormSelectComponent } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios_request from "@/lib/axios_request";
import useArmStore from "@/stores/school-settings/use-arm-store";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import useClassStore from "@/stores/school-settings/use-class-store";
import useSchoolSectionStore from "@/stores/school-settings/use-school-section-store";
import useSchoolStore from "@/stores/school-settings/use-school-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function ArmForm(){
    const {id,addArmDatum,setId,updateArmData } = useArmStore();
    const { data } = useBaseSchoolStore(); 
    const form_schema = z.object({
        arm_name:z.string().nonempty({message:`Please enter ${data?.class_naming}'s name`}).trim(),
        name_alias:z.string().nullable(),
        school_class_id:z.string().nonempty({message:`Please select ${data?.section_naming}'s name`})
    });

    //type formType = z.infer<typeof form_schema>;
    /**
     name_alias:string;
    school_class_id: string;
     */

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues: id ? useArmStore.getState().armDatum() as z.infer<typeof form_schema> : {
            school_class_id:'',
            arm_name:'',
            name_alias:''  
        }
    })

    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useArmStore.getState().id){
        //value = Object.assign({},value,{id:useSchoolStore.getState().id});
        const {data} = await axios_request(`/api/class-arm/${useArmStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb(data) {
            
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
        console.log('Arm Data ',data.arm_datum);
        //updateSchool(useSchoolStore.getState().id,data.school);
        updateArmData(useArmStore.getState().id,data.arm_datum); 
        //setId(data.school.id);

        }else{

        //value = Object.assign({},values);
        
        //console.log(JSON.stringify(values));
        //console.log(values);
        //return;

        const {data} = await axios_request('/api/class-arm','post',JSON.stringify(values),undefined,{message:'Data successfully saved',cb(data) {
            
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
        console.log('Arm datum ',data.arm_datum);
        addArmDatum(data.arm_datum);
        setId(data.arm_datum.id);
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

            <FormSelectComponent form={form} name='school_class_id' label={`Select ${data?.class_naming}`} placeholder={`Select ${data?.class_naming}`} selects={useClassStore.getState().classData.map(e=>({name:e.class_name,value:e.id}))} />

  
            <FormFieldComponent form={form} name='arm_name' label={`Name of ${data?.arm_naming}`} placeholder={`Enter name of ${data?.arm_naming}`} />

            <FormFieldComponent form={form} name='name_alias' label={`${data?.arm_naming} Alias`} placeholder={`Enter ${data?.arm_naming} alias if any`} />
  
            
  
            </CardContent>
              <CardFooter>
              <Button type="submit">{id ? 'Update':'Save'}</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    )

    

}