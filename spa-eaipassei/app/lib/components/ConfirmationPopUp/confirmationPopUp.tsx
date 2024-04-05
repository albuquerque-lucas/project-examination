'use client';

import { useContext } from 'react';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import { deleteExamination, getAllExaminations } from '../../api/examinationsAPI';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import popUp from '@/app/ui/admin/cards/popUp.module.css';


export default function ConfirmationPopUp() {
  const { setDashboardDeletionMode, examinationToDelete, setExaminations } = useContext(ExaminationsContext);

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number | null) => {
    event.preventDefault();
    if (id === null) {
      console.error('ID is null');
      return;
    }
    try {
      console.log(examinationToDelete);
      await toast.promise(
        deleteExamination(id),
      {
        pending: 'Deletando concurso...',
        success: `Concurso ${id} deletado com sucesso.`,
        error: 'Falha ao deletar o concurso.'
      
      });
      const getResponse = await getAllExaminations();
      setExaminations(getResponse.data);
      setDashboardDeletionMode(false);
    } catch (error: any) {
      console.log('Erro ao deletar o concurso', error);
    }
  }

  return (
    <div className={ popUp.background__screen }>
      <motion.div
        className={ popUp.popUp_container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

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
      </motion.div>
    </div>
  )
}