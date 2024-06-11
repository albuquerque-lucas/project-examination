import { useRef } from 'react';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/forms/addQuestionForm.module.css';

type CreateQuestionForm = {
  alternativesNumber: number;
  exam_id: string | number;
}

export default function AddQuestionForm() {
  const alternativesNumber = useRef<HTMLInputElement>(null);

  const createQuestion = () => {}

  const addQuestion = async () => {
    
  }

  return (
    <div className={ style.add_question__form }>
      <h3>Adicionar Questão</h3>
      <label htmlFor="alternatives_number">N alternativas:</label>
      <input
      ref={alternativesNumber}
      type="number"
      id="alternatives_number"
      />
      <motion.button
      whileTap={{ scale: 0.99 }}
      >
        Adicionar
      </motion.button>
    </div>
  );
}