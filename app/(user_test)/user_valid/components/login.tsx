'use client';
import { signIn } from 'next-auth/react';
import { useActionState, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';

type FormState = | {
    //errors:{
        email?:string[]|undefined,
        name?:string[]|undefined
    //}
    } | null |undefined;

 
const form_schema = z.object({
    email:z.string().nonempty({message:'Please enter your email address'}).email({message:'Please enter a valid email address'}),
    name:z.string().nonempty({message:'Enter your full name'})
  })


 async function login (form_state:FormState,form_data:FormData){
    const valid = form_schema.safeParse({email:form_data.get('email'),name:form_data.get('name')});
    console.log('Valid ',valid);
    const errors = valid.error?.flatten().fieldErrors;
    if(!valid.success){
        return errors;
    }
    console.log('Form submit value ',valid.data);
    //return redirect('/dashboard');
}

export default function LoginPage() {
  const [state,action/*,pending*/] = useActionState(login,null);
  const [email] = useState('');
  const [form_data,set_form_data] = useState({email:'',name:''});
  const [error_values,set_error_values] = useState(state);
  const [is_dirty,set_is_dirty] = useState(false);

  

  type form_schema_props = z.infer<typeof form_schema>;

  /*const form = useForm<form_schema_props>({
    resolver:zodResolver(form_schema),
    defaultValues:{
        email:''
    },
    mode:'onChange',
    shouldFocusError:true,
  });*/

  /*const on_submit = (values:form_schema_props)=>{
    console.log('Form values ',values);
  }*/

  type form_event = {
    target:{
        name:string,
        value:string
    }
  }

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    set_is_dirty(true);
    const valid = form_schema.safeParse({[e.target.name]:e.target.value});
    const errors: { [key: string]: string[] | undefined } | undefined = valid.error?.flatten().fieldErrors;
    if (errors) {
        set_error_values(Object.assign({}, error_values, { [e.target.name]: errors[e.target.name] }));
    }else{
        set_error_values({});
    }
    console.log('errors ',errors);
    set_form_data(Object.assign({},form_data,{[e.target.name]:e.target.value}))
  }

  /*const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('email', { email });
  };*/

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <Image src={'/img/gta_logo.png'} alt='Logo' height={150} width={150} />
        </div>
        <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>

        {/*<Form {...form}>
            <form action={formAction} className='space-y-4'>
                <FormField
                    name='email'
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder='Enter email address' {...field} onChange={()=>{}} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white flex items-center justify-center space-x-2"
                >
            <FontAwesomeIcon icon={faEnvelope} />
            {/*<Mail className="w-5 h-5" />*/}
            {/*<span>Sign in with Email</span>
          </button>
            </form>*/}
        {/*</Form>*/}

        <form action={action} className="space-y-4">
          <input
            type="email"
            value={form_data.email}
            name='email'
            onChange={handleChange}
            placeholder="Email address"
            className={cn("w-full px-4 py-2 bg-gray-100 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",{'border border-red-500 text-red-500 focus:ring-red-500':error_values?.email||(state?.email && !is_dirty)})}
          />
          {((state?.email && !is_dirty) || (error_values?.email)) && (<small className='block text-red-500 font-semibold'>{error_values?.email?.[0] ?? state?.email?.[0]}</small>)}

          <input
            type="name"
            value={form_data.name}
            name='name'
            onChange={handleChange}
            placeholder="Full name"
            className={cn("w-full px-4 py-2 bg-gray-100 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",{'border-2 text-red-500 border-red-500 focus:ring-red-500':error_values?.name||(state?.name && !is_dirty)})}
          />
          {(error_values?.name || (state?.name && !is_dirty)) && (<small className='block text-red-500 font-semibold'>{error_values?.name?.[0] ?? state?.name?.[0]}</small>)}

          {/*error_values?.email && error_values.email.map((e,i)=>(<small key={'email_error_'+i} className='block text-red-500 font-bold'>{e}</small>)) */}
          <button
            type="submit"
            className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white flex items-center justify-center space-x-2"
          >
            <FontAwesomeIcon icon={faEnvelope} />
            <span>Sign in with Email</span>
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <hr className="border-gray-600 flex-grow" />
          <span className="mx-2 text-gray-400">OR</span>
          <hr className="border-gray-600 flex-grow" />
        </div>
        <button
          onClick={() => signIn('google')}
          className="w-full px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white flex items-center justify-center space-x-2"
        >
            <FontAwesomeIcon icon={faGoogle} />
          
          <span>Sign in with Google</span>
        </button>
        <button
          onClick={() => signIn('github')}
          className="w-full px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white flex items-center justify-center space-x-2"
        >
            <FontAwesomeIcon icon={faGithub} />
          {/*<Github className="w-5 h-5" />*/}
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}