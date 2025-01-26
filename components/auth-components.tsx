import { signIn, signOut } from "@/auth"
import { Button } from "./ui/button"

export function SignIn({
  provider,
  action,
  ...props
}: { provider?: string,action?:()=>void } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={action}
    >
      <Button {...props}>Sign In</Button>
    </form>
  )  
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
