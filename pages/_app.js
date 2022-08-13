import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import { AuthProvider } from '../src/lib/auth-service';

import NavBar from '../components/Layout/NavBar';
config.autoAddCss = false;

function App({ Component, pageProps }) {
  const router = useRouter();
  const showNav = (router.pathname === '/practice' || router.pathname === '/signin') ? false : true;
  return (
    <>
      <AuthProvider>
        {showNav && <NavBar />}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default App;
