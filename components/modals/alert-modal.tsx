import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    //AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"

  interface Props {
    is_open:boolean;
    on_confirm:()=>void;
    on_close:()=>void;
    loading:boolean;
    //title:string;
    //desc:string
  }
  
  export function AlertModal({is_open,on_confirm,on_close,loading}:Props) {
    const on_change = ()=>{
        if(!is_open){
             
            on_close()
            
        }else{
          //console.log('I have been surmoned');
          setTimeout(()=>{
            document.body.style.pointerEvents = 'auto';
          },2000);
        }
    }
    return (
      <AlertDialog open={is_open} onOpenChange={on_change}>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Please understand that deleting this also deletes every information associated with it
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading} onClick={on_close}>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
            <Button variant={'destructive'} disabled={loading} onClick={on_confirm}>Continue</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
  