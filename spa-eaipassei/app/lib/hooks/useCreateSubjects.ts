'use client';

import { useContext, useRef } from "react";
import { SubjectsContext } from "../context/SubjectsContext";
import { createSubject } from "../api/subjectsAPI";
import { SubjectsFormRequest } from "../types/subjectTypes";

export const useCreateSubjects = () => {
  const { 
    subjectsLoaded,
    setSubjectsLoaded,
    creationMode,
    setCreationMode,
    subjectsMessage,
    setSubjectsMessage,
  } = useContext(SubjectsContext);

  const titleRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const studyAreaRef = useRef<HTMLSelectElement>(null);

  const submitSubject = async () => {
    if (!titleRef.current || !educationalLevelRef.current || !studyAreaRef.current) {
      setSubjectsMessage({
        message: "É necessário preencher todos os campos.",
        type: "dark",
      });
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
      setSubjectsMessage({
        message: error.message,
        type: 'dark',
      });
    }
  }

  return {
    titleRef,
    educationalLevelRef,
    studyAreaRef,
    subjectsLoaded,
    creationMode,
    subjectsMessage,
    setSubjectsLoaded,
    setCreationMode,
    submitSubject,
    setSubjectsMessage,
  }
}