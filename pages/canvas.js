import { useState, useRef, useEffect } from 'react';

import Head from 'next/head';
import NavBar from '../components/Layout/NavBar';
// import Header from '../../components/Layout/Header';
import { Button } from '@mui/material';

const CanvasPage = () => {
  const vidRef = useRef(null);
  const btnRef = useRef(null);
  const canvasRef = useRef(null);
  const [vdoSrc, setVdoSrc] = useState();
  const [recordFinish, setRecordFinish] = useState(false);

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
    if(vidRef.current) vidRef.current.srcObject = null;

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
    console.log(square)
    if (square) {
      paper = square.getContext('2d');
    } else {
      console.log('no square')
    }
  }

  var pressedMouse = false; 
  var colorLine ="#f9cc9d";

  function startDrawing(eventvs01){
    pressedMouse = true;
    console.log(eventvs01)
    // setX(eventvs01.offsetX)
    // setY(eventvs01.offsetY)
    x = eventvs01.nativeEvent.offsetX;
    y = eventvs01.nativeEvent.offsetY;
  }

  function drawLine(eventvs02) {
    if (pressedMouse) {
      // document.getElementById("drawPlace").style.cursor = "crosshair";
      var xM = eventvs02.nativeEvent.offsetX;
      var yM = eventvs02.nativeEvent.offsetY;
      drawing_line(colorLine, x, y, xM, yM, paper);
      x = xM;
      y = yM;
    }
  }

  function stopDrawing() {
    pressedMouse = false;
    // document.getElementById("drawPlace").style.cursor = "default";
  }

  function clearCanvas() {
    paper.clearRect(0, 0, square.width, square.height);
  }

  drawing_line("#f9cc9d", x, y, x, y, paper);

  function drawing_line(color, x_start, y_start, x_end, y_end, board){
    if (!board) {
      return
    }
    board.beginPath();
    board.strokeStyle = color;
    board.lineWidth = 2;
    board.moveTo(x_start,y_start);
    board.lineTo(x_end,y_end);
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
        <div className='rec-head'>Record your answer here</div>
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
            <a className='uploadbtn' href={vdoSrc} ref={btnRef} download="screen_record">
              Upload
            </a>
          )}
          
        </div>
        <div className='canvas-area' onMouseDown={startDrawing} onMouseMove={drawLine} onMouseUp={stopDrawing}>
          <canvas id="drawPlace" width={windowDimension} height={windowDimension} style={{border: '1px solid #eee'}} ref={canvasRef}></canvas>
          <Button variant="outlined" onClick={clearCanvas}>
            Clear Canvas
          </Button>
        </div>
      </main>
    </>
  );
};

export default CanvasPage;
