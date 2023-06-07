import Link from 'next/link';
import Logo from './Logo';

const Navbar = () => {
  return (
    <div className='bg-white flex justify-between items-center pl-3 border-black border-b-2'>
      <Link href='/'>
        <Logo />
      </Link>
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
    </div>
  );
};

export default Navbar;
