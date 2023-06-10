'use client';
import Navbar from './core/components/Navbar';
import './styles/globals.css';
import { useRouter, usePathname } from 'next/navigation';

export const metadata = {
  title: 'DigiNext - Sell digital products',
  description: 'Sell digital products',
};

const navbarPages = ['/success'];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbar = navbarPages.includes(pathname);

  return (
    <html lang='en'>
      <body className='bg-white'>
        {!hideNavbar && <Navbar />}
        <div className='h-[calc(100vh-74px)]'>{children}</div>
      </body>
    </html>
  );
}
