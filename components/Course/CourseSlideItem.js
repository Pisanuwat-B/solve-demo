import Image from 'next/image';
import Link from 'next/link';

import styles from './CourseSlideItem.module.css';

const CourseSlideItem = (props) => {
  const testsrc = '/100.png';

  return (
    <Link href={"/course/" + props.id}>
      <div className={styles['course-item']}>
        <Image src={props.image} alt="Placeholder" width={120} height={120} />
        <div className={styles['course-name']}>{props.name}</div>
      </div>
    </Link>
  );
};

export default CourseSlideItem;
