import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Navbar } from '@/components';
import { GuestContextProvider } from '@/context/guest-context';
import { UserContextProvider } from '@/context/user-context';
import { Provider } from 'react-redux';
import { store } from '@/reduxtoolkit/app/store';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const in_dashboard = router.asPath.split('/').includes('dashboard');
  const state = in_dashboard
    ? in_dashboard
    : router.asPath.split('/').pop()?.split('?').includes('dashboard');

  return (
    <GuestContextProvider>
      <UserContextProvider>
        <Provider store={store}>
          <NextNProgress color={'#000'} />
          {state ? null : <Navbar />}
          <Component {...pageProps} />
        </Provider>
      </UserContextProvider>
    </GuestContextProvider>
  );
}
