'use client';
import { Form, FormProvider, useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
//import { useRouter } from 'next/navigation';
//import toast from 'react-hot-toast';
import axios_request from '@/lib/axios_request';
import { FormFieldComponent,FormSelectComponent } from '@/components/form-components';
//import { useState } from 'react';
import { BaseSchoolCategory, School } from '@prisma/client';
import { SchoolDataTable } from '@/components/tables/school-data-table';
import { SectionColumnsDefinition } from '@/definitions/school/section-definitions';
import { SchoolColumnsDefinition } from '@/definitions/school/school-definitions';
import useBaseSchoolStore from '@/stores/school-settings/use-base-school-store';
import { SectionDataTable } from '@/components/tables/section-data-table';
import { SectionData } from '@/definitions/school/section-data';
//import { FormSelectComponent } from '@/components/FormComponents';

const form_schema = z.object({
    username:z.string().nonempty({message:'Username field is required'}).email({message:'Enter a valid email address'}).trim(),
    name: z.string().regex(/^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/i, { message: 'Enter a valid name in the first name and last name format' }).trim(),
    role:z.string().nonempty({message:'Select user role'})
});

const base_school_schema = z.object({
  school_naming:z.string().nonempty({message:'Enter the conventional school name'}).trim(),
  section_naming: z.string().nonempty({message:'Enter the conventional section name'}).trim(),
  class_naming:z.string().nonempty({message:'Enter the conventional class name'}).trim(),
  arm_naming:z.string().nonempty({message:'Enter the conventional arm name'}).trim()
});






/**
<FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
 */

        /*const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const selectedFile = event.target.files?.[0] || null; // Safely access files[0]
          console.log('Dir log');
          console.dir(event.target.files)
          console.log(event.target);
          if (selectedFile) {
              console.log("File:", selectedFile);
  
              const formData = new FormData();
              formData.append('file', selectedFile);
  
              console.log("FormData:", formData); // Log FormData AFTER appending
  
              fetch('/api/upload_file', {
                  method: 'POST',
                  body: formData,
              })
              .then(res => res.json())
              .then(data => console.log(data))
              .catch(err => console.error(err));
          }else{
            console.log('No file uploaded')
          }
      };*/
  
  
      
  
      /*function handle_submit_file(e:React.FormEvent<HTMLFormElement>){
        
        const fileInput = document.getElementById('file_up') as HTMLInputElement; // Type casting if needed
  
  if (fileInput && fileInput.files && fileInput.files.length > 0) { // Check if element and file exist
      const file = fileInput.files[0]; // Get the selected file
      console.log("File:", file); // Log the file object
  
      const formData = new FormData();
      formData.append('file', file); // Append the file
  
      console.log("FormData:", formData); // Log the FormData object (should now be populated)
  
      fetch('/api/upload_file', {
          method: 'POST',
          body: formData,
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  } else {
      console.log("No file chosen or file input element not found.");
  } 
}*/
  
  
      /*const error_handler = (error:Error)=>{
        toast.error(error.message,{duration:7000,position:'bottom-center'});
      }
  
      function on_change(e:any){
        const fileInput = document.getElementById('file_up') as HTMLInputElement;
  
        const files = (e.target as HTMLInputElement).files; // Access files directly from the event target
        if (files && files.length > 0) {
          const file_in = files[0];
          console.log("File:", file_in);
  
          const formData = new FormData();
          formData.append('file', file_in);
  
          console.log("FormData:", formData); // Log FormData
  
          fetch('/api/upload_file', {
              method: 'POST',
              body: formData,
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err => console.error(err));
      } else {
          console.log("No file chosen.");
      }
  
      }*/


export const Schooling:React.FC<{base_data:BaseSchoolCategory|null,school_data:School[]}> = ({base_data,school_data}:{base_data:BaseSchoolCategory|null,school_data:School[]}) =>{

  if(!base_data)
  return (
    <Card className="w-[50%]">
    <CardHeader>
      <CardTitle>Please Create School Naming Conventions</CardTitle>
      <CardDescription>
        Create naming conventions for schools, sections, classes and arms before proceeding to this section
      </CardDescription>
    </CardHeader>
  </Card>
)

  return (
    

        

        <Card className="w-full">
        <CardHeader>
          <CardTitle>Create {base_data.school_naming} Data</CardTitle>
          <CardDescription>
            Register { base_data.school_naming.toLocaleLowerCase() } information in the database
          </CardDescription>


        </CardHeader>

        
          <CardContent className="space-y-2">

            <SchoolDataTable 
            data={school_data}
            empty_data_message={`No ${base_data.school_naming.toLocaleLowerCase()} information registered yet`}
            filters={[
              {column:'school_name',placeholder:`Search by ${base_data.school_naming}`,select_box_name:`${base_data.school_naming} filter`}
            ]}
            paginations={[10,20]}
            columns={SchoolColumnsDefinition} 
            />
          
          </CardContent>
           <CardFooter>
        
          </CardFooter>
      </Card>
  )
}


export const SchoolSection:React.FC<{base_data:BaseSchoolCategory|null,school_data:SectionData[],schooling_data:School[]}> = ({base_data,school_data,schooling_data}:{base_data:BaseSchoolCategory|null,school_data:SectionData[],schooling_data:School[]}) =>{

  //console.log("Information");
  //console.log({base_data});
  //console.log({schooling_data});

  if(!base_data)
  return (
    <Card className="w-[50%]">
    <CardHeader>
      <CardTitle>Please Create School Naming Conventions</CardTitle>
      <CardDescription>
        Create naming conventions for schools, sections, classes and arms before proceeding to this section
      </CardDescription>
    </CardHeader>
  </Card>
)

if(schooling_data.length < 1)
  return (
    <Card className="w-full">
    <CardHeader>
      <CardTitle>Please Create A {base_data.school_naming} Information</CardTitle>
      <CardDescription>
        Create at least a {base_data.school_naming} information before proceeding to this section
      </CardDescription>
    </CardHeader>
  </Card>
);

  return (
    /**
     <DataTableUpdate 
            columns={columns} 
            data={data} 
            empty_data_message="No billboards registered yet" 
            filters={[
                {column:"store",placeholder:"Filter by store"},
                {column:"label",placeholder:"Filter by billboard label"},
            ]} 
            paginations={[10,20]}
        />
     */

        

        <Card className="w-full">
        <CardHeader>
          <CardTitle>Create {base_data.school_naming} Data</CardTitle>
          <CardDescription>
            Register { base_data.section_naming.toLocaleLowerCase() } information in the database
          </CardDescription>


        </CardHeader>

        
          <CardContent className="space-y-2">

            <SectionDataTable
              data={school_data}
              empty_data_message={`No ${base_data.school_naming.toLocaleLowerCase()} information registered yet`}
              filters={[
                {column:'school_name',placeholder:`Sort by ${base_data.school_naming}`,select_box_name:`${base_data.school_naming} filter`},
                {column:'section_name',placeholder:`Sort by ${base_data.section_naming}`,select_box_name:`${base_data.section_naming} filter`}
              ]}
              paginations={[10,20]}
              columns={SectionColumnsDefinition}
            />

          </CardContent>
           <CardFooter>
        
          </CardFooter>
      </Card>
  )
}


export const CreateUserForm = () => {
    //const route = useRouter();
    const { data:session } = useSession();
    //const [file, setFile] = useState<File | null>(null);

    
    const form = useForm<z.infer<typeof form_schema>>({
      resolver:zodResolver(form_schema), 
      defaultValues:{
          username:'',
          name:"",
          role:""
      }
    });
    
    async function on_submit(values:z.infer<typeof form_schema>){
        const {username,name,role} = values;
       await axios_request('/api/create-user','post',JSON.stringify({username,name,role}),undefined,{message:'Data created successfully',cb(data) {
            console.log('served data ',data);
            form.reset();
        },},true);

          /*try {

          const {status,data,statusText} = await axios.post('/api/create-user',JSON.stringify({username,name,role}));
          console.log('data ',data);
          switch (status) {
            case 500:
                console.log(data,' ',statusText);
              throw new Error(data?.data,{cause:500});
              case 201:
              throw new Error(data?.data,{cause:201});
            case 404:
                throw new Error("Resource not found",{cause:404});
            case 200:
              console.log('Data from server ',data);
              toast.success('Data created successfully',{position:'top-center','duration':7000});  
              form.reset({username:'',name:''});
              break;
            case 401:
            toast.error(data?.data+' Please sign in to continue',{position:'top-center','duration':7000});  
                await signOut();
               break;  
            case 403:
              toast.error(data?.data+' Please sign in to continue',{position:'top-center','duration':7000});  
             await signOut();
            break;
            default:
            break;
          }
          
        } catch (error) {
            if(error instanceof Error)
            error_handler(error);
        }*/

      /**
       * IMplement update database value 
       */

        //const up = await update({user:{name,username}});
        //console.log('updated session value, ',up);
        //route.push(`/${session?.user.role}`);
    }

    if(!session)
        return null;
    return (
       <Card className="w-[50%]">
          <CardHeader>
            <CardTitle>Create User Profile</CardTitle>
            <CardDescription>
              Create a new user and assign a role to the user
            </CardDescription>
          </CardHeader>

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="space-yik8-8">
            <CardContent className="space-y-2">
                <FormFieldComponent form={form} name='username' label='Email address' placeholder='Enter email address of user' /> 

            <FormFieldComponent form={form} name='name' label='Name' placeholder='Enter full name of user' />


            <FormSelectComponent label='Role' placeholder='Select user role' form={form} name='role' selects={[
                {
                  name:'Admin',
                  value:'admin'
                },
                {
                  name:'Parent',
                  value:'parent'
                },
                {
                  name:'Student',
                  value:'student'
                },
                {
                  name:'Teacher',
                  value:'teacher'
                }
                ]} />
                </CardContent>
              <CardFooter>
              <Button type="submit">Create</Button>
              </CardFooter>
            </form>
          </FormProvider>
      </Card>

    );

}



export const CreateBaseSchoolForm:React.FC<{base_school:BaseSchoolCategory|null}> = ({base_school}:{base_school:BaseSchoolCategory|null}) => {
  //const route = useRouter();
  const { data:session } = useSession();
  const base_school_store = useBaseSchoolStore();
  
const fm = useForm<z.infer<typeof base_school_schema>>({
  resolver:zodResolver(base_school_schema),
  defaultValues:base_school ? base_school : {
    school_naming:'',
    arm_naming:'',
    section_naming:'',
    class_naming:''
  }
});

  /*useEffect(()=>{
    const fetch = async()=>{
      const {error,data} = await axios_request('/api/school-naming','get',undefined,undefined,{message:'',cb(data){
      if(data && data.find){
          fm.reset(data.find);
      }
      }},(error)=>{
        if(error.cause == 401 || error.cause == 403)
          signOut();
        else
        toast.error('An error occured, '+error.message,{duration:10000});
      });
      };
    fetch();
  },[]);*/

  
  
  async function on_submit(values:z.infer<typeof base_school_schema>){
      const {school_naming,section_naming,class_naming,arm_naming} = values;
     await axios_request('/api/school-naming','post',JSON.stringify({school_naming,section_naming,class_naming,arm_naming}),undefined,{message:'Data successfully saved',cb(data) {
          console.log('served data ',data);
          base_school_store.setData(data.create);
          //form.reset();
      },},true);
  }

  if(!session)
      return null;


  return (
     <Card className="w-[50%]">
        <CardHeader>
          <CardTitle>Create School Naming Convention</CardTitle>
          <CardDescription>
            Create naming conventions for schools, sections, classes and arms
          </CardDescription>
        </CardHeader>

        <Form {...fm}>
          <form onSubmit={fm.handleSubmit(on_submit)} className="space-yik8-8">
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
        </Form>
    </Card>

  );

}

