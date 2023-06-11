'use client';

import Image from 'next/image';
import LoginForm from './components/LoginForm';
import Logo from '../core/components/Logo';
import LoginSubmitted from './components/LoginSubmitted';
import { useState } from 'react';

const Login = () => {
  const [submitted, setSubmitted] = useState('');
  return (
    <div className='h-full grid grid-cols-1 lg:grid-cols-2'>
      <div className='bg-white border-r-2 border-black'>
        <div className='h-full p-20 flex flex-col items-center justify-center space-y-10'>
          <Logo />
          {submitted ? (
            <LoginSubmitted submitted={submitted} />
          ) : (
            <LoginForm setSubmitted={setSubmitted} />
          )}
        </div>
      </div>
      <div className=' hidden lg:block bg-[#1d2a91] border-r-2 border-black'>
        <div className='h-full p-[6.5vw] flex items-center justify-center'>
          <Image src='/assets/login.png' alt='login' width={600} height={600} />
        </div>
      </div>
    </div>
  );
};

export default Login;
