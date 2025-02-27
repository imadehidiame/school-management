'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import GithubIcon from '@/public/github_icon.svg';
import EmailSvgIcon from './components/email-svg-icon';
import GoogleSvg from './components/google-svg';
import { LoadAnimation, loader } from '@/components/loader/loading-anime';
 
const form_schema = z.object({
    email:z.string().nonempty({message:'Please enter your email address'}).email({message:'Please enter a valid email address'}),
    //name:z.string().nonempty({message:'Enter your full name'})
})



export default function LoginPage() {
  //const [state,action,pending] = useActionState(login,null);
  const [form_data,set_form_data] = useState({email:''});
  const [error_values,set_error_values] = useState<{email?:string[]}>({});
  const [,set_is_dirty] = useState(false);
  const [,set_error_value] = useState('');
  const [loading,set_loading] = useState(false);
  const search_params = useSearchParams();
  const error = search_params.get('error');
  const router = useRouter();


  useEffect(()=>{

    if(error){
      switch (error) { 
        case 'OAuthAccountNotLinked':
        toast.error('A user already exists with the account you were trying to sign in with. Please sign in with the option used on first sign in',{position:'top-center',duration:15000});
          break;
      
        default:
          break;
      }
    }

  },[error]);
  

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    set_is_dirty(true);
    
    const target = e.target as unknown as HTMLInputElement;
    const valid = form_schema.safeParse({[target.name]: target.value});
    const errors: { [key: string]: string[] | undefined } | undefined = valid.error?.flatten().fieldErrors;
    if (errors) {
        set_error_values(Object.assign({}, error_values, { [target.name]: errors[target.name] }));
    }else{
        set_error_values({});
    }
    //console.log('errors ',errors);
    set_form_data(Object.assign({},form_data,{[target.name]:target.value}))
  }

  const submit_signin = async (provider:string,data:any|undefined|null=undefined) =>{
    LoadAnimation.show('both');
    //loader({loading:'both',is_show:true});
    set_loading(true);
    try {
      await signIn(provider,data);
    } catch (error) {
      if(error instanceof Error){
        set_error_value(error.message);
        set_loading(false);
        //loader({loading:'both',is_show:false});
        LoadAnimation.hide('both');
      }
    }finally{
      set_loading(false);
      
    }
    
  }

  const submit_email = async ()=>{
    //e.preventDefault();
    const valid = form_schema.safeParse({email:form_data.email});
    if(!valid.success){
    const errors: { [key: string]: string[] | undefined } | undefined = valid.error?.flatten().fieldErrors;
    set_error_values({email:errors['email']});
    return;
    }
    LoadAnimation.show('both');
    //loader({loading:'both',is_show:true});
    await submit_signin('nodemailer',{email:valid.data.email});
    //await signIn('nodemailer', { email:form_data.email});
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <Image src={'/img/gta_logo.png'} alt='Logo' className='w-[150px] h-[150px]' width={150} height={150} />
        </div>

        {/*error && ( 
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {error}
          </div>
        )*/}

        <h1 className="text-3xl font-bold text-center mb-4">Sign In</h1>

        <div className="space-y-4">
          <input
            type="email"
            value={form_data.email}
            name='email'
            onChange={handleChange}
            placeholder="Email address"
            className={cn("w-full px-4 py-2 bg-gray-100 text-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-blue-500",{'border border-red-500 text-red-500 focus:ring-red-500':error_values?.email})}
          />
          {((error_values?.email)) && (<small className='block text-red-500 font-semibold'>{error_values?.email?.[0] }</small>)}
          <button
            type="button"
            className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white flex items-center justify-center space-x-2"
            onClick={submit_email}
            disabled={loading}
          >
            
            {/*<FontAwesomeIcon icon={faEnvelope} />
            <Image priority src={EmailIcon} alt="Email icon" width={20} height={20} />*/}
            <EmailSvgIcon />
            <span>Sign in with Email</span>
          </button>
        </div>
        <div className="flex items-center justify-center my-4">
          <hr className="border-gray-600 flex-grow" />
          <span className="mx-2 text-gray-400">Or</span>
          <hr className="border-gray-600 flex-grow" />
        </div>
        
        <button
          type='submit'
          className="w-full px-4 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded flex items-center justify-center space-x-2"
          onClick={()=>submit_signin('google')}
          disabled={loading}
        >
            {/*<FontAwesomeIcon icon={faGoogle} />
            <Image priority src={GoogleIcon} alt="Google icon" width={20} height={20} />*/}
            <GoogleSvg />
          <span>Sign in with Google</span>
        </button>
        
        
        
        
        
        <button
          type="submit"
          className="w-full px-4 py-2 border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white flex items-center justify-center space-x-2"
          onClick={()=>submit_signin('github')}
          disabled={loading}
        >
          <Image priority src={GithubIcon} alt="Github icon" className='text-gray-800 hover:bg-gray-800 hover:text-white' width={20} height={20} />
            {/*<FontAwesomeIcon icon={faGithub} />*/}
          {/*<Github className="w-5 h-5" />*/}
          <span>Sign in with GitHub</span>
        </button>
        
     </div>
    </div>
  );
}