'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  //DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useEffect } from "react";
import ModalOverlay from "./modal-overlay";
import ModalLoadingComponent from "./loader/loading-anime";

interface ModalProps {
    is_open:boolean;
    //modal_state_change:(open:boolean)=>void;
    children:React.ReactNode;
    classes?:string;
    title:string;
    description?:string;
    on_close_action:()=>void;
    submit_action?:()=>void
}

export const Modal:React.FC<ModalProps> = ({is_open,children,classes,title,description,on_close_action,submit_action})=>{
  useEffect(()=>{
    if(is_open)
      document.body.style.pointerEvents = 'auto';
    return ()=>{
      document.body.style.pointerEvents = 'auto';
    }
  },[is_open]);
  const on_change = (open:boolean)=>{
    if(!open){
      
      on_close_action()
      setTimeout(()=>{
        //console.log(document.body.style.pointerEvents);
        document.body.style.pointerEvents = 'auto';
      },4000);
      //console.log('Close event called'); 
    }else{
      
    }
  }
  return (
    <>
    <ModalOverlay is_open={is_open} />
    <Dialog open={is_open} onOpenChange={on_change}>
      <DialogContent className={`sm:max-w-[600px] z-[1000] overflow-y-auto max-h-[100vh] ${cn(classes)}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <ModalLoadingComponent />
        
        {children} 

        {/*<div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>*/}
        <DialogFooter>
           { submit_action && <Button onClick={submit_action} type="submit">Save changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}

