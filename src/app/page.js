import Image from 'next/image';
import Link from 'next/link';
import hero from '../../public/assets/store.png';
export const metadata = {
  title: 'DigiNext - Sell digital products',
  description: 'Sell digital products',
};

export default function Home() {
  return (
    <main className='overflow-hidden'>
      <div className='bg-white grid grid-cols-1 lg:grid-cols-2'>
        <div className='bg-amber-400 border-r-2 border-black'>
          <div className='h-full p-[6.5vw] flex items-center  min-h-[22rem]'>
            <div className=''>
              <div className='flex flex-col gap-12 max-w-[48rem]'>
                <h1 className='text-center lg:text-start text-6xl sm:text-7xl xl:text-8xl tracking-tight xl:leading-[0.9]'>
                  Sell your
                  <br /> first product.
                </h1>
                <p className='text-2xl'>
                  DigiNext opens up a world of possibilities where anyone can
                  kickstart their online earnings journey.
                </p>
                <Link href='/products'>
                  <div className='bg-black text-cente py-4 px-8 text-center text-white text-xl lg:text-2xl lg:inline-block rounded hover:translate-x-2 hover:-translate-y-1 transition-transform'>
                    Explore Products
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-teal-400 border-r-2 border-black'>
          <div className='h-full p-[6.5vw] flex items-center  min-h-[22rem]'>
            <div className='max-w-[45rem]'>
              <Image
                src={hero}
                alt='hero'
                className='object-contain'
                placeholder='blur'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='p-1 bg-black text-center text-white'>
        Image by{' '}
        <a href='https://www.freepik.com/free-vector/hand-drawn-retro-branding-labels-collection_35106263.htm#page=4&query=retro%20illustration%20pack&position=1&from_view=search&track=ais'>
          Freepik
        </a>
      </div>
    </main>
  );
}
