'use client';
import Link from 'next/link';
import Logo from './Logo';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import useSession from '../hooks/useSession';

import { SITE_URL } from '../utils';

const Navbar = () => {
  const supabaseClient = createClientComponentClient();
  const [session, setSession] = useSession();

  const signOut = () => {
    supabaseClient.auth.signOut();
    setSession(null);
  };

  const onManageBilling = async () => {
    const response = await fetch(`${SITE_URL}/api/billing`);
    const data = await response.json();

    if (data) {
      window.location.href = data.url;
    }
  };

  return (
    <div className='sticky top-0 bg-white flex justify-between items-center pl-3 border-black border-b-2'>
      <Link href='/'>
        <Logo />
      </Link>
      {session ? (
        <nav className='flex '>
          <Link
            href='/products'
            className='py-6 px-[3vw] border-l-2 border-black hover:bg-fuchsia-400 hover:text-black transition-colors'>
            <div>Products</div>
          </Link>
          <a
            onClick={onManageBilling}
            className='cursor-pointer py-6 px-[3vw] border-l-2 border-black hover:bg-fuchsia-400 hover:text-black transition-colors'>
            <div>Billing</div>
          </a>
          <button
            onClick={signOut}
            className='bg-black px-[3vw] py-6 border-black border-l-2 text-white hover:bg-fuchsia-400 hover:text-black transition-colors'>
            <div>Logout</div>
          </button>
        </nav>
      ) : (
        <nav className='flex '>
          <Link
            href='/pricing'
            className='py-6 px-[3vw] border-l-2 border-black hover:bg-fuchsia-400 hover:text-black transition-colors'>
            <div>Pricing</div>
          </Link>
          <Link
            href='/login'
            className='bg-black px-[3vw] py-6 border-black border-l-2 text-white hover:bg-fuchsia-400 hover:text-black transition-colors'>
            <div>Login</div>
          </Link>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
