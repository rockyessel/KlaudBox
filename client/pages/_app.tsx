import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components';
import { GuestContextProvider } from '@/context/GuestContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GuestContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </GuestContextProvider>
  );
}
