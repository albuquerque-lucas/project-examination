'use client';

import React, { useContext, useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExamsContext } from '@/app/lib/context/ExamsContext';
import { Exam } from '@/app/lib/types/examTypes';
import { IoCloseSharp } from "react-icons/io5";
import { useGetExamById } from '@/app/lib/hooks/useGetExamById';
import { formatDate } from '@/app/lib/utils/formatDate';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { updateExam } from '@/app/lib/api/examsAPI';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/cards/entityInfoBoard.module.css';

interface EntityInfoBoardProps {
  exam: Exam;
}

export default function EntityInfoBoard({ exam }: EntityInfoBoardProps) {
  const [editMode, setEditMode] = useState({
    title: false,
    date: false,
    description: false,
  });

  const [examState, setExamState] = useState(exam);

  const dateRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const tapScale = 0.997;
  const router = useRouter();
  const { id, date, description, questions_count, subjects } = examState;
  const formattedDate = date && formatDate(date);

  const { setEntity } = useGetExamById();

  const {
    setDeletionMode,
    setEntityToDelete,
  } = useContext(ExamsContext);

  const handleEditClick = (field: 'date' | 'description', event: React.MouseEvent) => {
    const inputRef = field === 'date' ? dateRef.current : descriptionRef.current;
    if (event.target !== inputRef) {
      setEditMode(prevState => ({
        ...prevState,
        [field]: !prevState[field]
      }));
    }
  };

  const handleCancelClick = (field: 'date' | 'description', event: React.MouseEvent) => {
    event.stopPropagation();
    const inputRef = field === 'date' ? dateRef.current : descriptionRef.current;
    if (inputRef && inputRef.value !== '') {
      inputRef.value = '';
    } else {
      setEditMode(prevState => ({
        ...prevState,
        [field]: false
      }));
    }
  };

  const handleSaveClick = async (field: 'date' | 'description', event: React.MouseEvent) => {
    event.stopPropagation();
  
    const inputRef = field === 'date' ? dateRef.current : descriptionRef.current;
    const updatedValue = inputRef ? inputRef.value : '';
  
    // let formattedValue = updatedValue;
    // if (field === 'date') {
    //   const [day, month, year] = updatedValue.split('/');
    //   // Formatar a data manualmente como YYYY-MM-DD
    //   formattedValue = `${year}-${month}-${day}`;
    // }
  
    const updatedData = {
      id,
      [field]: updatedValue,
    };
  
    try {
      const result = await updateExam(updatedData);
      if (result) {
        console.log('Submitted Field:', field, 'Updated Value:', updatedValue);
        console.log('Exam updated:', result);
        setExamState(prevState => ({
          ...prevState,
          [field]: updatedValue,
        }));
        setEditMode(prevState => ({
          ...prevState,
          [field]: false,
        }));
      } else {
        console.error('Failed to update exam:', updatedData);
      }
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };
  
  
  

  useEffect(() => {
    if (editMode.date) {
      dateRef.current?.focus();
    } else if (editMode.description) {
      descriptionRef.current?.focus();
    }
  }, [editMode]);

  return (
    <div className={ style.exam_details }>
      <motion.button
        className={ style.details_close__btn }
        whileTap={{ scale: 0.9 }}
        onClick={ () => setEntity(null) }
      >
        <IoCloseSharp />
      </motion.button>
      <motion.p whileTap={{ scale: tapScale }}>
        <span className={ style.detail_key }>Id: </span>
        <span className={ style.detail_value }>{ id }</span>
      </motion.p>
      <motion.p whileTap={{ scale: tapScale }} onClick={ (event) => handleEditClick('date', event) }>
        <span className={ style.detail_key }>Data: </span>
        {editMode.date ? (
          <span className={style.detail_input_span}>
            <input
              type="date"
              ref={dateRef}
              defaultValue=''
              placeholder={formattedDate ? formattedDate : 'Digite uma data...'}
            />
            <motion.button 
              className={style.edit_exam__btn} 
              whileTap={{ scale: 0.9 }} 
              onClick={(event) => handleSaveClick('date', event)}
            >
              <IoCheckbox />
            </motion.button>
            <motion.button 
              className={style.cancel_edit__btn} 
              whileTap={{ scale: 0.9 }} 
              onClick={(event) => handleCancelClick('date', event)}
            >
              <MdCancelPresentation />
            </motion.button>
          </span>
        ) : (
          <span className={style.detail_value}>{formattedDate}</span>
        )}
      </motion.p>
      <motion.p whileTap={{ scale: tapScale }} onClick={(event) => handleEditClick('description', event)}>
        <span className={style.detail_key}>Descrição: </span>
        {editMode.description ? (
          <span className={style.detail_input_span}>
            <input
              type="text"
              ref={descriptionRef}
              defaultValue=''
              placeholder={description ? `${description.substring(0, 7)}...` : 'Digite uma descrição...'}
            />
            <motion.button 
              className={style.edit_exam__btn} 
              whileTap={{ scale: 0.9 }} 
              onClick={(event) => handleSaveClick('description', event)}
            >
              <IoCheckbox />
            </motion.button>
            <motion.button 
              className={style.cancel_edit__btn} 
              whileTap={{ scale: 0.9 }} 
              onClick={(event) => handleCancelClick('description', event)}
            >
              <MdCancelPresentation />
            </motion.button>
          </span>
        ) : (
          <span className={style.detail_value}>{description}</span>
        )}
      </motion.p>
      <motion.p whileTap={{ scale: tapScale }}>
        <span className={style.detail_key}>Questões: </span>
        <span className={style.detail_value}>{questions_count}</span>
      </motion.p>
      <motion.p whileTap={{ scale: tapScale }}>
        <span className={style.detail_key}>Matérias: </span>
        <span className={style.detail_value}>
          {subjects && subjects.map(subject => subject.title).join(', ')}
        </span>
      </motion.p>
      <div className={style.see_exam__container}>
        <motion.button
          className={style.see_exam__btn}
          whileTap={{ scale: 0.99 }}
          onClick={() => router.push(`/admin/manage/examinations/${id}/exam`)}
        >
          Ver Prova
        </motion.button>
        <motion.button
          className={style.delete_exam__btn}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            setEntityToDelete(exam.id);
            setDeletionMode(true);
          }}
        >
          Deletar
        </motion.button>
      </div>
    </div>
  );
}
