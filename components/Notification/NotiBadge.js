// import Link from 'next/link';
import styles from './NotiBadge.module.css';

const NotiBadge = (props) => {
  return (
    // <Link href="/course">
      <div className={styles['notibox']} >
        <div>
          <div>Student has question</div>
          <div>Question ID: {props.questionId}</div>
          <div>Student question: {props.question}</div>
        </div>
      </div>
    {/* </Link> */}
  );
};

export default NotiBadge;
