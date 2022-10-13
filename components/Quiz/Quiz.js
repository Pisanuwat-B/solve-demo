// import Image from 'next/image';
import Image from 'next/future/image';
import { useState, useEffect } from 'react';

import FullwidthBtn from '../UI/FullwidthBtn';
import SpeechBtn from './SpeechBtn';

// import placeholderImg from '../../public/placeholder.png';
import styles from './Quiz.module.css';

const Quiz = (props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showSpeech, setShowSpeech] = useState(false);
  const [loader, setLoader] = useState(true);
  const [radio, setRadio] = useState('');

  const handlePrevious = () => {
    setShowHelp(false);
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleCheck = (e) => {
    console.log(e.target.id, e)
  }

  const handleNext = () => {
    setShowHelp(false);
    setRadio(false);
    const nextQues = currentQuestion + 1;
    nextQues < props.data.length && setCurrentQuestion(nextQues);
  };

  const handleHelp = () => {
    setShowHelp(true);
  };

  useEffect(() => {
    if (props.data) {
      console.log(props.data)
      setLoader(false);
      // console.log(props.data);
      // console.log(props.data[0]);
    }
  }, [props.data]);

  return (
    <>
      {!loader ? (
        <div className={styles['quiz-container']}>
          <div className={styles['quiz-question-container']}>
            <div className={styles['quiz-title']}>การแยกตัวประกอบ</div>
            <div className={styles['quiz-progress']}>
              คำถามข้อที่ {currentQuestion + 1} จาก {props.data.length}
            </div>
            <div className={styles['quiz-question']}>
              {props.data[currentQuestion].question}
            </div>
            <Image
              src={props.data[currentQuestion].questionImage}
              alt="Placeholder"
              layout="responsive"
              width={500}
              height={300}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles['quiz-answer-container']}>
            <div className="quiz-answer-box">
              <div className={styles['quiz-answer-description']}>
                {props.data[currentQuestion].question}
              </div>
              <div className="quiz-answer-radiobox">
                {Object.keys(props.data[currentQuestion].answer)
                  .sort()
                  .map((answer, index) => (
                    <div key={index} className={styles['quiz-choice']}>
                      <input
                        id={index}
                        type="radio"
                        name={props.data[currentQuestion].number}
                        className="quiz-answer-radio"
                        checked={radio === index}
                        onChange={handleCheck}
                        onClick={() => {
                          setRadio(index);
                        }}
                      />
                      <label
                        htmlFor={index}
                        className={styles['quiz-choice-text']}
                      >
                        {props.data[currentQuestion].answer[answer]}
                      </label>
                    </div>
                  ))}
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
                <div className='quiz-solution'>
                <Image
                  src={props.data[currentQuestion].solution}
                  alt="Solution"
                  layout="responsive"
                  width={500}
                  height={2000}
                  style={{ width: '100%', height: 'auto' }}
                />
                </div>
              </div>
            )}
            <SpeechBtn questionId={props.data[currentQuestion].questionId}/>
          </div>
        </div>
      ) : (
        <div>Quiz Loading...</div>
      )}
    </>
  );
};

export default Quiz;
