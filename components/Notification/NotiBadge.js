// import Link from 'next/link';
import styles from './NotiBadge.module.css';

const NotiBadge = (props) => {
  return (
    <div className={styles['notibox']} >
      <div>
        <div>Student has question</div>
        <div>{props.questionId}</div>
        <div>{props.question}</div>
      </div>
    </div>
  );
};

export default NotiBadge;
