import styles from './CourseList.module.css';
import CourseListItem from './CourseListItem';

const CourseList = (props) => {
  return (
    <div className={styles['course-section']}>
      <div className="course-list-name">{props.name}</div>
      <div className="course-list-list">
        {props.data?.map((courseData, index) => (
          <CourseListItem
            {...courseData}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
