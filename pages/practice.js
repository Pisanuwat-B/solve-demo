import Head from 'next/head';
import Quiz from '../components/Quiz/Quiz';
import BackBtn from '../components/UI/BackBtn';

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
        <BackBtn />
        <Quiz />
      </main>
    </>
  );
};

export default CoursePage;
