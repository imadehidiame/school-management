//import { handlers } from '@/auth';
import { handlers } from '@/authjs';
//import NextAuth from 'next-auth';

//const handler = NextAuth(auth_options);


//export { handler as GET, handler as POST};

export const { GET,POST } = handlers;