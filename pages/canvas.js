import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'

import Head from 'next/head';
import NavBar from '../components/Layout/NavBar';
// import Header from '../../components/Layout/Header';
import { Button } from '@mui/material';

import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../src/lib/firebase';
import { addNewHelper, addStdentNoti } from '../src/utils/db';

const CanvasPage = () => {
  const vidRef = useRef(null);
  const btnRef = useRef(null);
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const [vdoSrc, setVdoSrc] = useState();
  const [recordFinish, setRecordFinish] = useState(false);

  const router = useRouter();
  var params

  if (router.isReady) {
    params = router.query
    console.log(params);
  }

  useEffect(() => {
    document.querySelector('body').classList.add('canvas-page');
  });

  let stream = null,
    audio = null,
    mixedStream = null,
    chunks = [],
    recorder = null;

  async function setupStream() {
    try {
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      });

      setupVideoFeedback();
    } catch (err) {
      console.error(err);
    }
  }

  function setupVideoFeedback() {
    if (stream && vidRef.current) {
      vidRef.current.srcObject = stream;
      vidRef.current.play();
    } else {
      console.warn('No stream available');
    }
  }

  async function startRecording() {
    await setupStream();

    if (stream && audio) {
      mixedStream = new MediaStream([
        ...stream.getTracks(),
        ...audio.getTracks(),
      ]);
      recorder = new MediaRecorder(mixedStream);
      recorder.ondataavailable = handleDataAvailable;
      recorder.onstop = handleStop;
      recorder.start(1000);

      // startButton.disabled = true;
      // stopButton.disabled = false;

      console.log('Recording started');
    } else {
      console.warn('No stream available.');
    }
  }

  function stopRecording() {
    recorder.stop();

    // startButton.disabled = false;
    // stopButton.disabled = true;
  }

  function handleDataAvailable(e) {
    chunks.push(e.data);
  }

  function handleStop() {
    const blob = new Blob(chunks, { type: 'video/mp4' });
    chunks = [];

    setVdoSrc(URL.createObjectURL(blob));
    if (vidRef.current) vidRef.current.srcObject = null;

    stream.getTracks().forEach((track) => track.stop());
    audio.getTracks().forEach((track) => track.stop());

    console.log('Recording stopped');
  }

  var square;
  var paper;
  var x;
  var y;

  if (canvasRef) {
    square = canvasRef.current;
    if (square) {
      paper = square.getContext('2d');
    } else {
      console.log('no square');
    }
  }

  var pressedMouse = false;
  var touched = false;
  var colorLine = '#f9cc9d';

  function startDrawing(eventvs01) {
    if (touched) {
      return;
    }
    console.log('start-drawing');
    pressedMouse = true;
    x = eventvs01.nativeEvent.offsetX;
    y = eventvs01.nativeEvent.offsetY;
  }

  function drawLine(eventvs02) {
    if (pressedMouse || windowDimension < 768) {
      var xM = eventvs02.nativeEvent.offsetX;
      var yM = eventvs02.nativeEvent.offsetY;
      drawing_line(colorLine, x, y, xM, yM, paper);
      x = xM;
      y = yM;
    }
  }

  function stopDrawing() {
    pressedMouse = false;
  }

  function clearCanvas() {
    paper.clearRect(0, 0, square.width, square.height);
  }

  // drawing_line('#f9cc9d', x, y, x, y, paper);

  function drawing_line(color, x_start, y_start, x_end, y_end, board) {
    // console.log(color, x_start, y_start, x_end, y_end, board)
    if (!board) {
      return;
    }
    board.beginPath();
    board.strokeStyle = color;
    board.lineWidth = 2;
    board.moveTo(x_start, y_start);
    board.lineTo(x_end, y_end);
    board.stroke();
    board.closePath();
  }

  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ongoingTouches = [];

  const handleTouchStart = (e) => {
    touched = true;
    const touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      ongoingTouches.push(copyTouch(touches[i]));
    }
  }

  function handoleTouchMove(e) {
    const touches = e.changedTouches;

    for (let i = 0; i < touches.length; i++) {
      const idx = ongoingTouchIndexById(touches[i].identifier);

      if (idx >= 0) {
        paper.beginPath();
        paper.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY - 100);
        paper.lineTo(touches[i].pageX, touches[i].pageY - 100);
        paper.lineWidth = 2;
        paper.strokeStyle = colorLine;
        paper.stroke();

        ongoingTouches.splice(idx, 1, copyTouch(touches[i])); // swap in the new touch record
      } else {
        console.log("can't figure out which touch to continue");
      }
    }
  }

  const handleTouchEnd = (e) => {
    const touches = e.changedTouches;
  
    for (let i = 0; i < touches.length; i++) {
      let idx = ongoingTouchIndexById(touches[i].identifier);
  
      if (idx >= 0) {
        paper.lineWidth = 2;
        paper.fillStyle = colorLine;
        paper.beginPath();
        paper.moveTo(ongoingTouches[idx].pageX, ongoingTouches[idx].pageY - 100);
        paper.lineTo(touches[i].pageX, touches[i].pageY - 100);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else {
        console.log('can\'t figure out which touch to end');
      }
    }
  }

  function copyTouch({ identifier, pageX, pageY }) {
    return { identifier, pageX, pageY };
  }

  function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
      const id = ongoingTouches[i].identifier;

      if (id === idToFind) {
        return i;
      }
    }
    return -1; // not found
  }

  const firestoreUpload = async (file) => {
    const extension = file.name.split('.').at(-1)
    const filename = params.question + '-h' + Date.now() + '.' + extension;
    console.log(filename);
    const helperStorageRef = ref(storage, `/helper/${filename}`);
    const uploadHelper = await uploadBytes(helperStorageRef, file);
    const helperURL = await getDownloadURL(uploadHelper.ref);
    const setsData = {
      helperId: filename,
      tokens: params.tokens,
      urls: [helperURL],
    }
    await addNewHelper(params.question, setsData);
    var combineTokens = ''
    params.tokens.forEach((word)=>{
      combineTokens += word
    })
    const studentNotiData = {
      question: combineTokens,
      helperUrl: helperURL,
    }
    addStdentNoti(params.student, studentNotiData)
  }

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0];
      await firestoreUpload(i)
      console.log('success')
    }
  };


  const handleChooseFile = (e) => {
    fileRef.current.click();
  };

  return (
    <>
      <Head>
        <title>SOLVE - Practicing makde easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <main>
        {(windowDimension > 768) ? (
          <div className='rec-area'>
            <div className="rec-head">Record your answer here</div>
            <div className="vidbox">
              {vdoSrc && (
                <video width="500px" controls ref={vidRef} src={vdoSrc}></video>
              )}
            </div>
            <div className="btnbox">
              <Button variant="outlined" onClick={startRecording}>
                Start Recording
              </Button>
              <Button variant="outlined" onClick={stopRecording}>
                Stop Recording
              </Button>
              {vdoSrc && (
                <a
                  className="uploadbtn"
                  href={vdoSrc}
                  ref={btnRef}
                  download="screen_record"
                >
                  Upload on-site record
                </a>
              )}
            </div>
          </div>
        ) : (
          <div className="rec-head">Draw your answer and upload here</div>
        )}
        <div
          className="canvas-area"
          onMouseDown={startDrawing}
          onMouseMove={drawLine}
          onMouseUp={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handoleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <canvas
            id="drawPlace"
            width={windowDimension - 10}
            height={windowDimension - 10}
            style={{ border: '1px solid #eee' }}
            ref={canvasRef}
          ></canvas>
          <Button variant="outlined" onClick={clearCanvas}>
            Clear Canvas
          </Button>
          <input type="file" id="chooseFile" name="filename" ref={fileRef} onChange={handleFileChange} style={{ display: 'none' }}/>
          <Button variant="outlined" onClick={handleChooseFile} style={{ marginLeft: '10px' }}>Upload</Button>
        </div>
      </main>
    </>
  );
};

export default CanvasPage;