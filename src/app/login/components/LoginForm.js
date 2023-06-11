'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = ({ setSubmitted }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabaseClient = createClientComponentClient();
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target.elements.email.value;

    const { error } = await supabaseClient.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: window.origin.loaction,
      },
    });
    if (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    } else {
      setError('');
      setLoading(false);
      setSubmitted(email);
    }
  };
  return (
    <form className='flex flex-col gap-8 max-w-[500px]' onSubmit={handleSubmit}>
      {error && (
        <div className='p-4 bg-red-100 rounded text-medium text-red-700'>
          {error}
        </div>
      )}
      <h1 className='text-6xl sm:text-7xl font-bold'>Welcome back</h1>
      <div className='flex flex-col gap-1'>
        <label htmlFor='email' className='font-lg '>
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          autoComplete='email'
          className='text-2xl leading-6 px-3 py-4 border-2 border-black'
          required
        />
      </div>
      <button
        disabled={loading}
        className='bg-black py-3 px-8 self-stretch text-center text-white text-xl rounded hover:translate-x-2 hover:-translate-y-1 transition-transform mt-4 disabled:bg-opacity-40'
        type='submit'>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;
