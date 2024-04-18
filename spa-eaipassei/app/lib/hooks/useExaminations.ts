'use client';

import { useState, useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ExaminationsContext } from '../context/ExaminationsContext';
import { Examination } from '@/app/lib/types/examinationTypes';
import { createMany } from '@/app/lib/api/examinationsAPI';
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
      if (response.status === 409) {
        setFlashMessage(response.data.message);
        return;
      };
      
      if (response.status === 201) {
        console.log('ARRAY DE IDS', response.data.ids);
        response.data.ids.forEach(async (id: number, index: number) => {
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
        });
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