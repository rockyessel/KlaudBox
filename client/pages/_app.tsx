import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components';
import { GuestContextProvider } from '@/context/GuestContext';
import { Provider } from 'react-redux';
import { store } from '@/reduxtoolkit/app/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GuestContextProvider>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </GuestContextProvider>
  );
}
