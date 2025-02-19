import { auth_options } from '@/authjs';
import NextAuth, { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import {z} from 'zod';

const {signIn} = NextAuth(auth_options);

type FormState = | 
{
        email?:string[]|undefined,
} 
| null | undefined;

const AUTH_ERROR_PAGE = '/auth/signin';
 
const form_schema = z.object({
    email:z.string().nonempty({message:'Please enter your email address'}).email({message:'Please enter a valid email address'}),
    //name:z.string().nonempty({message:'Enter your full name'})
  })


 export async function login (form_state:FormState,form_data:FormData){
    
    try {
        const valid = form_schema.safeParse({email:form_data.get('email')});
        const errors = valid.error?.flatten().fieldErrors;
        if(!valid.success){
            return errors;
        }
    //console.log('Form submit value ',valid.data);
        signIn('email',{values:valid.data});        
    } catch (error) {
        if(error instanceof AuthError){
            
            return redirect(`${AUTH_ERROR_PAGE}?error=${error.message}`)
        }
    }
}

export async function login_provider(form_data:FormData|undefined){
    try {
    
    console.log('form data, ',form_data);
    const provider = form_data?.get('provider') as string | undefined;
    signIn(provider);

    } catch (error) {
        if(error instanceof AuthError){
            return redirect(`${AUTH_ERROR_PAGE}?error=${error.message}`)
        }
    }
    
}
