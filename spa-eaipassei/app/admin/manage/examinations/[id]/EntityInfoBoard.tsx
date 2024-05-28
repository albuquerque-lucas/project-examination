'use client';

import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ExamsContext } from '@/app/lib/context/ExamsContext';
import { Exam } from '@/app/lib/types/examTypes';
import { IoCloseSharp } from "react-icons/io5";
import { useGetExamById } from '@/app/lib/hooks/useGetExamById';
import { formatDate } from '@/app/lib/utils/formatDate';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/cards/entityInfoBoard.module.css';

interface EntityInfoBoardProps {
  exam: Exam;
}

export default function EntityInfoBoard({ exam }: EntityInfoBoardProps) {
  const router = useRouter();
  const { id, date, description, questions_count, subjects } = exam;
  const formattedDate = date && formatDate(date);
  const showCase = {
    "Id": id,
    "Data": formattedDate,
    "Descrição": description,
    "Questões": questions_count,
  };

  const { setEntity } = useGetExamById();

  const {
    setDeletionMode,
    setEntityToDelete,
  } = useContext(ExamsContext);

  return (
    <div className={ style.exam_details } >
      <motion.button
        className={ style.details_close__btn }
        whileTap={{ scale: 0.9 }}
        onClick={ () => setEntity(null) }
      >
        <IoCloseSharp />
      </motion.button>
      {
        Object.entries(showCase).map(([key, value]) => (
          <p key={key}>
            <span className={ style.detail_key }>{key}: </span>
            <span className={ style.detail_value }>{value}</span>
          </p>
        ))
      }
      <p>
        <span className={ style.detail_key }>Matérias: </span>
        <span className={ style.detail_value }>
          {
            subjects &&
            subjects
              .map(subject => subject.title)
              .join(', ')
          }
        </span>
      </p>
      <div className={ style.see_exam__container }>
        <motion.button 
          className={ style.see_exam__btn }
          whileTap={ { scale: 0.99 } }
          onClick={ () => router.push(`/admin/manage/examinations/${id}/questions`) }
        >
          Ver Prova
        </motion.button>
        <motion.button 
          className={ style.delete_exam__btn }
          whileTap={ { scale: 0.99 } }
          onClick={ () => {
            setEntityToDelete(exam.id);
            setDeletionMode(true);
          
          } }
        >
          Deletar
        </motion.button>
      </div>
    </div>
  )
}