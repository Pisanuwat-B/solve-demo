import { useState, useEffect } from 'react';

import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import { AuthProvider } from '../src/lib/auth-service';

import NavBar from '../components/Layout/NavBar';
config.autoAddCss = false;

const originalError = console.error;

console.error = (...args) => {
  if (/Warning.*Function components cannot be given refs/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};

function App({ Component, pageProps }) {
  const router = useRouter();
  const showNav = router.pathname === '/signin' ? false : true;

  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowDimension <= 640;

  pageProps = {
    isMobile: isMobile,
  };

  return (
    <>
      <AuthProvider>
        {showNav && <NavBar isMobile={isMobile}/>}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default App;
