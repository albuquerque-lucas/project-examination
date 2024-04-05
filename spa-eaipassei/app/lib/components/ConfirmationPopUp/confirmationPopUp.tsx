'use client';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import { deleteExamination, getAllExaminations } from '../../api/examinationsAPI';
import popUp from '@/app/ui/admin/cards/popUp.module.css';


export default function ConfirmationPopUp() {
  const { setDashboardDeletionMode, examinationToDelete, setExaminations } = useContext(ExaminationsContext);

  const router = useRouter();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number | null) => {
    event.preventDefault();
    if (id === null) {
      console.error('ID is null');
      return;
    }
    try {
      console.log(examinationToDelete);
      const deleteResponse = await deleteExamination(id);
      const getResponse = await getAllExaminations();
      setExaminations(getResponse.data);
      console.log(deleteResponse);
      setDashboardDeletionMode(false);
    } catch (error: any) {
      console.log('Erro ao deletar o concurso', error);
    }
  }

  return (
    <div className={ popUp.background__screen }>
      <div className={ popUp.popUp_container}>
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
    </div>
  )
}