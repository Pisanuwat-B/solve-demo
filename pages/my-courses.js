import { useState, useEffect } from 'react';
import Head from 'next/head';

import Header from '../components/Layout/Header';
import { useAuth } from '../src/lib/auth-service';
import UserCourse from '../components/Course/UserCourse';
import { getUserOwnCourse } from '../src/utils/db';

const CoursePage = () => {
  const [loader, setLoader] = useState(true);
  const [notice, setNotice] = useState('Loading ...');
  const [userCourse, setUserCourse] = useState('');

  const { user } = useAuth();

  setTimeout(() => {
    if (!user) {
      setNotice('User not found, Please log in and try again');
    }
  }, 2500);

  useEffect(() => {
    if (user) {
      setLoader(false);
    }
  }, [user]);

  useEffect(() => {
    if (!userCourse && user) {
      const fetchData = async () => {
        setUserCourse(await getUserOwnCourse(user.uid));
      };
      fetchData()
    }
  }, [user, userCourse])

  return (
    <>
      <Head>
        <title>SOLVE - Practicing makde easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <Header />
      <main>{!loader ? <div><UserCourse courses={userCourse.ownCourse}/></div> : <div>{notice}</div>}</main>
    </>
  );
};

export default CoursePage;
