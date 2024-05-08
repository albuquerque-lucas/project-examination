'use client';

import { useState, useRef, useContext } from 'react';
import { NoticesContext } from '../context/NoticesContext';
import { NoticeFormRequest } from '../types/noticeTypes';
import { createNotice } from '../api/noticesAPI';
import { mimeToExtension } from '@/app/lib/utils/mapperFunctions';

export const useCreateNotices = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const idExaminationRef = useRef<HTMLInputElement>(null);
  const [noticesList, setNoticesList] = useState<NoticeFormRequest[]>([]);
  const { setNoticesLoaded, creationMode, setCreationMode, noticeMessage, setNoticeMessage } = useContext(NoticesContext);

  const submitNotice = async () => {
    const noticeFile = fileRef.current?.files?.length && fileRef.current.files[0] instanceof File
      ? fileRef.current.files[0]
      : null;

    if (!noticeFile) {
      setNoticeMessage({
        message: 'Selecione um arquivo para enviar.',
        type: 'error',
      });
      return;
    }

    const noticeFormRequest: NoticeFormRequest = {
      examination_id: Number(idExaminationRef.current?.value),
      notice_file: noticeFile,
      file_name: noticeFile.name,
      extension: mimeToExtension[noticeFile.type] || '',
    };
  
    try {
      const response = await createNotice(`${process.env.NEXT_PUBLIC_API_CREATE_NOTICE}`, noticeFormRequest);
      console.log('Resposta da criação do edital', response);
      if (response && response.status >= 200 && response.status < 300) {
        setNoticeMessage({
          message: response.data.message,
          type: 'success',
        });
      }
      setNoticesLoaded(false);
      setNoticesList([]);
    } catch (error: any) {
      console.error('Erro ao criar o edital', error);
      setNoticeMessage({
        message: 'Ocorreu um erro ao enviar o edital.',
        type: 'error',
      });
    } finally {
      if (fileRef.current) fileRef.current.value = '';
      if (idExaminationRef.current) idExaminationRef.current.value = '';
    }
  }

  return {
    fileRef,
    idExaminationRef,
    creationMode,
    noticeMessage,
    submitNotice,
    setCreationMode,
    setNoticesLoaded,
    setNoticeMessage,
  }
}
