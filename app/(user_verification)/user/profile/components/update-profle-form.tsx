'use client';
import { useForm } from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut, useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const form_schema = z.object({
    username:z.string().nonempty({message:'Username field is required'}).email({message:'Enter a valid email address'}).trim(),
    name: z.string().regex(/^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/i, { message: 'Enter a valid name in the first name and last name format' }).trim(),
});

export default function UpdateProfileForm(){
    const route = useRouter();
    const { data:session,update } = useSession();

    const form = useForm<z.infer<typeof form_schema>>({
        resolver:zodResolver(form_schema), 
        defaultValues:{
            username:session?.user?.email || '',
            name:session?.user?.name||""
        }
    });

    const error_handler = (error:Error)=>{
      toast.error(error.message,{duration:7000,position:'bottom-center'});
    }

    async function on_submit(values:z.infer<typeof form_schema>){
        const {username,name} = values;

        try {

          const {status,data,statusText} = await axios.post('/api/update-user',JSON.stringify({username,name}));
          console.log('data ',data);
          switch (status) {
            case 500:
              throw new Error("Error on the server",{cause:500});
            case 404:
                throw new Error("Resource not found",{cause:500});
            case 200:
              console.log('Data from server ',data);
              
              const sess = await update({...session,user:{...session?.user,name}});
              console.log('Session update ',sess);
              console.log('session role ',session?.user.role);
              toast.success('Data updated successfully',{position:'top-center','duration':7000});  
              //route.refresh();
              route.push(`/${sess?.user.role}`)
              break;
              //throw new Error("Data has been updated successfully",{cause:200})
            case 401:
            case 403:
              toast.error('Please sign in to continue',{position:'top-center','duration':7000});  
             await signOut();
            break;
            default:
            break;
          }
          
        } catch (error) {
            if(error instanceof Error)
            error_handler(error);
        }

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
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <div className="flex justify-center mb-4">
            <Image src={'/img/gta_logo.png'} alt='logo' width={100} height={100} />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(on_submit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update</Button>
            </form>
          </Form>
        </div>
      </div>
    );

}

