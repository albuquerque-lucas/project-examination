'use client';

import { useContext, useRef } from "react";
import { StudyAreasContext } from "../context/StudyAreasContext";
import { createStudyArea } from "@/app/lib/api/StudyAreasAPI";
import { StudyAreasFormRequest } from "../types/studyAreasTypes";

export const useCreateStudyAreas = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const { 
    studyAreasLoaded,
    setStudyAreasLoaded,
    creationMode,
    setCreationMode,
  } = useContext(StudyAreasContext);

  const submitStudyArea = async () => {
    if (!titleRef.current) {
      console.error('All fields are required');
      console.log('All fields are required');
      return;
    }
  
    const studyArea: StudyAreasFormRequest = {
      area: titleRef.current.value,
    };

    try {
      const response = await createStudyArea(`${process.env.NEXT_PUBLIC_API_CREATE_STUDY_AREA}`, studyArea);
      console.log('Resposta da criação da área de estudo', response);
      setStudyAreasLoaded(false);
    } catch (error: any) {
      console.log('Erro ao criar a área de estudo', error);
    }
  }

  return {
    titleRef,
    studyAreasLoaded,
    creationMode,
    setStudyAreasLoaded,
    setCreationMode,
    submitStudyArea,
  }
}