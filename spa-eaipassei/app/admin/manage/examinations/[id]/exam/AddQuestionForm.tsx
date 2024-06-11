import { useRef } from 'react';
import { createQuestion } from '@/app/lib/api/examsAPI';
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/forms/addQuestionForm.module.css';

type CreateQuestionForm = {
  alternativesNumber: number;
  exam_id: string | number;
}

type QuestionFormType = {
  exam_id: string | number;
}
export default function AddQuestionForm({ exam_id }: QuestionFormType) {
  const alternativesNumber = useRef<HTMLInputElement>(null);
  
  const addQuestion = async () => {
    const alternatives = alternativesNumber.current?.value;
    if (!alternatives) return;
  
    const form: CreateQuestionForm = {
      alternativesNumber: parseInt(alternatives),
      exam_id: exam_id,
    }

    const result = await createQuestion(`${process.env.NEXT_PUBLIC_API_CREATE_QUESTION}`, form);
    console.log('Resultado de CreateQuestion', result);
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
      onClick={ addQuestion }
      >
        Adicionar
      </motion.button>
    </div>
  );
}