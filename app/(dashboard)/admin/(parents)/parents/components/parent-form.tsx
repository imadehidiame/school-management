'use client';
import { FormFieldCloudinaryComponent, FormFieldComponent, FormSelectComponent } from "@/components/form-components";
//import { LoadAnimation } from "@/components/loader/loading-anime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModalLoadingAnimation } from "@/components/ui/loader/loading-anime";
import axios_request from "@/lib/axios_request";
import useParentStore from "@/stores/parents/use-parent-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
//import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function ParentForm(){ 
    const {id,addParent,setId,updateParent } = useParentStore();
    //const [form_key,set_form_key] = useState(Date.now());
    /*useEffect(()=>{
      set_form_key(prev=>prev+1);
      console.log("ParentForm: Zustand Parent:", useParentStore.getState().current_parent); 
    },[id]);*/
    

    /**
    model Parent {
  id              String       @id @default(uuid())
  firstName       String
  lastName        String
  email           String       @unique
  city            String?
  state           String?
  occupation      String?
  phoneNumber     String?
  address         String?
  office_address  String?
  photo           String?
  facebook        String?
  facebook        String?
  twitter         String?
  linkedin        String?

     */

    const form_schema = z.object({
        firstName:z.string().nonempty({message:`Please enter the first name`}).trim(),
        lastName:z.string().nonempty({message:`Please enter the last name or surname`}).trim(),
        email:z.string().nonempty({message:`Please enter the email address`}).email({message:'Enter a valid email address'}).trim(),
        city:z.string().nullable(),
        state:z.string().nullable(),
        occupation:z.string().nullable(),
        phoneNumber:z.string().nonempty({message:'Please enter the phone number'}),
        address:z.string().nonempty({message:'Please enter the address'}),
        office_address:z.string().nullable(),
        facebook:z.string().nullable(),
        twitter:z.string().nullable(),
        linkedin:z.string().nullable(),
        photo:z.string().nonempty({message:'Please upload an inage'})
    });

    

    //type formType = z.infer<typeof form_schema>; 
    /**
     name_alias:string;
    school_class_id: string;
     */

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues: useParentStore.getState().current_parent ? useParentStore.getState().current_parent as z.infer<typeof form_schema> : {
            firstName:'',
            lastName:'',
            email:'',
            city:'',
            state:'',
            occupation:'',
            phoneNumber:'',
            address:'',
            office_address:'',
            facebook:'', //
            twitter:'',
            linkedin:'',
            photo:''  
        }
    })

    
    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useParentStore.getState().id){
        
        
        const {data} = await axios_request(`/api/parent/${useParentStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb() {
            
        },},false);
        //console.log('Arm Data ',data.arm_datum);
        //updateSchool(useSchoolStore.getState().id,data.school);
        updateParent(useParentStore.getState().id,data.parent); 
        //setId(data.school.id);

        }else{

         try {

          //ModalLoadingAnimation.show('circular');
          //return;
            
            const {data,error} = await axios_request('/api/parent','post',JSON.stringify(values),undefined,{message:'Data successfully saved',cb() {
            
            },},false);
            console.log('Response from server');
            console.log(data);
            console.log(error);
            if(error){
                if(error?.cause){
                    if(error.cause === 'validation' || error.cause === 'duplicate_data'){
                        const dataa = data.data;
                        for (const key in dataa as Record<string,any>) {
                            console.log('key = ',key);
                            if (Object.prototype.hasOwnProperty.call(dataa, key)) {
                                const element = dataa[key as keyof typeof dataa];
                                console.log('element = ',element[0]);
                                console.log('element = ',element);
                                form.setError(key as keyof z.infer<typeof form_schema>, {message:element[0]});
                                //formm.setError('lastName',{message:''})
                            }
                        }
                        console.log('Form errors:', form.formState.errors);
                    }else if(error.cause == 401 || error.cause == 403){
                      signOut();
                    }
                 
                }
                toast.error(error.message,{duration:7000});
                return;
            }
            //console.log('Seeved ',data);
            //console.log('Arm datum ',data.arm_datum);
            addParent(data.parent);    
            setId(data.parent.id);

        } catch (error) {
        
            console.log(error);

        }

        
    }
    }

    return (

        <Card className="h-auto max-h-full"> 
          {/*<CardHeader>
            <CardTitle>{id ? `Update Parent` : `Create A New Parent`}</CardTitle>
            <CardDescription>
              
            </CardDescription>
          </CardHeader>*/}
  
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="w-full mx-auto p-2">
            <CardContent className="space-y-4">

        <h2 className="text-xl font-semibold mb-2 flex items-center">
          Parent/Guardian Information
        </h2>
      
        <hr className="border-t border-gray-300 mb-4"></hr>


        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            {/*<label class="block text-sm font-medium text-gray-700 mb-1">Academic Year <span class="text-red-500">*</span></label>
            <select class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>*/}
            <FormFieldComponent form={form} name='firstName' label={`First Name`} placeholder={`Enter first name`} />

          </div>
          <div>
            {/*<label class="block text-sm font-medium text-gray-700 mb-1">Register No <span class="text-red-500">*</span></label>
            <input type="text" value="ISC-0001" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">*/}
            <FormFieldComponent form={form} name='lastName' label={`Last Name`} placeholder={`Enter last name`} />
          </div>
          <div>
          <FormFieldComponent form={form} name='email' label={`Email Address`} placeholder={`Enter email address`} />
          </div>
          <div>
          <FormFieldComponent form={form} name='phoneNumber' label={`Phone Number`} placeholder={`Enter phone number`} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <FormFieldComponent form={form} name='city' label={`City of Residence`} placeholder={`Enter city of residence`} />
            </div>
          <div>
            <FormFieldComponent form={form} name='state' label={`State of Residence`} placeholder={`Enter state of residence`} />
          </div>
          <div>
          <FormFieldComponent form={form} name='occupation' label={`Occupation`} placeholder={`Enter parent/guardian occupation`} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <FormFieldComponent form={form} name='address' label={`Residential Address`} placeholder={`Enter residential address`} />
            </div>
          <div>
            <FormFieldComponent form={form} name='office_address' label={`Office Address`} placeholder={`Enter office address`} />
          </div>
          
        </div>

        <h2 className="text-lg font-semibold mb-2 flex items-center">
          Socials
        </h2>
      
        <hr className="border-t border-gray-300 mb-4"></hr>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
          <div>
            <FormFieldComponent form={form} name='facebook' label={`Facebook`} placeholder={`https://facebook.com/username`} />
            </div>
          <div>
          <FormFieldComponent form={form} name='twitter' label={`X/Twitter`} placeholder={`https://x.com/username`} />
          </div>
          <div>
          <FormFieldComponent form={form} name='linkedin' label={`LinkedIn`} placeholder={`https://linkedin.com/username`} />
          </div>
        </div>

            

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <div className="flex align-center items-center justify-center">
            <FormFieldCloudinaryComponent form={form} name='photo' label={`Image`} placeholder="" />
            </div> 
        </div>
            

            
            
  
            </CardContent>
              <CardFooter>
              <Button type="submit">{id ? 'Update':'Save'}</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    )

    

}