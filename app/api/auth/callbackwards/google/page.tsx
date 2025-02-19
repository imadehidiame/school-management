import { auth } from "@/auth";

export default async function Callback() {
    const aut = await auth();
    console.log('Auth value, ',aut);
  return (
    <div>
      <h1>Callback</h1>
    </div>
  );
}