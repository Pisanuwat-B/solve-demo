import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import Quiz from '../../components/Quiz/Quiz';
import BackBtn from '../../components/UI/BackBtn';
import { useAuth } from '../../src/lib/auth-service';
import { getQuestionByID } from '../../src/utils/db';

const CoursePage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const courseID = router.query.id;

  const [loader, setLoader] = useState(true);
  const [notice, setNotice] = useState('Loading ...')

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

  const [questionData, setQuestionData] = useState('');

  useEffect(() => {
    if (courseID) {
      const fetchData = async () => {
        setQuestionData(await getQuestionByID(courseID));
      };
      fetchData();
    }
  }, [courseID, user]);

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
      <main>
        <BackBtn />
        {!loader ? (
          <Quiz courseID={courseID} data={questionData.sets} />
        ) : (
          <div>{notice}</div>
        )}
      </main>
    </>
  );
};

export default CoursePage;
