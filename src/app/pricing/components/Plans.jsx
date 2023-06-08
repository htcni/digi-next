'use client';
import Link from 'next/link';
import Toggle from './Toggle';
import { useState } from 'react';

export const Plans = ({ plans }) => {
  const [selected, setSelected] = useState('month');
  const plan = plans.find((plan) => plan.interval === selected);

  const togglePlan = () => {
    let currentInterval = selected === 'month' ? 'year' : 'month';
    setSelected(currentInterval);
  };

  return (
    <div className='bg-red-400 border-r-2 border-black'>
      <div className='h-full p-[6.5vw] flex items-center justify-center'>
        <div className=' flex flex-col gap-4 items-center border-2 rounded-lg border-black bg-white min-w-[22rem] p-8'>
          <div className='flex gap-4 justify-center'>
            <div className='font-semibold uppercase'>Monthly</div>
            <Toggle onChange={togglePlan} />
            <div className='font-semibold uppercase'>Yearly</div>
          </div>
          <h3 className='text-3xl font-bold'>Pro Plan</h3>
          <div className='text-xl'>
            Just <span className='font-semibold'>${plan.price}</span>/
            {plan.interval}
          </div>
          <button className='bg-black py-3 px-8 text-center text-white text-xl rounded hover:translate-x-2 hover:-translate-y-1 transition-transform mt-4'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
