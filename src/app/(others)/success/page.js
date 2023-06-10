import Image from 'next/image';
import Link from 'next/link';

const Success = async () => {
  return (
    <div className='h-screen bg-emerald-400'>
      <div className='flex flex-col justify-center items-center p-6 lg:p-20'>
        <div className='flex flex-col items-center gap-6'>
          <Image
            src='/assets/confetti.png'
            height={200}
            width={200}
            alt='confetti'
          />
          <h1 className='text-5xl lg:text-7xl font-medium'>You&apos;re in!</h1>
          <p className='text-2xl'>
            You can now access everything on this site <br />
            Ready to get started?
          </p>
          <Link
            href='/login'
            className='self-stretch text-lg font-medium bg-black px-6 py-4 rounded text-white text-center mt-3 hover:translate-x-2 hover:-translate-y-1 transition-transform'>
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
