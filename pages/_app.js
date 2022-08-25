import { useState, useEffect } from 'react';

import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useRouter } from 'next/router';
import { AuthProvider } from '../src/lib/auth-service';
import { getPopularCourse, getLestPopularCourse } from '../src/utils/db';

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
  const showNav =
    router.pathname === '/practice' || router.pathname === '/signin'
      ? false
      : true;

  const [popularCourses, setPopularCourses] = useState([]);
  const [leastPopularCourses, setLeastPopularCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setPopularCourses(await getPopularCourse());
      setLeastPopularCourses(await getLestPopularCourse());
    };
    fetchData();
  }, []);

  pageProps = {
    popularCourses: popularCourses,
    leastPopularCourses: leastPopularCourses,
  };

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
