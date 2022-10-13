import Image from 'next/image';
import Link from 'next/link';
import FullwidthBtn from '../UI/FullwidthBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../src/lib/auth-service';

import styles from './CourseDetail.module.css';

const CourseDetail = (props) => {
  const testsrc = '/placeholder.png';
  const { role } = useAuth();

  const buyPressed = () => {
    props.onClick();
  };

  var course_button;
  if (props.own) {
    course_button = (
      <Link href={'/practice/' + props.id} passHref>
        <FullwidthBtn color="red">
          <FontAwesomeIcon icon={faPlay} /> เริ่มทำโจทยย์
        </FullwidthBtn>
      </Link>
    );
  } else if (role === 'tutor') {
    course_button = (
      <FullwidthBtn color="blue">
        <FontAwesomeIcon icon={faPlay} /> ดูรายละเอียด
      </FullwidthBtn>
    );
  } else {
    course_button = (
      <FullwidthBtn color="green" onClick={buyPressed}>
        <FontAwesomeIcon icon={faPlay} /> ซิ้อคอร์สนี้
      </FullwidthBtn>
    );
  }

  return (
    <div className={styles['course-item']}>
      <Image
        src={props.img}
        alt="Placeholder"
        width={150}
        height={250}
        objectFit="contain"
      />
      <div className={styles['course-detail']}>
        <div className={styles['course-subtitle']}>{props.subject}</div>
        <div className={styles['course-title']}>{props.name}</div>
        <div className={styles['course-level']}>{props.level}</div>
        <div className={styles['course-subtitle']}>{props.desc}</div>
        <div className={styles['course-price']}>{props.price} ฿</div>
        {course_button}
      </div>
    </div>
  );
};

export default CourseDetail;
