import { useState, useEffect } from 'react';
import Image from 'next/image';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import { useAuth } from '../../src/lib/auth-service';
import { getHelperByID, addNoti } from '../../src/utils/db';

import styles from './SpeechBtn.module.css';

//---------------------- COMPONENT ---------------------------

const SpeechBtn = (props) => {
  const { user } = useAuth();

  const [speechActive, setSpeechActive] = useState(false);
  const [speech, setSpeech] = useState('');
  const [helperData, setHelperData] = useState('');
  const [helperUrl, setHelperUrl] = useState('');
  const [isHelperImg, setIsHelperImg] = useState(false);
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
        getHelper(result);
      });
  };

  const getHelper = (result) => {
    var highestIndex = 0;
    var hitPercentage = 0;
    for (var i in helperData.sets) {
      let newHit = comparer(result.tokens, helperData.sets[i].tokens);
      if (newHit > hitPercentage) {
        highestIndex = i
        hitPercentage = newHit
      }
    }

    console.log('highest index: ', highestIndex, 'hit percentage: ', hitPercentage)
    console.log(helperData.sets[i].helperId)

    if (hitPercentage) {
      if (helperData.sets[i].imgUrl) {
        setIsHelperImg(true);
      }
      handleOpenModal();
      return setHelperUrl(helperData.sets[highestIndex].url);
    } else {
      console.log('no match');
      console.log('Question: ', props.questionId,'User: ', user.uid, result.normalized);

      let data = {
        questionId: props.questionId,
        studentId: user.uid,
        question: result.normalized,
      };
      addNoti(data);
    }

    // handleOpenModal();
    // return setHelperUrl('https://firebasestorage.googleapis.com/v0/b/solve-f1778.appspot.com/o/helper%2Fhelper0.png?alt=media&token=23354274-68d0-4549-8061-b603ce8b0f28');
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
    console.log(hit)
    let hitPercentage = hit / arr2.length;
    console.log('Hit Percentage: ', hitPercentage);
    if (hitPercentage > 0.5) {
      return hitPercentage;
    } else {
      return 0;
    }
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
          {isHelperImg ? (
            <Image src={helperUrl} alt="helper" width={300} height={200} />
          ) : (
            <video width="100%" height="auto" controls>
              <source src={helperUrl} type="video/mp4" />
            </video>
          )}
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
