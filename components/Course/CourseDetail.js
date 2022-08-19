import Image from 'next/image';
import Link from 'next/link';
import FullwidthBtn from '../UI/FullwidthBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './CourseDetail.module.css';

const CourseDetail = (props) => {
  const testsrc = '/placeholder.png';

  const buyPressed = () => {
    props.onClick()
  }

  return (
    <div className={styles['course-item']}>
      <Image src={testsrc} alt="Placeholder" width={150} height={250} />
      <div className={styles['course-detail']}>
        <div className={styles['course-subtitle']}>{props.subject}</div>
        <div className={styles['course-title']}>{props.name}</div>
        <div className={styles['course-level']}>{props.level}</div>
        <div className={styles['course-subtitle']}>{props.desc}</div>
        <div className={styles['course-price']}>{props.price} ฿</div>
        {props.own ? (
          <Link href="/practice">
            <FullwidthBtn color="red">
              <FontAwesomeIcon icon={faPlay} /> เริ่มเรียน
            </FullwidthBtn>
          </Link>
        ) : (
          <FullwidthBtn color="green" onClick={buyPressed}>
            <FontAwesomeIcon icon={faPlay} /> ซิ้อคอร์สนี้
          </FullwidthBtn>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
