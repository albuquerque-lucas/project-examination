import { useContext } from 'react';
import { ExaminationsContext } from '../../context/ExaminationsContext';
import popUp from '@/app/ui/admin/cards/popUp.module.css';


export default function ConfirmationPopUp() {
  const { setDashboardDeletionMode } = useContext(ExaminationsContext);

  const handleDelete = () => {
    setDashboardDeletionMode(false);
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
            onClick={ () => handleDelete() }
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