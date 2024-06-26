'use client';

import { useContext } from 'react';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import { NoticesContext } from '../../context/NoticesContext';
import { deleteExamination, getExaminations } from '../../api/examinationsAPI';
import { motion } from 'framer-motion';
import popUp from '@/app/ui/admin/cards/popUp.module.css';


export default function ConfirmationPopUp() {
  const {
    setDashboardDeletionMode,
    examinationToDelete,
    setExaminations,
    setExaminationsLoaded,
    queryParams,
  } = useContext(ExaminationsContext);

  const { setNoticesLoaded } = useContext(NoticesContext);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number | null) => {
    event.preventDefault();
    if (id === null) {
      console.error('ID is null');
      return;
    }
    try {
      examinationToDelete && await deleteExamination(examinationToDelete);
      const apiResponse = await getExaminations(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`, queryParams);
      if (apiResponse) {
        setExaminations(apiResponse);
      }
      setExaminationsLoaded(false);
      setNoticesLoaded(false);
      setDashboardDeletionMode(false);
    } catch (error: any) {
      console.log('Erro ao deletar o concurso', error);
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
              Tem certeza que deseja deletar o concurso?
            </h4>
            <div className={ popUp.confirmation_btn__container }>
              <button
                className={ popUp.confirmation_btn__yes }
                onClick={ (event) => handleDelete(event, examinationToDelete) }
              >
                Sim
              </button>
              <button
              onClick={ () => setDashboardDeletionMode(false) }
              >
                Não
              </button>
            </div>
          </div>
      </motion.div>
  )
}