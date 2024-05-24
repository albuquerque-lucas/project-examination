import React from 'react';
import { Examination } from '../../types/examinationTypes';
import { BsFillXSquareFill } from "react-icons/bs";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/cards/examinationSavingCard.module.css'

type ExaminationSavingCardProps = {
  index: number;
  examination: Examination;
  persistenceList: Examination[];
  setPersistenceList: React.Dispatch<React.SetStateAction<Examination[]>>;
};

const ExaminationSavingCard: React.FC<ExaminationSavingCardProps> = ({
  index,
  examination,
  persistenceList,
  setPersistenceList
}) => {
  const {
    title,
    institution,
  } = examination;

  const handleDelete = () => {
    const newPersistenceList = persistenceList
      .filter((_, itemIndex) => itemIndex !== index);

    setPersistenceList(newPersistenceList);
  }
  return (
    <div className={ style.saving_card__container }>
      <h5>{title}</h5>
      <p><span>Instituição:</span> {institution}</p>
      <motion.button
        className={ style.delete_item__button }
        onClick={handleDelete}
        whileTap={{ scale: 0.9 }}
      >
        <BsFillXSquareFill />
      </motion.button>
    </div>
  );
};

export default ExaminationSavingCard;