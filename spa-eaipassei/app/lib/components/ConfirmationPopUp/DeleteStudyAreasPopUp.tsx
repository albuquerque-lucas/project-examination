import { useDeleteStudyAreas } from "../../hooks/useDeleteStudyAreas";
import { motion } from "framer-motion";
import popUp from '@/app/ui/admin/cards/popUp.module.css';

export default function DeleteStudyAreasPopUp() {
  const {
    handleDelete,
    setStudyAreaDeletionMode,
  } = useDeleteStudyAreas();
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
            Tem certeza que deseja deletar esta área de estudo?
          </h4>
          <div className={ popUp.confirmation_btn__container }>
            <button
              className={ popUp.confirmation_btn__yes }
              onClick={ (event) => handleDelete(event) }
            >
              Sim
            </button>
            <button
            onClick={ () => setStudyAreaDeletionMode(false) }
            >
              Não
            </button>
          </div>
        </div>
    </motion.div>
  )
}