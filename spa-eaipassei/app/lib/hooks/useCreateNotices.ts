'use client';

import { useState, useRef, useContext } from 'react';
import { NoticesContext } from '../context/NoticesContext';
import { Notice, NoticeFormRequest } from '../types/noticeTypes';
import { createNotice } from '../api/noticesAPI';
import { mimeToExtension } from '@/app/lib/utils/mapperFunctions';

export const useCreateNotices = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const idExaminationRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FormData[]>([]);
  const { setNoticesLoaded, creationMode, setCreationMode } = useContext(NoticesContext);

  const addToSubmitList = () => {
    const noticeFile = fileRef.current?.files?.length && fileRef.current.files[0] instanceof File
      ? fileRef.current.files[0]
      : null;

    if (!noticeFile) {
      console.log('Nenhum arquivo foi selecionado');
      return;
    }

    const noticeFormRequest: NoticeFormRequest = {
      examination_id: Number(idExaminationRef.current?.value),
      notice_file: noticeFile,
      file_name: noticeFile.name,
      extension: noticeFile.name.split('.').pop() || '',
    };

    const formData = new FormData();
    Object.entries(noticeFormRequest).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    });

    setFileList([...fileList, formData]);
  }

  const submitNotices = async () => {
    try {
      const noticeFile = fileRef.current?.files?.length && fileRef.current.files[0] instanceof File
        ? fileRef.current.files[0]
        : null;

      if (!noticeFile) {
        console.log('Nenhum arquivo foi selecionado');
        return;
      }

      const noticeFormRequest: NoticeFormRequest = {
        examination_id: 46,
        notice_file: noticeFile,
        file_name: noticeFile.name,
        extension: noticeFile.name.split('.').pop() || '',
      };

      const formData = new FormData();
      Object.entries(noticeFormRequest).forEach(([key, value]) => {
        if (value instanceof Blob) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });

      const response = await createNotice(`${process.env.NEXT_PUBLIC_API_CREATE_NOTICE}`, formData);
      console.log('Resposta da criação do edital', response);
      setNoticesLoaded(false);
    } catch (error: any) {
      console.log('Erro ao criar os editais', error);
    }
  }

  return {
    addToSubmitList,
    submitNotices,
    fileRef,
    idExaminationRef,
    creationMode,
    setCreationMode,
    fileList,
  }
}
