import { useState } from 'react';
import Head from 'next/head';
import { Container, TextField, Grid, Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { addQuestion } from '../src/utils/db';
import { storage } from '../src/lib/firebase';

import styles from '../styles/Admin.module.css';

const AdminPage = () => {
  const initailState = {
    courseID: '',
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

  const [question, setQuestion] = useState(initailState);
  const [questionFile, setQuestionFile] = useState('');
  const [solutionFile, setSolutionFile] = useState('');

  // const handleClick = () => {
  //   console.log(question);
  //   addQuestion(question);
  // };

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

    const uploadQuestionTask = uploadBytesResumable(questionStorageRef, questionFile);
    const uploadSolutionTask = uploadBytesResumable(solutionStorageRef, questionFile);
    
    uploadQuestionTask.on(
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadQuestionTask.snapshot.ref).then((url) => {
          console.log(url)
          setQuestion({ ...question, questionImage: url })
          uploadSolutionTask.on(
            (err) => console.log(err),
            () => {
              getDownloadURL(uploadSolutionTask.snapshot.ref).then((url) => {
                console.log(url)
                setQuestion({ ...question, solution: url })
                addQuestion(question);
              });
            }
          );
        });
      }
    );
    
    
    // addQuestion(question);
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
          <Grid container spacing="5">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course ID"
                margin="normal"
                value={question.courseID}
                onChange={(e) =>
                  setQuestion({ ...question, courseID: e.target.value })
                }
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
            {/* <div>
              <Button variant="contained" onClick={handleClick} sx={{ mb: 2 }}>
                Add Question
              </Button>
            </div> */}
            <div>
              <Button variant="contained" onClick={handleUpload} sx={{ mb: 2 }}>
                Test Upload
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default AdminPage;
