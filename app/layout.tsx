import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
//import Footer from "@/components/footer"
//import Header from "@/components/header"
import { Toaster } from 'react-hot-toast';
//import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react"
import LoadingAnime from "@/components/loader/loading-anime";
import { auth } from "@/authjs"
import ParentModalProvider from "@/components/providers/parents/parent-modal-provider";
import VehicleModalProvider from "@/components/providers/transports/vehicle-modal-provider";
import RouteModalProvider from "@/components/providers/transports/route-modal-provider";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GTA Portal",
  description:
    "GTA School Portal",
}

export default async function RootLayout({ children }: React.PropsWithChildren) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>

      <body className={inter.className}>
        <ParentModalProvider />
        <VehicleModalProvider />
        <RouteModalProvider />
        <LoadingAnime />
      {/*<ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange 
          >*/}
        <Toaster />
        <SessionProvider session={session}>
        {children}
        </SessionProvider>
      {/*</ThemeProvider>*/}
      </body>
    </html>
  )
}
