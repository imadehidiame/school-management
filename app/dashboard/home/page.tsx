'use server'
import { auth } from "@/auth";

export default async function Home(){
    const session = await auth();
    return (
        <div>
            <h1>This is a protected route</h1>
        </div>
    );
}