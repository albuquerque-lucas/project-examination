import React from "react";
import { ExamQuestion } from "@/app/lib/types/examTypes";
import style from '@/app/ui/admin/cards/questionCard.module.css';


const QuestionCard = () => {
  // const {
  //   id,
  //   exam_id,
  //   subject_id,
  //   topic_id,
  //   alternatives,
  //   question_number,
  // } = examQuestion;
  return (
    <div className={ style.question_card__container }>
      <p className={ style.question_card__sentence }>
        <span>1 - </span>
        A Constituição Federal de 1988 estabelece diversos direitos fundamentais. Com base nesse contexto, assinale a alternativa correta:
      </p>
      <p className={ style.question_card__alternative }>
        <span>A - </span>
        O direito à vida é absoluto, não admitindo qualquer forma de restrição ou limitação.
      </p>
      <p className={ style.question_card__alternative }>
        <span>B - </span>
        A liberdade de expressão é garantida, mas não pode ser exercida de forma a prejudicar a honra ou a imagem das pessoas.
      </p>
      <p className={ style.question_card__alternative }>
        <span>C - </span>
        O direito de reunião não necessita de prévio aviso às autoridades competentes, podendo ser exercido livremente em qualquer local público.
      </p>
      <p className={ style.question_card__alternative }>
        <span>D - </span>
        O direito de propriedade é garantido, mas não pode ser exercido de forma a prejudicar o meio ambiente.
      </p>
      <p className={ style.question_card__alternative }>
        <span>E - </span>
        A liberdade de crença é garantida, mas não pode ser exercida de forma a prejudicar a ordem pública.
      </p>
    </div>
  );
}

export default QuestionCard;