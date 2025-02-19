'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
//import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


export default function VerifyRequestPage() {
  const [countdown, setCountdown] = useState(60);
  const [email, set_email] = useState('');
  //const router = useRouter();
  //const {email} = router.query;
  //console.log('email value ',email);

  useEffect(() => {
    let timing: string | number | NodeJS.Timeout | undefined = undefined;
    const fetch_email = async ()=>{
      const data = await fetch('/api/get_email',{method:'GET'});
      if(data.ok){
        let {email} = await data.json();
        console.log('email from server in verify reqest ',email);
        if(email){
          set_email(email);
          timing = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
          }, 1000);
        }
      }
    }
    fetch_email();
    return () => clearInterval(timing);
  }, []);

  const handleResend = async() => {
    setCountdown(60); 
    await signIn('nodemailer',{email,redirectTo:'/dashboard'});
    // Reset the countdown
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded shadow-md">
              <h1 className="text-3xl font-bold text-center text-red-500 mb-4">Check Your Email</h1>
              <p className="text-center text-gray-300 py-2">A sign-in link has been sent to your email address. Please check your inbox and click the link to continue. </p>
              
              <p>
              
              </p>
              
              <div className="flex justify-center mt-4">

              {
              email && <Button variant={'default'} className='w-full px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white flex items-center justify-center space-x-2' onClick={handleResend} disabled={countdown > 0}>
                  <FontAwesomeIcon icon={faEnvelope} /> Resend Email  {countdown > 0 && `In (${countdown}s)`}
                </Button>
              }
              </div>

<div className="flex justify-center mt-4 cursor-crosshair">

            <p className=''>
              <Link href="/auth/signin">
                Return to Home
            </Link>
            </p>

                
              </div>
            </div>
        </div>
 
  );
}