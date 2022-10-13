import CurrentProgress from "./CurrentProgress";
import FullwidthBtn from "../UI/FullwidthBtn";

import styles from './Progress.module.css';

const Progress = (props) => {
  return (
    <div className={styles.progress}>
      <CurrentProgress />
      <FullwidthBtn color="red" size="big">ผลวิเคราะห์ของฉัน &gt;</FullwidthBtn>
    </div>
  );
};

export default Progress;