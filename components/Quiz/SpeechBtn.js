import { useState } from 'react';

import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

import styles from './SpeechBtn.module.css';

//---------------------- COMPONENT ---------------------------

const SpeechBtn = () => {
  const [speechActive, setSpeechActive] = useState(false);
  const [speech, setSpeech] = useState('');

  const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continous = true;
  recognition.interimResults = true;
  recognition.lang = 'th-TH';

  const toggleListen = () => {
    if (!speechActive) {
      setSpeechActive(true);
      handleListen();
    } else {
      setSpeechActive(false);
      recognition.stop();
    }
  };

  const handleListen = () => {
    recognition.start();
    recognition.onend = () => {
      // console.log("...continue listening...")
      // recognition.start()
      setSpeechActive(false);
      segmentor();
      recognition.stop();
    };
    console.log('fire', speechActive);
    recognition.onresult = function (event) {
      var result = event.results[0][0].transcript;
      console.log(result);
      setSpeech(result);
    };
  };

  const segmentor = () => {
    let url =
      'https://api.aiforthai.in.th/lextoplus?text=' + speech + '&norm=1';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Apikey: 'XQfKkqjiMg39DCqr3UFSOdoCnAIEUrdr',
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  return (
    <div className={styles['quiz-speech']}>
      <div className={styles['speech-icon-container']}>
        <KeyboardVoiceIcon onClick={toggleListen} />
      </div>
      <div>{speech}</div>
    </div>
  );
};

export default SpeechBtn;



const arr1 = ['1', '5', '8']
const arr2 = ['2', '4', '6', '8', '10']

const grader = (arr1, arr2) => {
  let hit = 0;
  for (var i in arr1) {
    for (var j in arr2) {
      if (arr1[i] === arr2[j]) {
        hit += 1;
      }
    }
  }
  return hit;
}

grader(arr1, arr2)