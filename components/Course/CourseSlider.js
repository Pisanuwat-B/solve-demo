import CourseSlideItem from './CourseSlideItem';
import Slider from 'react-slick';

import styles from './CourseSlider.module.css';

const CourseSlider = (props) => {
  const defaultImg = '/100.png';
  const settings = {
    dots: false,
    slidesToScroll: 1,
    variableWidth: true,
    infinite: false,
  };

  return (
    <div className={styles['course-section']}>
      <div className={styles['course-name']}>{props.name}</div>
      <Slider {...settings}>
        {props.data?.map((courseData, index) => (
          <CourseSlideItem
            id={courseData.id}
            name={courseData.name}
            image={courseData.image ? courseData.image : defaultImg}
            key={index}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CourseSlider;
