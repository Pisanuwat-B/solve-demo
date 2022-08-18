import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Header from '../../components/Layout/Header';
import CourseDetail from '../../components/Course/CourseDetail';
import { getCoursesByID } from '../../src/utils/db';

const CoursePage = () => {
  const router = useRouter();
  const courseID = router.query.id;

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    if (courseID) {
      const fetchData = async () => {
        setCourseData(await getCoursesByID(courseID));
      };
      fetchData();
    }
  }, [courseID]);

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
        <CourseDetail {...courseData}/>
      </main>
    </>
  );
};

export default CoursePage;
