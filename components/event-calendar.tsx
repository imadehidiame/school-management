'use client';
import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Announcements from './announcements';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
    {
        id:1,
        title:'Design the interface',
        time:'12:00 PM - 2:00 PM',
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae amet aperiam deleniti provident eveniet" 
    },
    {
        id:2,
        title:'Layout the pages',
        time:'4:00 PM - 6:00 PM',
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae amet aperiam deleniti provident " 
    },
    {
        id:3,
        title:'Add interractivity',
        time:'8:00 PM - 11:30 PM',
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae amet aperiam deleniti provident eveniet nam consequatur," 
    },
];

export default function EventCalendar(){
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className='bg-white p-4 rounded-md'>
            <Calendar onChange={onChange} value={value} />
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold my-4'>Events</h1>
                <Image src={'/moreDark.png'} alt='' width={20} height={20} />
            </div>
            <div className='flex flex-col gap-4'>
                {events.map((item)=>(
                    <div key={item.id} className='p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-app_blue_default even:border-t-oldlace'>
                        <div className='flex items-center justify-between'>
                            <h1 className='font-semibold text-gray-600'>{item.title}</h1>
                            <span className='text-gray-300 text-xs'>{item.time}</span>
                        </div>
                        <p className='mt-2 text-gray-400 text-sm'>{item.description}</p>
                    </div>
                ))}
            </div>
        </div> 
    )

}