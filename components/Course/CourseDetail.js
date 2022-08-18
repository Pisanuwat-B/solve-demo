import Image from 'next/image';
import Link from 'next/link';
import FullwidthBtn from '../UI/FullwidthBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './CourseDetail.module.css';

const CourseDetail = (props) => {
  const testsrc = '/placeholder.png';
  return (
    <Link href="/practice">
      <div className={styles['course-item']}>
        <Image src={testsrc} alt="Placeholder" width={150} height={250} />
        <div className={styles['course-detail']}>
          <div className={styles['course-subtitle']}>{props.subject}</div>
          <div className={styles['course-title']}>{props.name}</div>
          <div className={styles['course-level']}>{props.level}</div>
          <div className={styles['course-subtitle']}>{props.desc}</div>
          <div className={styles['course-price']}>{props.price} ฿</div>
          <FullwidthBtn color="green">
            <FontAwesomeIcon icon={faPlay} /> ซิ้อคอร์สนี้
          </FullwidthBtn>
        </div>
      </div>
    </Link>
  );
};

export default CourseDetail;
