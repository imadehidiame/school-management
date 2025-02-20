'use client';
import Image from 'next/image';
import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Total',
    count: 106,
    //uv: 31.47,
    //pv: 2400,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 50,
    //uv: 31.47,
    //pv: 2400,
    //fill: '#DCDCDC',
    fill:'#FAE27C'
  },
  {
    name: 'Boys',
    count: 56,
    //uv: 26.69,
    //pv: 4567,
    //fill: '#1E90FF',
    fill:'#C3EBFA'
  },
  /*{
    name: '30-34',
    uv: 15.69,
    pv: 1398,
    fill: '#8dd1e1',
  },
  {
    name: '35-39',
    uv: 8.22,
    pv: 9800,
    fill: '#82ca9d',
  },
  {
    name: '40-49',
    uv: 8.63,
    pv: 3908,
    fill: '#a4de6c',
  },
  {
    name: '50+',
    uv: 2.63,
    pv: 4800,
    fill: '#d0ed57',
  },
  {
    name: 'unknow',
    uv: 6.67,
    pv: 4800,
    fill: '#ffc658',
  },*/
];


export default class CountChart extends PureComponent {
  

  render() {
    return (
      
      <div className='bg-white rounded-xl w-full h-full p-4'>
        {/**TItLE */}
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold'>Students</h1>
          <Image src={'/moreDark.png'} alt='' width={20} height={20} />
        </div>
        {/**CHART */}
        <div className="w-full h-[75%] relative">

        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            //minAngle={15}
            //label={{ position: 'insideStart', fill: '#fff' }}
            background
            //clockwise={true}
            dataKey="count"
          />
          {/*<Legend iconSize={10} layout="vertical" verticalAlign="middle"  />*/}
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src={'/maleFemale.png'} alt='' className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' height={50} width={50}/>
        </div>
        {/**BOTtOM */}
        <div className='flex justify-center gap-16'>
          <div className='flex flex-col gap-1'>
            <div className='w-5 h-5 bg-[#C3EBFA] rounded-full' />
              <h1 className='font-bold'>1,234</h1>
              <h2 className='text-xs text-gray-300'>Males (55%)</h2>
          </div>

          <div className='flex flex-col gap-1'>
            <div className='w-5 h-5 bg-[#FAE27C] rounded-full' />
              <h1 className='font-bold'>1,195</h1>
              <h2 className='text-xs text-gray-300'>Females (45%)</h2>
          </div>
        </div>
  </div>

      
    );
  }
}