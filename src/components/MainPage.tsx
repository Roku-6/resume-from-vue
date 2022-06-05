import React from 'react';
import { useState, useEffect } from 'react';
import ResumeCard from './ResumeCard';
import axios from "axios";
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "react-native-get-random-values";
import { v4 as uuid } from 'uuid';

type Resume = {
    resume_id: string;
    title: string;
    updated_at: string;
    job_summary: string;
    skills: string;
    about_myself: string;
}

function MainPage() {

  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    axios.get<Resume[]>("https://vast-harbor-14767.herokuapp.com/api/resumes").then((res) => {
      setResumes(res.data)
    })
  }, [])

  const resumeModel = {
    resume_id: uuid(),
    title: "新規職務経歴書25",
    update_date: "",
    contents: {
      user_name: "",
      user_kana: "",
      birth_date: "",
      gender: "",
      nearest: "",
      line: "",
      job_summary: "this is React. this is ReactProject.",
      experiences: [
        {
          id: uuid(),
          startDate: "",
          endDate: "",
          occupation: "",
          jobDescription: "",
          tools: "",
        },
      ],
      skills: "React test",
      qualifications: [
        {
          id: uuid(),
          acquisition_date: "",
          qualification_name: "",
        },
      ],
      about_myself: "React introduction",
    }
  }

  const createResume = () => {
    axios.post<Resume[]>("https://vast-harbor-14767.herokuapp.com/api/resume", resumeModel).then((res) => {
      console.log(res.data)
    })
  }

  return (
    <>
      <Grid container spacing={2}>
        {resumes.map(resume => (
          <ResumeCard
            key = {resume.resume_id}
            resume_id = {resume.resume_id}
            title = {resume.title}
            updated_at = {resume.updated_at}
            job_summary = {resume.job_summary}
            skills = {resume.skills}
            about_myself = {resume.about_myself}
          />
        ))}
      </Grid>
      <Fab color="primary" aria-label="add"  style={{ position: "absolute", right: "5%", bottom: "10%"}}>
        <AddIcon onClick={createResume}/>
      </Fab>
    </>
  );
}

export default MainPage;
