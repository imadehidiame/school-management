'use client';
//import { signOut } from "@/aut";
import { FormFieldComponent } from "@/components/form-components";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
//import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
//import { Input } from "@/components/ui/input";
import axios_request from "@/lib/axios_request";
import useBaseSchoolStore from "@/stores/school-settings/use-base-school-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSchoolCategory } from "@prisma/client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
//import { BaseData } from "../definitions";


export const NamingConventionComponent:React.FC<{base_data:BaseSchoolCategory|null}> = ({base_data}) => {
    //const route = useRouter();
    //const { data:session,update } = useSession();
    const {data,setData} = useBaseSchoolStore(); 

    //console.log('Base schoo value ',base_school);

    const base_school_schema = z.object({
        school_naming:z.string().nonempty({message:'Enter the conventional school name'}).trim(),
        section_naming: z.string().nonempty({message:'Enter the conventional section name'}).trim(),
        class_naming:z.string().nonempty({message:'Enter the conventional class name'}).trim(),
        arm_naming:z.string().nonempty({message:'Enter the conventional arm name'}).trim()
    });
      
    const fm = useForm<z.infer<typeof base_school_schema>>({
        resolver: zodResolver(base_school_schema),
        defaultValues: (data ? data : base_data) || {
            school_naming:'',
            section_naming:'',
            class_naming:'',
            arm_naming:'' 
        } // Use the state variable here
      });

    
      React.useEffect(() => {
        if (data) {
            //setData(base_school);
            fm.reset(data);
        }
      }, [data,setData,fm]);
    
    async function on_submit(values:z.infer<typeof base_school_schema>){
        const {school_naming,section_naming,class_naming,arm_naming} = values;
       await axios_request('/api/school-naming','post',JSON.stringify({school_naming,section_naming,class_naming,arm_naming}),undefined,{message:'Data successfully saved',cb(data) {
            //console.log('served data ',data);
            setData(data.create);
            //base_school_store.setData(data.create);
            //form.reset();
        },},(error)=>{
          if(error?.cause == 401 || error?.cause == 403)
            console.log('error auth');
            //signOut();
        },true);

        //console.log('Data and error from server ',data);

    }
  
    //if(!session)
      //  return null;
  
    
    return (
       <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>Create School Naming Convention</CardTitle>
            <CardDescription>
              Create naming conventions for schools, sections, classes and arms
            </CardDescription>
          </CardHeader>
  
          <FormProvider {...fm}>
            <form onSubmit={fm.handleSubmit(on_submit)} className="space-y-8">
            <CardContent className="space-y-2">

            
  
            <FormFieldComponent form={fm} name='school_naming' label='School Naming' placeholder='Enter naming convention for school e.g School' />
  
            <FormFieldComponent form={fm} name='section_naming' label='Section Naming' placeholder='Enter naming convention for section e.g School Section' />
  
            <FormFieldComponent form={fm} name='class_naming' label='Class Naming' placeholder='Enter naming convention for classes e.g Class' />
  
            <FormFieldComponent form={fm} name='arm_naming' label='Arm Naming' placeholder='Enter naming convention for class arms e.g Arm' />
  
            </CardContent>
              <CardFooter>
              <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>
  
    );
  
  }
  
  //export default NamingConventionComponent;