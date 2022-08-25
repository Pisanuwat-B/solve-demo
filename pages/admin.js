import * as React from 'react';
import { useState } from 'react';
import Head from 'next/head';
import { Container, TextField, Grid, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import Snackbar from '@mui/material/Snackbar';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

import { addQuestion } from '../src/utils/db';
import { storage } from '../src/lib/firebase';

import styles from '../styles/Admin.module.css';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AdminPage = () => {
  const initailState = {
    number: '',
    correct: '',
    question: '',
    questionImage: '',
    answer: {
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
    },
    solution: '',
  };
  const [courseID, setCourseID] = useState('');
  const [question, setQuestion] = useState(initailState);
  const [questionFile, setQuestionFile] = useState('');
  const [solutionFile, setSolutionFile] = useState('');
  const [openSnack, setOpenSnack] = useState(false);

  const handleQuestionFileChange = (e) => {
    console.log('file change');
    if (e.target.files && e.target.files[0]) {
      const uploadFile = e.target.files[0];
      setQuestionFile(uploadFile);
    }
  };

  const handleSolutionFileChange = (e) => {
    console.log('file change');
    if (e.target.files && e.target.files[0]) {
      const uploadFile = e.target.files[0];
      setSolutionFile(uploadFile);
    }
  };

  const handleUpload = async () => {
    const questionStorageRef = ref(storage, `/question/${questionFile.name}`);
    const solutionStorageRef = ref(storage, `/solution/${solutionFile.name}`);
    const uploadQuestion = await uploadBytes(questionStorageRef, questionFile);
    const uploadSolution = await uploadBytes(solutionStorageRef, solutionFile);
    const questionURL = await getDownloadURL(uploadQuestion.ref);
    const solutionURL = await getDownloadURL(uploadSolution.ref);
    setQuestion({ ...question, questionImage: questionURL });
    setQuestion({ ...question, solution: solutionURL });
    addQuestion(courseID, question);
    clearForm();
    setOpenSnack(true)
  };

  const clearForm = () => {
    setCourseID('');
    setQuestion(initailState);
    setQuestionFile('');
    setSolutionFile('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  return (
    <>
      <Head>
        <title>SOLVE - Practicing makde easy</title>
        <meta
          name="description"
          content="SOLVE support your practicing journey"
        />
        <link rel="icon" href="/bacon.svg" />
      </Head>
      <main>
        <Container>
          <Snackbar open={openSnack} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
            <Alert
              severity="success"
              sx={{ width: '100%' }}
            >
              Add Question Successful
            </Alert>
          </Snackbar>
          <Grid container spacing="5">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course ID"
                margin="normal"
                value={courseID}
                onChange={(e) => setCourseID(e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                xs="1"
                label="No"
                value={question.number}
                onChange={(e) =>
                  setQuestion({ ...question, number: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={10} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                xs="10"
                label="Question"
                value={question.question}
                onChange={(e) =>
                  setQuestion({ ...question, question: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <div>Question Image:</div>
              <label htmlFor="question" className={styles['solution-label']}>
                <span>Upload Question File</span>
                <FileUploadIcon />
                <input
                  type="file"
                  name="question"
                  id="question"
                  onChange={handleQuestionFileChange}
                />
                <span>{questionFile.name}</span>
              </label>
            </Grid>
            <div>Answer:</div>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Choice 1"
                sx={{ mb: 1 }}
                value={question.answer.choice1}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answer: { ...question.answer, choice1: e.target.value },
                  })
                }
              />
              <TextField
                fullWidth
                label="Choice 2"
                sx={{ mb: 1 }}
                value={question.answer.choice2}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answer: { ...question.answer, choice2: e.target.value },
                  })
                }
              />
              <TextField
                fullWidth
                label="Choice 3"
                sx={{ mb: 1 }}
                value={question.answer.choice3}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answer: { ...question.answer, choice3: e.target.value },
                  })
                }
              />
              <TextField
                fullWidth
                label="Choice 4"
                sx={{ mb: 1 }}
                value={question.answer.choice4}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    answer: { ...question.answer, choice4: e.target.value },
                  })
                }
              />
              <TextField
                fullWidth
                label="Correct Answer"
                sx={{ mb: 1 }}
                value={question.correct}
                onChange={(e) =>
                  setQuestion({
                    ...question,
                    correct: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <div>Solution:</div>
              <label htmlFor="solution" className={styles['solution-label']}>
                <span>Upload Solution File</span>
                <FileUploadIcon />
                <input
                  type="file"
                  name="solution"
                  id="solution"
                  onChange={handleSolutionFileChange}
                />
                <span>{solutionFile.name}</span>
              </label>
            </Grid>
          </Grid>
          <div>
            <div>
              <Button variant="contained" onClick={handleUpload} sx={{ mb: 2 }}>
                Add Question
              </Button>
            </div>
          </div>
          {/* <div>
            <div>
              <Button variant="contained" onClick={()=>{setOpenSnack(true)}} sx={{ mb: 2 }}>
                Open Snackbar
              </Button>
            </div>
          </div> */}
        </Container>
      </main>
    </>
  );
};

export default AdminPage;
