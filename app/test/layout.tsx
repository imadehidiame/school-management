import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function TestLayout({ children }: React.PropsWithChildren<{}> ) {
    const session = await auth();

  return (
    <SessionProvider session={session} basePath="/auth">
        {children}
    </SessionProvider>
  )
}
