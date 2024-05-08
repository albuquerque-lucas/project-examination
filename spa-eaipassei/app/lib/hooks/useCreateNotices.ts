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
  const { setNoticesLoaded, creationMode, setCreationMode, noticeMessage, setNoticeDeletionList } = useContext(NoticesContext);

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
      extension: mimeToExtension[noticeFile.type] || '',
    };
  
    setNoticesList([...noticesList, noticeFormRequest]);;
  }

  const submitNotices = async () => {
    console.log('NOTICES PARA SUBMIT', noticesList);
    noticesList.forEach(async (notice) => {
      try {
        const response = await createNotice(`${process.env.NEXT_PUBLIC_API_CREATE_NOTICE}`, notice);
        console.log('Resposta da criação do edital', response);
        setNoticesLoaded(false);
        setNoticesList([]);
      } catch (error: any) {
        console.log('Erro ao criar os editais', error);
      }
    });
  }

  return {
    addToSubmitList,
    submitNotices,
    fileRef,
    idExaminationRef,
    creationMode,
    setCreationMode,
    setNoticesLoaded,
  }
}
