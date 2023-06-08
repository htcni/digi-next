import Navbar from './core/components/Navbar';
import './styles/globals.css';

export const metadata = {
  title: 'DigiNext - Sell digital products',
  description: 'Sell digital products',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='bg-black'>
      <body className='bg-white'>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
