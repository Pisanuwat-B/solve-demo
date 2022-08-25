import { useState, useEffect } from 'react';
import Image from 'next/image';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { getHelperByID } from '../../src/utils/db';

import styles from './SpeechBtn.module.css';

//---------------------- COMPONENT ---------------------------

const SpeechBtn = (props) => {
  const [speechActive, setSpeechActive] = useState(false);
  const [speech, setSpeech] = useState('');
  const [helperData, setHelperData] = useState('');
  const [helperUrl, setHelperUrl] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (props.questionId) {
      const fetchData = async () => {
        setHelperData(await getHelperByID(props.questionId));
      };
      fetchData();
    }
  }, [props.questionId]);

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
    let transcript = '';
    recognition.start();
    recognition.onend = () => {
      setSpeechActive(false);
      segmentor(transcript);
      recognition.stop();
    };
    recognition.onresult = function (event) {
      var result = event.results[0][0].transcript;
      transcript = result;
      console.log(result);
      setSpeech(result);
    };
  };

  const segmentor = (transcript) => {
    let url =
      'https://api.aiforthai.in.th/lextoplus?text=' + transcript + '&norm=1';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Apikey: 'XQfKkqjiMg39DCqr3UFSOdoCnAIEUrdr',
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        getHelper(result.tokens);
      });
  };

  const getHelper = (resultTokenArray) => {
    for (var i in helperData.sets) {
      let match = comparer(resultTokenArray, helperData.sets[i].token);
      if (match) {
        handleOpenModal();
        return setHelperUrl(helperData.sets[i].url);
      }
    }
    console.log('no match');
    return setHelperUrl('https://firebasestorage.googleapis.com/v0/b/solve-f1778.appspot.com/o/helper%2Fhelper0.png?alt=media&token=23354274-68d0-4549-8061-b603ce8b0f28');
  };

  const comparer = (arr1, arr2) => {
    console.log(arr1, arr2);
    let hit = 0;
    for (var i in arr1) {
      for (var j in arr2) {
        if (arr1[i] === arr2[j]) {
          hit += 1;
        }
      }
    }
    return hit;
  };

  return (
    <div className={styles['quiz-speech']}>
      <div>
        <div className={styles['speech-icon-container']}>
          <KeyboardVoiceIcon onClick={toggleListen} />
        </div>
        <div>{speech}</div>
      </div>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={boxStyle}>
          <Image src={helperUrl} alt="helper" width={300} height={200} />
        </Box>
      </Modal>
    </div>
  );
};

export default SpeechBtn;

const boxStyle = {
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};