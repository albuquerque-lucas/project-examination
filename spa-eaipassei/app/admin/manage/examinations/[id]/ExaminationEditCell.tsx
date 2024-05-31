import { useState, MouseEvent } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/cards/examinationEditCell.module.css';

export default function ExaminationEditCell() {
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleDivClick = (e: MouseEvent<HTMLDivElement>) => {
    setEditMode(!editMode);
  };

  const confirmEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Implementar lógica de confirmação aqui
  };

  const cancelEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (editMode) setEditMode(false);
    // Implementar lógica de cancelamento aqui
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={ style.detail_section__card }
      onClick={ handleDivClick }
    >
      <h4>Item: </h4>
      {
        editMode ? (
          <div className={ style.examination_input__container }>
            <input 
              type="text" 
              placeholder='Digite a alteração aqui...' 
              onClick={stopPropagation} 
            />
            <motion.button 
              className={ style.confirm_edit__btn } 
              whileTap={{ scale: 0.9 }} 
              onClick={confirmEdit}
            >
              <IoCheckbox />
            </motion.button>
            <motion.button 
              className={ style.cancel_edit__btn } 
              whileTap={{ scale: 0.9 }} 
              onClick={cancelEdit}
            >
              <MdCancelPresentation />
            </motion.button>
          </div>
        ) : (
          <p>
            Result
          </p>
        )
      }
    </div>
  )
}
