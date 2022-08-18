import Image from 'next/image';
import Link from 'next/link';

import styles from './CourseListItem.module.css';

const CourseListItem = (props) => {
  const defaultImg = '/100.png';
  return (
    <Link href="/course">
      <div className={styles['course-item']}>
        <div className={styles['course-detail']}>
          <div className={styles['course-subtitle']}>{props.subject}</div>
          <div className={styles['course-title']}>{props.name}</div>
          <div className={styles['course-subtitle']}>{props.amount}</div>
          <div className={styles['course-subtitle']}>{props.exam}</div>
        </div>
        <Image
          src={props.image ? props.image : defaultImg}
          alt="Placeholder"
          width={100}
          height={80}
        />
      </div>
    </Link>
  );
};

export default CourseListItem;
