'use client';

import { useContext, useRef } from "react";
import { SubjectsContext } from "../context/SubjectsContext";
import { createSubject } from "../api/subjectsAPI";
import { SubjectsFormRequest } from "../types/subjectTypes";

export const useCreateSubjects = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { 
    subjectsLoaded,
    setSubjectsLoaded,
    creationMode,
    setCreationMode,
  } = useContext(SubjectsContext);

  const submitSubject = async () => {
    const subject: SubjectsFormRequest = {
      title: titleRef.current?.value || '',
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
    subjectsLoaded,
    creationMode,
    setSubjectsLoaded,
    setCreationMode,
    submitSubject,
  }
}