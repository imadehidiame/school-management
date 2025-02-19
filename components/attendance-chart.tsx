'use client'
import Image from 'next/image';
import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Mon',
      present: 44,
      absent: 10,
      //amt: 2400,
    },
    {
      name: 'Tue',
      present: 52,
      absent: 2,
      amt: 2210,
    },
    {
      name: 'Wed',
      present: 50,
      absent: 4,
      amt: 2290,
    },
    {
      name: 'Thu',
      present: 45,
      absent: 9,
      amt: 2000,
    },
    {
      name: 'Fri',
      present: 48,
      absent: 12,
      amt: 2181,
    },
    
  ];
  


export default class AttendanceChart extends PureComponent{
    render(){
        return (
            <div className='bg-white rounded-lg p-4 h-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-lg font-semibold'>Attendance</h1>
                    <Image alt='' src={'/moreDark.png'} width={20} height={20} />
                </div>
            <ResponsiveContainer width="100%" height="90%">
              <BarChart
                width={500}
                height={300}
                data={data}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd' />
                <XAxis dataKey="name" axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false} />
                <YAxis axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false} />
                <Tooltip contentStyle={{borderRadius:'10px',borderColor:'lightgray'}} />
                <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:'20px',paddingBottom:'40px'}} />
                <Bar legendType='circle' dataKey="present" fill="#C3EBFA" activeBar={<Rectangle fill="#C3EBFA" stroke="#C3EBFA" radius={[10,10,0,0]} />} />
                <Bar legendType='circle' radius={[10,10,0,0]} dataKey="absent" fill="#FAE27C" activeBar={<Rectangle fill="#FAE27C" stroke="#FAE27C" />} />
              </BarChart>
            </ResponsiveContainer>
            </div>
            
          );
    }
    
}