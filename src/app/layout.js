'use client';
import Navbar from './core/components/Navbar';
import './styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';

export const metadata = {
  title: 'DigiNext - Sell digital products',
  description: 'Sell digital products',
};

const navbarPages = ['/success', '/login'];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar = navbarPages.includes(pathname);

  return (
    <html lang='en'>
      <body className='bg-white'>
        {!hideNavbar && <Navbar />}
        <div className={!hideNavbar ? 'h-[calc(100vh-74px)]' : 'h-full'}>
          {children}
        </div>
      </body>
    </html>
  );
}
