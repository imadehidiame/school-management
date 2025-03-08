'use client';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import {
  Form,
 /* FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,*/
} from "@/components/ui/form"
/*import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"*/
//import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios_request from '@/lib/axios_request';
import { FormFieldComponent,FormSelectComponent } from '@/components/form-components';
import { useState } from 'react';
//import { FormSelectComponent } from '@/components/FormComponents';

const form_schema = z.object({
    username:z.string().nonempty({message:'Username field is required'}).email({message:'Enter a valid email address'}).trim(),
    name: z.string().regex(/^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/i, { message: 'Enter a valid name in the first name and last name format' }).trim(),
    role:z.string().nonempty({message:'Select user role'})
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

export default function CreateUserForm(){
    //const route = useRouter();
    const { data:session } = useSession();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null; // Safely access files[0]
        setFile(selectedFile); // Update the state
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
        }
    };


    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema), 
        defaultValues:{
            username:'',
            name:"",
            role:""
        }
    });

   
    /*function handle_submit_file(e:React.FormEvent<HTMLFormElement>){
      e.preventDefault();
      if(!file){
        alert('No file inserted');
        return;
      }
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
        <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          {/*<div className="flex justify-center mb-4">
            <Image src={'/img/gta_logo.png'} alt='logo' width={100} height={100} />
          </div>*/}
          <h2 className="text-2xl font-bold text-center mb-4">Create User Profile</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="space-y-8">

              <FormFieldComponent form={form} name='username' label='Email address' placeholder='Enter email address of user' />

              {/*<FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address of user" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />*/}

            <FormFieldComponent form={form} name='name' label='Name' placeholder='Enter full name of user' />


              {/*<FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name of user" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />*/}

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

      {/*<FormField
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
        />*/}


              <Button type="submit">Create</Button>
            </form>
          </Form>
        </div>
      </div>




      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          {/*<div className="flex justify-center mb-4">
            <Image src={'/img/gta_logo.png'} alt='logo' width={100} height={100} />
          </div>*/}
          <h2 className="text-2xl font-bold text-center mb-4">Upload File To Drive</h2>
          
            <form className="space-y-8">

              <input type='file' name='file' id="file_up" onChange={handleFileChange} />

              <Button type="submit">Upload</Button>
            </form>
          
        </div>
      </div>



      </>
    );

}

