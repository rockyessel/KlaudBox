import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components';
import { GuestContextProvider } from '@/context/GuestContext';
import { CookiesProvider } from 'react-cookie';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <GuestContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </GuestContextProvider>
    </CookiesProvider>
  );
}
