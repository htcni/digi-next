'use client';
import Link from 'next/link';
import Toggle from './Toggle';
import { useState } from 'react';
import { SITE_URL } from '@/app/core/utils';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

export const Plans = ({ plans }) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [selected, setSelected] = useState('month');
  const plan = plans.find((plan) => plan.interval === selected);

  const togglePlan = () => {
    let currentInterval = selected === 'month' ? 'year' : 'month';
    setSelected(currentInterval);
  };

  const stripePromise = loadStripe(
    `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
  );
  const onCheckout = async () => {
    setIsRedirecting(true);
    const res = await fetch(`${SITE_URL}/api/checkout/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId: plan.id }),
    });
    const data = await res.json();
    router.replace(data);
    setIsRedirecting(false);
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
          <button
            onClick={onCheckout}
            disabled={isRedirecting}
            className='bg-black py-3 px-8 self-stretch text-center text-white text-xl rounded hover:translate-x-2 hover:-translate-y-1 transition-transform mt-4 disabled:bg-opacity-40'>
            {isRedirecting ? 'Processing...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
