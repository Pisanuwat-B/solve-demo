import Link from 'next/link';
import styles from './NotiBadge.module.css';
import { useState } from 'react';
import Image from 'next/future/image';

const NotiBadge = (props) => {
  var modalContent;

  if (props.role === 'student') {
    const images = ["jpg", "gif", "png"]
    const srcURL = new URL(props.helperUrl)
    const extension = srcURL.pathname.split('.').at(-1)
    console.log(extension)
    if (images.includes(extension)) {
      modalContent = (
        <div>
          <Image src={props.helperUrl} alt="helper" layout="responsive" width={300} height={250} style={{ width: '100%', height: 'auto' }}/>
        </div>
      )
    } else {
      modalContent = (
        <div>
          <video width="100%" height="auto" controls>
            <source src={props.helperUrl} type="video/mp4" />
          </video>
        </div>
      )
    }
    

  }
  return (
    <>
      {(props.role === 'tutor') ? (
        <Link href={{ pathname: '/canvas', query: { tokens: props.tokens, student: props.studentId, question: props.questionId } }}>
        <a>
          <div className={styles['notibox']}>
            <div>
              <div>Student has question</div>
              <div>Question ID: {props.questionId}</div>
              <div>Student question: {props.question}</div>
            </div>
          </div>
        </a>
      </Link>
      ) : (
        <div className={styles['notibox']}>
          <div>
            <div>Tutor has answer</div>
            <div>Your question: {props.question}</div>
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
};

export default NotiBadge;
