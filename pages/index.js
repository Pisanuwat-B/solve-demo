import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Layout/Header';
import Progress from '../components/Progress/Progress';
import CourseSlider from '../components/Course/CourseSlider';
import CourseList from '../components/Course/CourseList';
import FullwidthBtn from '../components/UI/FullwidthBtn';
import { getPopularCourse, getLestPopularCourse } from '../src/utils/db';
import { useAuth } from '../src/lib/auth-service';

import styles from '../styles/Home.module.css';

const listCourses = [
  {
    name: 'มัธยมศึกษาปีที่ 1',
    subject: 'คณิตศาสตร์',
    amount: '9 คอร์ส',
    exam: '2,050 ข้อสอบ',
    image: '/100.png',
  },
  {
    name: 'มัธยมศึกษาปีที่ 3',
    subject: 'คณิตศาสตร์',
    amount: '11 คอร์ส',
    exam: '3,000 ข้อสอบ',
    image: '/100.png',
  },
  {
    name: 'มัธยมศึกษาปีที่ 4',
    subject: 'คณิตศาสตร์',
    amount: '12 คอร์ส',
    exam: '4,000 ข้อสอบ',
    image: '/100.png',
  },
  {
    name: 'มัธยมศึกษาปีที่ 5',
    subject: 'คณิตศาสตร์',
    amount: '9 คอร์ส',
    exam: '2,000 ข้อสอบ',
    image: '/100.png',
  },
];

export default function Home(props) {
  const [popularCourses, setPopularCourses] = useState([]);
  const [leastPopularCourses, setLeastPopularCourses] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setPopularCourses(await getPopularCourse());
      setLeastPopularCourses(await getLestPopularCourse());
    };
    fetchData();
  }, []);

  const testnoti = () => {
    console.log('click click');
  }

  return (
    <>
      <Head>
        <title>SOLVE - Practicing made easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className="main-container">
          <div className={styles['user-progress']}>
            {user && <Progress />}
            {user && !props.isMobile && (
              <div className={styles['user-chart']}>
                <Image src="/chart.PNG" alt="placeholder" layout="fill" objectFit="contain"/>
              </div>
            )}
          </div>
          <CourseSlider name="คอร์สยอดนิยม" data={popularCourses} />
          <CourseSlider name="คอร์สแนะนำสำหรับคุณ" data={leastPopularCourses} />
          <CourseList name="คอร์สตามลำดับชั้น" data={listCourses} />
          <FullwidthBtn color="green">
            <FontAwesomeIcon icon={faPlay} /> ดูคอร์สทั้งหมด
          </FullwidthBtn>
          <FullwidthBtn color="red" onClick={testnoti}>
            <FontAwesomeIcon icon={faPlay} /> Test Button
          </FullwidthBtn>
        </div>
      </main>
    </>
  );
}
