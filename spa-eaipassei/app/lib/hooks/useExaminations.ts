'use client';

import { useState, useRef, useContext } from 'react';
import { ExaminationsContext } from '../context/ExaminationsContext';
import { useRouter } from 'next/navigation';
import { Examination } from '@/app/lib/types/examinationTypes';
import { createMany } from '@/app/lib/api/examinationsAPI';
import { createNotice } from '../api/noticesAPI';
import { mimeToExtension } from '@/app/lib/utils/mapperFunctions';
import { NoticeFormRequest } from '../types/noticeTypes';

export const useExaminations = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const router = useRouter();
  const { setFlashMessage, setExaminationsLoaded } = useContext(ExaminationsContext);

  const addToList = () => {
    const title = titleRef.current?.value ?? '';
    const institution = institutionRef.current?.value ?? '';
    const educational_level_id = educationalLevelRef.current?.value ?? '';
    const notice = fileRef.current?.files?.length && fileRef.current.files[0] instanceof File
    ? fileRef.current.files[0]
    : null;
  
    
    if (!title || !institution || !educational_level_id) {
      setFlashMessage('Os campos do formulário não podem estar vazios.');
      return;
    }
    
    const examination: Examination = {
      title,
      institution,
      educational_level_id,
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
  
    setFileList([...fileList, notice as File]);
    setPersistenceList([...persistenceList, examination]);
    return null;
  }

  const submitExaminations = async () => {
    try {
      const response = await createMany(persistenceList);
      console.log('ARRAY DE IDS', response.data.ids);
      if (response.status === 409) {
        setFlashMessage(response.data.message);
        return;
      };
      
      if (response.status === 201) {
        console.log('FILE LIST', fileList);
        setExaminationsLoaded(false);
        setFlashMessage('Concursos enviados com sucesso.');
        router.push('/admin/manage/examinations');


        }
      } catch (error) {
      console.error('ERROR', error);
      return 'Ocorreu um erro ao enviar os concursos.';
    }

  }
  return {
    fileRef,
    titleRef,
    institutionRef,
    educationalLevelRef,
    persistenceList,
    setPersistenceList,
    addToList,
    submitExaminations
  }
}