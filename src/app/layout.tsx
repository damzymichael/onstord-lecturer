import Nav from '@/components/Nav';
import type {Metadata} from 'next';
import '@/styles/globals.css';
import {Inter} from 'next/font/google';
import Providers from '@/components/Providers';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import {Toaster} from 'react-hot-toast';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    default: 'Onstord',
    template: '%s | Onstord'
  },
  description: 'Materials sharing application for lecturers'
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body className={inter.className + ' min-w-[350px]'}>
        <Providers>
          <Nav />
          <Toaster
            toastOptions={{
              style: {background: 'rgb(31, 44, 55)', color: 'rgb(17, 24, 39)'},
              error: {duration: 3000}
            }}
          />
          <Toast />
          <main className='pt-22 min-h-screen'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
