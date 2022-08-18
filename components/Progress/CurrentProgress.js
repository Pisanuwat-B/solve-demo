import styles from './CurrentProgress.module.css';
import FullwidthBtn from "../UI/FullwidthBtn";

const CurrentProgress = (props) => {
  return (
    <div className={styles['current-progress']}>
      <div className={styles.wrapper}>
        <div>แยกพหุนามดีกรีสอง</div>
        <div>progressbar</div>
        <FullwidthBtn color="green">เรียนต่อ</FullwidthBtn>
      </div>
      <div className={styles['progress-content']}>โจทย์และเนื้อหาทั้งหมด</div>
    </div>
  );
};

export default CurrentProgress;
