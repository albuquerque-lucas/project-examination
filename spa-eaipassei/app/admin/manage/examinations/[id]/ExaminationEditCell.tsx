import { useState, MouseEvent } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { motion } from 'framer-motion';
import { StudyArea } from '@/app/lib/types/studyAreasTypes';
import style from '@/app/ui/admin/cards/examinationEditCell.module.css';

interface ExaminationEditCellProps {
  title: string;
  value: string | number | StudyArea[];
  type: 'text' | 'number' | 'date' | 'select' | 'not-editable' | 'list';
}

export default function ExaminationEditCell({ title, value, type }: ExaminationEditCellProps) {
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleDivClick = (e: MouseEvent<HTMLDivElement>) => {
    if (type !== 'not-editable') {
      setEditMode(!editMode);
    }
  };

  const dissociateStudyArea = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Implementar lógica de desassociação aqui
  }

  const confirmEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Implementar lógica de confirmação aqui
  };

  const cancelEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditMode(false);
    // Implementar lógica de cancelamento aqui
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const renderValue = () => {
    if (Array.isArray(value)) {
      const list = value.map((item: StudyArea) => item.area);
      return list.join(', ');
    }
    return value;
  };

  const renderEditableInput = () => {
    if (type === 'select') {
      return (
        <select onClick={() => stopPropagation}>
          <option>Selecione uma opção</option>
        </select>
      );
    } else if (type === 'list' && Array.isArray(value)) {
      return (
        <ul className={ style.items_list }>
          {value.map((item: StudyArea) => (
            <li key={item.id}>
              {item.area}
              <motion.button 
                className={style.confirm_edit__btn} 
                whileTap={{ scale: 0.9 }} 
                onClick={(e) => {
                  stopPropagation(e);
                  dissociateStudyArea(e);
                }}
              >
                <MdCancelPresentation />
              </motion.button>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <input
          type={type}
          placeholder={renderValue() as string}
          defaultValue=""
          onClick={stopPropagation}
        />
      );
    }
  };

  return (
    <div className={style.detail_section__card} onClick={handleDivClick}>
      <h4>{`${title}:`}</h4>
      {editMode ? (
        <div className={style.examination_input__container}>
          {renderEditableInput()}

          {
            type !== 'list' && (
              <>
                <motion.button
                  className={style.confirm_edit__btn}
                  whileTap={{ scale: 0.9 }}
                  onClick={confirmEdit}
                >
                  <IoCheckbox />
                </motion.button>
                <motion.button
                  className={style.cancel_edit__btn}
                  whileTap={{ scale: 0.9 }}
                  onClick={cancelEdit}
                >
                  <MdCancelPresentation />
                </motion.button>
              </>
            )
          }
        </div>
      ) : (
        <p>{renderValue()}</p>
      )}
    </div>
  );
}
