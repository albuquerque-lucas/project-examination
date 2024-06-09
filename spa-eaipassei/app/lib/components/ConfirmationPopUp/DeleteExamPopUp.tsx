'use client';

import { useRef, useContext } from 'react';
import { ExamsContext } from '../../context/ExamsContext';
import { deleteExam } from '../../api/examsAPI';
import { motion } from 'framer-motion';
import popUp from '@/app/ui/admin/cards/popUp.module.css';

export default function DeleteExamPopUp() {

  const {
    setExamDeletionMode,
    examToDelete,
    setDataLoaded,
    setExam,
  } = useContext(ExamsContext);

  const deleteFieldRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (deleteFieldRef.current?.value === 'DELETAR') {
      const result = await deleteExam(`${process.env.NEXT_PUBLIC_API_DELETE_EXAM as string}/${examToDelete}`);
      console.log('Resultado do delete', result);
      setExam(null);
      setDataLoaded(true);
      setExamDeletionMode(false);
    }

  }

  return (
    <motion.div
      className={ popUp.background__screen }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
        <div
          className={ popUp.popUp_container}
          >
          <h4 className={ popUp.popUp_title }>
            Para excluir a prova, digite &apos;DELETAR&apos; no campo abaixo e clique em &apos;Sim&apos;
          </h4>
          <input type="text" ref={ deleteFieldRef }/>
          <div className={ popUp.confirmation_btn__container }>
            <button
              className={ popUp.confirmation_btn__yes }
              onClick={ (event) => handleDelete(event) }
            >
              Sim
            </button>
            <button
            onClick={ () => setExamDeletionMode(false) }
            >
              Não
            </button>
          </div>
        </div>
    </motion.div>
)
}