'use client';
import styles from './loader-styles.module.css'
import { cn } from '@/lib/utils'
import { useEffect } from 'react';
import React from 'react';

const ModalLoadingComponent: React.FC = () => {
    useEffect(()=>{
        const loading_bar = document.getElementById('modal-loading-bar');
        setTimeout(()=>{
            
            if(!loading_bar){
                console.log('No ID available');
            }
        },10000);
    },);
    return ( 
    <>
        <div id='modal-loading-bar' className={cn(styles.modal_load_bar,'hidden')}></div>
        <div id="modal-loading-circle" className={cn('fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-30','hidden')}>
        {/*<div className="w-20 h-20 border-8 border-t-8 border-blue-200 rounded-full animate-spin"></div>*/}
        <div className={styles.modal_loading_circle}></div> 
        </div>
    </>
    )
}

export default ModalLoadingComponent;



interface LoaderInit {
    loading:'both'|'circular'|'bar';
    duration?:number;
    is_show?:boolean;
}

const hide_show_anime =  ({loading,is_show}:LoaderInit)=>{
    const loading_bar = document.getElementById('modal-loading-bar');
    const loading_circle = document.getElementById('modal-loading-circle');
    switch (loading) {
        case 'circular':
            if(is_show){
                loading_circle?.classList.remove('hidden');
                loading_circle?.classList.add('flex');
            }
            else
                loading_circle?.classList.add('hidden');
            break;
        case 'bar':
            if(is_show)
                loading_bar?.classList.remove('hidden');
            else
                loading_bar?.classList.add('hidden');
            break;
        case 'both':
            if(is_show){
                loading_circle?.classList.remove('hidden');
                loading_circle?.classList.add('flex');
                loading_bar?.classList.remove('hidden');
            }else{
                loading_circle?.classList.add('hidden');
                loading_bar?.classList.add('hidden');
            }
            break;
        default:
            throw new Error('Invalid loading option',{cause:500});
            //break;
    }
} 

export const loader = ({loading,duration,is_show}:LoaderInit)=>{
    //if(loader_init.hasOwnProperty('')){}
    if(duration){
        hide_show_anime({loading,is_show});
        setTimeout(()=>{
            hide_show_anime({loading,is_show:!is_show});
        },duration);
    }else{
        hide_show_anime({loading,is_show});
    }
}

export class ModalLoadingAnimation {
    static show = (loading:'both'|'circular'|'bar',duration?:number)=>{
        loader({loading,duration,is_show:true});
    }
    static hide = (loading:'both'|'circular'|'bar',duration?:number)=>{
        loader({loading,duration,is_show:false});
    }
    static is_animation_invisible = (loading:'both'|'circular'|'bar') =>{
        const loading_bar = document.getElementById('modal-loading-bar');
        const loading_circle = document.getElementById('modal-loading-circle');
        switch (loading) {
            case 'bar':
            return loading_bar?.classList.contains('hidden');        
            //break;
            case 'circular': 
            return loading_circle?.classList.contains('hidden');
            case 'both':
            return loading_bar?.classList.contains('hidden') && loading_circle?.classList.contains('hidden');
            default:
            return loading_bar?.classList.contains('hidden') && loading_circle?.classList.contains('hidden');
            //break; 
        }
    }
} 
                  