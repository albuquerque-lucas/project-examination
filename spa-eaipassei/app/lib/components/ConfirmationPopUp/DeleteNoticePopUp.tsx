'use client';

import { useDeleteNotices } from '../../hooks/useDeleteNotices';
import { motion } from 'framer-motion';
import popUp from '@/app/ui/admin/cards/popUp.module.css';

export default function DeleteNoticePopUp() {
  const {
    handleDelete,
    setNoticeDeletionMode,
    noticeDeletionList,
  } = useDeleteNotices();
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
              onClick={ (event) => handleDelete(event) }
            >
              Sim
            </button>
            <button
            onClick={ () => setNoticeDeletionMode(false) }
            >
              Não
            </button>
          </div>
        </div>
    </motion.div>
)
}