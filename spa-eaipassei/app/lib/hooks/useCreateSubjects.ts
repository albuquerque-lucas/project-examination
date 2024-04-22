'use client';

import { useContext, useRef } from "react";
import { SubjectsContext } from "../context/SubjectsContext";
import { createSubject } from "../api/subjectsAPI";
import { SubjectsFormRequest } from "../types/subjectTypes";

export const useCreateSubjects = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const studyAreaRef = useRef<HTMLSelectElement>(null);
  const { 
    subjectsLoaded,
    setSubjectsLoaded,
    creationMode,
    setCreationMode,
  } = useContext(SubjectsContext);

  const submitSubject = async () => {
    if (!titleRef.current || !educationalLevelRef.current || !studyAreaRef.current) {
      console.error('All fields are required');
      console.log('All fields are required');
      return;
    }
  
    const subject: SubjectsFormRequest = {
      title: titleRef.current.value,
      educational_level_id: parseInt(educationalLevelRef.current.value),
      study_area_id: parseInt(studyAreaRef.current.value),
    };

    try {
      const response = await createSubject(`${process.env.NEXT_PUBLIC_API_CREATE_SUBJECT}`, subject);
      console.log('Resposta da criação da disciplina', response);
      setSubjectsLoaded(false);
    } catch (error: any) {
      console.log('Erro ao criar a disciplina', error);
    }
  }

  return {
    titleRef,
    educationalLevelRef,
    studyAreaRef,
    subjectsLoaded,
    creationMode,
    setSubjectsLoaded,
    setCreationMode,
    submitSubject,
  }
}