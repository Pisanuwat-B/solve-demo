import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getCoursesByID } from '../../src/utils/db';

import styles from './UserCourse.module.css';

const UserCourse = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!courses.length) {
      const getAllCourse = async () => {
        for (var i in props.courses) {
          const course = await getCoursesByID(props.courses[i].name);
          course.id = props.courses[i].name;
          setCourses((prevState) => [...prevState, course]);
        }
      };
      getAllCourse();
    }
  }, [courses, props.courses]);

  return (
    <div className={styles['user-course-container']}>
      {courses.map((course, index) => (
        <Link key={index} href={"/practice/" + course.id}>
          <div className={styles['user-course']} key={index}>
            <div className={styles["couese-img"]}>
              <Image
                src={course.img}
                alt={course.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className={styles["course-name"]}>{course.name}</div>
            <div className={styles["course-sub"]}>{course.level}</div>
            <div className={styles["course-sub"]}>{course.subject}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserCourse;
