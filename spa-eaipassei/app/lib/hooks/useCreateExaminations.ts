'use client';

import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateNotices } from './useCreateNotices';
import { ExaminationsContext } from '../context/ExaminationsContext';
import { Examination } from '@/app/lib/types/examinationTypes';
import { createExaminations } from '@/app/lib/api/examinationsAPI';
import { NoticeFormRequest } from '../types/noticeTypes';
import { mimeToExtension } from '../utils/mapperFunctions';
import { createNotice } from '../api/noticesAPI';

export const useCreateExaminations = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const { setNoticesLoaded } = useCreateNotices();
  const router = useRouter();
  const { setFlashMessage, setExaminationsLoaded, flashMessage } = useContext(ExaminationsContext);
  
  const clearValues = () => {
    clearRefValue(titleRef, '');
    clearRefValue(institutionRef, '');
    clearRefValue(educationalLevelRef, '5');
    clearRefValue(fileRef, '');
  }

  const addExamination = ({ title, institution, educational_level_id, notice }: Examination) => {
    if (!title || !institution || !educational_level_id) {
      setFlashMessage({
        message: 'Todos os campos devem ser preenchidos.',
        type: 'error',
      });
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
      setFlashMessage({
        message: 'Um item com os mesmos dados já existe na lista.',
        type: 'error',
      
      });
      return;
    }
  
    if (notice !== null) {
      setFileList([...fileList, notice as File]);
    }
    setPersistenceList([...persistenceList, examination]);
  }

  const clearRefValue = (ref: React.RefObject<HTMLInputElement | HTMLSelectElement>, value: string) => {
    if (ref.current) {
      ref.current.value = value;
    }
  };

  const addToList = () => {
    const title = titleRef.current?.value ?? '';
    const institution = institutionRef.current?.value ?? '';
    const educational_level_id = educationalLevelRef.current?.value ?? '';
    const notice = fileRef.current?.files?.length && fileRef.current.files[0] instanceof File
    ? fileRef.current.files[0]
    : null;
    
    if (notice !== null && notice?.type !== 'application/pdf') {
      setFlashMessage({
        message: 'O arquivo deve estar no formato PDF.',
        type: 'error',
      });
      clearRefValue(fileRef, '');
      return;
    }

    const examination: Examination = {
      title,
      institution,
      educational_level_id,
      notice,
    }
    addExamination(examination);

    clearValues();

  }

  const createNoticeForExamination = async (id: number, index: number) => {
    if (!fileList[index]) return;
    const noticeFile = fileList[index];
    const noticeFormRequest: NoticeFormRequest = {
      examination_id: id,
      notice_file: noticeFile,
      file_name: noticeFile.name,
      extension: mimeToExtension[noticeFile.type] || '',
    };
    const formData = new FormData();
    Object.entries(noticeFormRequest).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });
    try {
      await createNotice(`${process.env.NEXT_PUBLIC_API_CREATE_NOTICE}`, noticeFormRequest);
    } catch (error: any) {
      console.error('Erro ao criar o edital', error);
      setFlashMessage({
        message: 'Ocorreu um erro ao enviar os editais.',
        type: 'error',
      });
    }
  }
  
  const submitExaminations = async () => {
    try {
      const response = await createExaminations(persistenceList);
      console.log('Resposta de createExaminations', response);
      if (response.status === 409) {
        console.log('Conflito na solicitacao', response);
        setFlashMessage({
          message: response.data.message,
          type: 'error',
        });
        return;
      };
      
      if (response.status === 201) {
        const createNoticesPromises = response.data.ids.map(createNoticeForExamination);
        await Promise.all(createNoticesPromises);
        setExaminationsLoaded(false);
        setNoticesLoaded(false);
        setFlashMessage({
          message: response.data.message,
          type: 'success',
        });
        setPersistenceList([]);
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
    flashMessage,
    setPersistenceList,
    addToList,
    submitExaminations,
    setFlashMessage,
  }
}