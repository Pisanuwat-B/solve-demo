import Image from 'next/image';
import { useState } from 'react';

import FullwidthBtn from '../UI/FullwidthBtn';

import placeholderImg from '../../public/placeholder.png';
import styles from './Quiz.module.css';

const dummyQuestion = [
  {
    id: 'demo001',
    question: 'จงแยกตัวประกอบของ xxxxxxx',
    answerOptions: [
      { answer: 'แยกตัวประกอบ choice 1' },
      { answer: 'แยกตัวประกอบ choice 2' },
      { answer: 'แยกตัวประกอบ choice 3', isCorrect: true },
      { answer: 'All of the above' },
    ],
    help: 'นี่คือวิธีแยกตัวประกอบ',
  },
  {
    id: 'demo002',
    question: 'จงแยกพหุนามของ xxxxxxx',
    answerOptions: [
      { answer: 'แยกพหุนาม choice 1' },
      { answer: 'แยกพหุนาม choice 2' },
      { answer: 'แยกพหุนาม choice 3', isCorrect: true },
      { answer: 'All of the above' },
    ],
    help: 'นี่คือวิธีแยกพหุนาม',
  },
  {
    id: 'demo003',
    question: 'จงแยกเงาพันร่าง xxxxxxx',
    answerOptions: [
      { answer: 'แยกเงาพันร่าง choice 1' },
      { answer: 'แยกเงาพันร่าง choice 2' },
      { answer: 'แยกเงาพันร่าง choice 3', isCorrect: true },
      { answer: 'All of the above' },
    ],
    help: 'นี่คือวิธีแยกเงาพันร่าง',
  },
];

const Quiz = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  const handlePrevious = () => {
    setShowHelp(false);
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    setShowHelp(false);
    const nextQues = currentQuestion + 1;
    nextQues < dummyQuestion.length && setCurrentQuestion(nextQues);
  };

  const handleHelp = () => {
    setShowHelp(true);
  };

  return (
    <div className={styles['quiz-container']}>
      <div className={styles['quiz-question-container']}>
        <div className={styles['quiz-title']}>การแยกตัวประกอบ</div>
        <div className={styles['quiz-progress']}>
          คำถามข้อที่ {currentQuestion + 1} จาก {dummyQuestion.length}
        </div>
        <div className={styles['quiz-question']}>
          {dummyQuestion[currentQuestion].question}
        </div>
        <Image src={placeholderImg} alt="Placeholder" />
      </div>
      <div className={styles['quiz-answer-container']}>
        <div className="quiz-answer-box">
          <div className={styles['quiz-answer-description']}>
            {dummyQuestion[currentQuestion].question}
          </div>
          <div className="quiz-answer-radiobox">
            {dummyQuestion[currentQuestion].answerOptions.map(
              (answer, index) => (
                <div key={index} className={styles['quiz-choice']}>
                  <input
                    id={index}
                    type="radio"
                    name={dummyQuestion[currentQuestion].id}
                    className="quiz-answer-radio"
                  />
                  <label htmlFor={index} className={styles['quiz-choice-text']}>
                    {answer.answer}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="quiz-nav-container">
            <FullwidthBtn color="black" size="small" onClick={handleNext}>
              ส่งคำตอบ
            </FullwidthBtn>
            <FullwidthBtn color="red" size="small" onClick={handleHelp}>
              ขอดูเฉลย
            </FullwidthBtn>
          </div>
        </div>
        {showHelp && (
          <div className="quiz-help-box">
            {dummyQuestion[currentQuestion].help}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
