'use client';
import { FormFieldCloudinaryComponent, FormFieldComponent, FormCheckboxComponent } from "@/components/form-components";
//import { LoadAnimation } from "@/components/loader/loading-anime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ModalLoadingAnimation } from "@/components/ui/loader/loading-anime";
//import { ModalLoadingAnimation } from "@/components/ui/loader/loading-anime";
import axios_request from "@/lib/axios_request";
import useTransportStore from "@/stores/transport/use-route-store";
//import useParentStore from "@/stores/parents/use-parent-store";
import useVehicleStore from "@/stores/transport/use-vehicle-store";

import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
//import { useEffect, useState } from "react";
//import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";


export default function VehicleForm(){ 
    const {id,addVehicle,setId,updateVehicle } = useVehicleStore();
    
    const form_schema = z.object({
        name:z.string().nonempty({message:`Please enter the name of vehicle`}).trim(),
        plate_no:z.string().nonempty({message:`Please enter the plate number of vehicle`}).trim(),
        trans:z.array(z.string()).nullable(),
        photo:z.string().nonempty({message:'Please upload an inage of the vehicle'})
    });

    
    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues: useVehicleStore.getState().current_vehicle ? useVehicleStore.getState().current_vehicle as z.infer<typeof form_schema> : {
            name:'',
            plate_no:'',
            trans:[],
            photo:''
        }
    })

    
    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        if(useVehicleStore.getState().id){
        
        
        const {data,error} = await axios_request(`/api/transport/vehicles/${useVehicleStore.getState().id}`,'patch',JSON.stringify(values),undefined,undefined,false,()=>{
          ModalLoadingAnimation.show('circular');
        },()=>{
          ModalLoadingAnimation.hide('circular');
        });

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
        //if(data)
        updateVehicle(useVehicleStore.getState().id,data.vehicle); 
        toast.success('Vehicle uopdated successfully',{duration:7000});
        //setId(data.school.id);

        }else{

         try {

          //ModalLoadingAnimation.show('circular');
          //return;
            
            const {data,error} = await axios_request('/api/transport/vehicles','post',JSON.stringify(values),undefined,undefined,false,()=>{
              ModalLoadingAnimation.show('circular');
            },()=>{
              ModalLoadingAnimation.hide('circular');
            });
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
            addVehicle(data.vehicle);    
            setId(data.vehicle.id);
            toast.success('Vehicle created successfully',{duration:7000});

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
          Vehicle Information
        </h2>
      
        <hr className="border-t border-gray-300 mb-4"></hr>


        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-4">
          <div>
            {/*<label class="block text-sm font-medium text-gray-700 mb-1">Academic Year <span class="text-red-500">*</span></label>
            <select class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>*/}
            <FormFieldComponent form={form} name='name' label={`Vehicle Name`} placeholder={`Enter name for identification`} />

          </div>
          <div>
            <FormFieldComponent form={form} name='plate_no' label={`Plate Number`} placeholder={`Enter plate number of vehicle`} />
          </div>
          
        </div>

        <div className="flex gap-4 mb-4">
                
        <div>
            <FormCheckboxComponent form={form} name='trans' label={`Route(s) If Available`} description={`Select route(s) if available`} checks={useTransportStore.getState().transports.map(e=>({name:e.route,value:e.id}))} />
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