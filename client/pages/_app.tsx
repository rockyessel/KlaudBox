import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components';
import { GuestContextProvider } from '@/context/GuestContext';
import { Provider } from 'react-redux';
import { store } from '@/reduxtoolkit/app/store';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const in_dashboard = router.asPath.split('/').includes('dashboard');

  return (
    <GuestContextProvider>
      <Provider store={store}>
        {in_dashboard ? null : <Navbar />}
        <Component {...pageProps} />
      </Provider>
    </GuestContextProvider>
  );
}
