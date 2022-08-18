import Head from 'next/head';
import CourseDetail from '../../components/Course/CourseDetail';

const CoursePage = () => {
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
        <CourseDetail />
      </main>
    </>
  );
};

export default CoursePage;
