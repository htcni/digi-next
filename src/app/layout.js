import Navbar from './core/components/Navbar';
import './styles/globals.css';

export const metadata = {
  title: 'DigiNext - Sell digital products',
  description: 'Sell digital products',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='bg-white'>
        <Navbar />
        <div className='h-[calc(100vh-74px)]'>{children}</div>
      </body>
    </html>
  );
}
