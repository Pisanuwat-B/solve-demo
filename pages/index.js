import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import Header from '../components/Layout/Header';
import Progress from '../components/Progress/Progress';
import CourseSlider from '../components/Course/CourseSlider';
import CourseList from '../components/Course/CourseList';
import FullwidthBtn from '../components/UI/FullwidthBtn';

import styles from '../styles/Home.module.css';

const popularCourses = [
  { name: 'จำนวนเต็ม', image: '/100.png' },
  { name: 'การสร้างรูปเรขาคณิต', image: '/100.png' },
  { name: 'เลขยกกำลัง', image: '/100.png' },
  { name: 'รูปเรขาคณิต 2 และ 3 มิติ', image: '/100.png' },
];

const recommendCourses = [
  { name: 'กราฟ และความสำพันธ์เชิงเส้น', image: '/100.png' },
  { name: 'สถิติ', image: '/100.png' },
  { name: 'อัตราส่วน สัดส่วน และร้อยละ', image: '/100.png' },
  { name: 'ทศนิยมและเศษส่วน', image: '/100.png' },
];

const listCourses = [
  { name: 'มัธยมศึกษาปีที่ 1', subject: 'คณิตศาสตร์', amount: '9 คอร์ส', exam: '2,050 ข้อสอบ', image: '/100.png' },
  { name: 'มัธยมศึกษาปีที่ 3', subject: 'คณิตศาสตร์', amount: '11 คอร์ส', exam: '3,000 ข้อสอบ', image: '/100.png' },
  { name: 'มัธยมศึกษาปีที่ 4', subject: 'คณิตศาสตร์', amount: '12 คอร์ส', exam: '4,000 ข้อสอบ', image: '/100.png' },
  { name: 'มัธยมศึกษาปีที่ 5', subject: 'คณิตศาสตร์', amount: '9 คอร์ส', exam: '2,000 ข้อสอบ', image: '/100.png' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>SOLVE - Practicing made easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <Header />
      <main className={styles.main}>
        <Progress />
        <CourseSlider name="คอร์สยอดนิยม" data={popularCourses} />
        <CourseSlider name="คอร์สแนะนำสำหรับคุณ" data={recommendCourses} />
        <CourseList name="คอร์สตามลำดับชั้น" data={listCourses} />
        <FullwidthBtn color="green">
          <FontAwesomeIcon icon={faPlay} /> ดูคอร์สทั้งหมด
        </FullwidthBtn>
      </main>
    </>
  );
}
