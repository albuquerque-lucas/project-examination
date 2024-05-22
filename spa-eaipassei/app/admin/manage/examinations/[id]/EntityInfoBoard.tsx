import React from 'react';
import { Exam } from '@/app/lib/types/examTypes';
import { IoCloseSharp } from "react-icons/io5";
import { useGetExamById } from '@/app/lib/hooks/useGetExamById';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/cards/entityInfoBoard.module.css';

interface EntityInfoBoardProps {
  exam: Exam;
}

export default function EntityInfoBoard({ exam }: EntityInfoBoardProps) {
  const { setEntity } = useGetExamById();
  const { id, date, description, questions_count, subjects } = exam;
  const showCase = {
    "Id": id,
    "Data": date,
    "Descrição": description,
    "Questões": questions_count,
  }
  return (
    <motion.div
      className={ style.exam_details }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
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
          <span>{key}: </span>
          <span>{value}</span>
        </p>
      ))
    }
    <p>
      <span>Matérias: </span>
      <span>
        {
          subjects &&
          subjects
            .map(subject => subject.title)
            .join(', ')
        }
      </span>
    </p>
  </motion.div>
  )
}