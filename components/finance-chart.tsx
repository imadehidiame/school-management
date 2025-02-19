'use client'
import Image from "next/image"
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    income: 400000,
    expenses: 240000,
    
  },
  {
    name: 'Feb',
    income: 300000,
    expenses: 139800,
    
  },
  {
    name: 'Mar',
    income: 2000000,
    expenses: 980000,
    
  },
  {
    name: 'Apr',
    income: 2780000,
    expenses: 390800,
    
  },
  {
    name: 'May',
    income: 189000,
    expenses: 48000,
    
  },
  {
    name: 'Jun',
    income: 239000,
    expenses: 38000,
    
  },
  {
    name: 'Jul',
    income: 349000,
    expenses: 43000,
    
  },
  {
    name: 'Aug',
    income: 3490000,
    expenses: 430004,
    
  },
  {
    name: 'Sep',
    income: 3456200,
    expenses: 430021,
    
  },
  {
    name: 'Oct',
    income: 7893700,
    expenses: 3400003,
    
  },
  {
    name: 'Nov',
    income: 349572,
    expenses: 43032,
    
  },
  {
    name: 'Dec',
    income: 98989898,
    expenses: 626353,
    
  },
];



export default function FinanceChart(){
    return (
            <div className='bg-white rounded-xl w-full h-full p-4'>
                    {/**TItLE */}
                    <div className='flex justify-between items-center'>
                      <h1 className='text-lg font-semibold'>Finance</h1>
                      <Image src={'/moreDark.png'} alt='' width={20} height={20} />
                    </div>
                    {/**CHART */}
            

    <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false} tickMargin={20} />
          <Tooltip />
          <Legend align='center' verticalAlign='top' wrapperStyle={{paddingTop:'10px',paddingBottom:'30px'}} />
          <Line type="monotone" dataKey="income" stroke="#C3EBFA" strokeWidth={5}  />
          <Line type="monotone" dataKey="expenses" stroke="#CFCEFF" strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>

            

        

                    
                    
              </div>
    )
}