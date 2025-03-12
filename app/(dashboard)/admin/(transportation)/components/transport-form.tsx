'use client';
import { FormFieldComponent, FormCheckboxComponent } from "@/components/form-components";
//import { LoadAnimation } from "@/components/loader/loading-anime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
//import { ModalLoadingAnimation } from "@/components/ui/loader/loading-anime";
import axios_request from "@/lib/axios_request";
import useParentStore from "@/stores/parents/use-parent-store";
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


export default function TransportForm(){ 
    const {id,addTransport,setId,updateTransport } = useTransportStore();
    
    const form_schema = z.object({
        route:z.string().nonempty({message:`Please enter the name of route`}).trim(),
        //plate_no:z.string().nonempty({message:`Please enter the plate number of vehicle`}).trim(),
        vehicle_ids:z.array(z.string()).nullable(),
        //photo:z.string().nonempty({message:'Please upload an inage of the vehicle'})
    });

    
    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema),
        defaultValues: useTransportStore.getState().current_transport ? useTransportStore.getState().current_transport as z.infer<typeof form_schema> : {
            route:'',
            vehicle_ids:[],
        }
    })

    
    const on_submit = async (values:z.infer<typeof form_schema>)=>{
        //let value;
        console.log(values);
        //return;
        if(useVehicleStore.getState().id){
        
        
        const {data} = await axios_request(`/api/transportation/${useTransportStore.getState().id}`,'patch',JSON.stringify(values),undefined,{message:'Data updated successfully',cb() {
            
        },},false);
        //console.log('Arm Data ',data.arm_datum);
        //updateSchool(useSchoolStore.getState().id,data.school);
        updateTransport(useParentStore.getState().id,data.transport); 
        //setId(data.school.id);

        }else{

         try {

          //ModalLoadingAnimation.show('circular');
          //return;
            
            const {data,error} = await axios_request('/api/transport/routes','post',JSON.stringify(values),undefined,undefined,false);
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
            addTransport(data.transport);    
            setId(data.transport.id);
            toast.success('Route created successfully',{duration:7000});

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
          Route Information
        </h2>
      
        <hr className="border-t border-gray-300 mb-4"></hr>


        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-4">
          <div>
            <FormFieldComponent form={form} name='route' label={`Route`} placeholder={`Enter name for identification`} />
   
          </div>
          
          
        </div> 

        <div className="flex gap-4 mb-4">
                
        <div>
            <FormCheckboxComponent form={form} name='vehicle_ids' label={`Vehicle(s) If Available`} description={`Select vehicle(s) if available`} checks={useVehicleStore.getState().vehicles.map(e=>({name:e.name,value:e.id}))} />
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