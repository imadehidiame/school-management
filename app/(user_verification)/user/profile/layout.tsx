import { auth } from '@/authjs';
import { SessionProvider } from 'next-auth/react';


export default async function UserProfileLayout({children}:React.PropsWithChildren<{}>){
    const session = await auth();
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}