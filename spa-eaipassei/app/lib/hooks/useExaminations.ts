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

export const useExaminations = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const { setNoticesLoaded } = useCreateNotices();
  const router = useRouter();
  const { setFlashMessage, setExaminationsLoaded, flashMessage } = useContext(ExaminationsContext);

  const addExamination = ({ title, institution, educational_level_id, notice }: Examination) => {
    if (!title || !institution || !educational_level_id) {
      setFlashMessage({
        message: 'Preencha todos os campos.',
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

    const examination: Examination = {
      title,
      institution,
      educational_level_id,
      notice,
    }
    addExamination(examination);

    clearRefValue(titleRef, '');
    clearRefValue(institutionRef, '');
    clearRefValue(educationalLevelRef, '5');
    clearRefValue(fileRef, '');

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
      const response = await createNotice(`${process.env.NEXT_PUBLIC_API_CREATE_NOTICE}`, noticeFormRequest);
      console.log('Resposta da criação do edital', response);
    } catch (error: any) {
      console.log('Erro ao criar os editais', error);
    }
  }
  
  const submitExaminations = async () => {
    try {
      const response = await createExaminations(persistenceList);
      console.log('Resposta de createExaminations', response);
      if (response.status === 409) {
        console.log('Conflito na solicitacao', response);
        setFlashMessage(response.data.message);
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
    flashMessage,
    setPersistenceList,
    addToList,
    submitExaminations,
    setFlashMessage,
  }
}