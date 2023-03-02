import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components';
import { GuestContextProvider } from '@/context/GuestContext';
import { AuthContextProvider } from '@/context/AuthContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GuestContextProvider>
      <AuthContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthContextProvider>
    </GuestContextProvider>
  );
}
