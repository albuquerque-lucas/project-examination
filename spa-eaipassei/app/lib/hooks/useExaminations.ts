'use client';

import { useState, useRef, useContext } from 'react';
import { ExaminationsContext } from '../context/ExaminationsContext';
import { NavigationContext } from '../context/NavigationContext';
import { useRouter } from 'next/navigation';
import { Examination } from '@/app/lib/types/examinationTypes';
import { createMany } from '@/app/lib/api/examinationsAPI';

export const useExaminations = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);
  const router = useRouter();
  const { setFlashMessage } = useContext(ExaminationsContext);
  const { setExaminationsLoaded } = useContext(NavigationContext);

  const addToList = () => {
    const title = titleRef.current?.value ?? '';
    const institution = institutionRef.current?.value ?? '';
    const educational_level_id = educationalLevelRef.current?.value ?? '';
    
    if (!title || !institution || !educational_level_id) {
      setFlashMessage('Os campos do formulário não podem estar vazios.');
      return;
    }
    
    const examination: Examination = {
      title,
      institution,
      educational_level_id
    }

    const doesItemExist = persistenceList.some(item => 
      item.title === title && 
      item.institution === institution && 
      item.educational_level_id === educational_level_id
    );
  
    if (doesItemExist) {
      setFlashMessage('Um item com os mesmos dados já existe na lista.');
      return;
    }
  
    setPersistenceList([...persistenceList, examination]);
    return null;
  }

  const submitExaminations = async () => {
    try {
      const response = await createMany(persistenceList);
      if (response.status === 409) {
        setFlashMessage(response.data.message);
        return;
      };

      if (response.status === 201) {
        setExaminationsLoaded(false);
        setFlashMessage('Concursos enviados com sucesso.');
        router.push('/admin/manage/examinations');
      };
      return response.data.message;
    } catch (error) {
      console.error('ERROR', error);
      return 'Ocorreu um erro ao enviar os exames.';
    }
  }

  return {
    titleRef,
    institutionRef,
    educationalLevelRef,
    persistenceList,
    setPersistenceList,
    addToList,
    submitExaminations
  }
}