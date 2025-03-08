import ErrorPage from "@/components/error-page";
import { prisma } from "@/prisma";
import Parents from "./components/parents";

export default async function ParentsPage(){
    try {
    
        const parents = await prisma.parent.findMany();
        return <Parents parents_data={parents} />

    } catch (error) {
        console.log(error);
        return <ErrorPage title="Error Page" />
    }
} 