import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Header from '../../components/Layout/Header';
import CourseDetail from '../../components/Course/CourseDetail';
import { getCoursesByID, checkIfOwn, addOwnCourse } from '../../src/utils/db';
import { useAuth } from '../../src/lib/auth-service'; 

const CoursePage = () => {
  const router = useRouter();
  const courseID = router.query.id;
  const { user } = useAuth() 

  const [courseData, setCourseData] = useState([]);
  const [own, setOwn] = useState(false);

  useEffect(() => {
    if (courseID) {
      const fetchData = async () => {
        setCourseData(await getCoursesByID(courseID));
        setOwn(await checkIfOwn(user.uid ,courseID));
      };
      fetchData();
    }
  }, [courseID, user]);

  const handleBuy = async () => {
    addOwnCourse(user.uid, courseID);
    setOwn(await checkIfOwn(user.uid ,courseID));
  }

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
      <main>
        <CourseDetail {...courseData} own={own} onClick={handleBuy} />
      </main>
    </>
  );
};

export default CoursePage;
