import React from "react";
import { ExamQuestion, QuestionAlternative } from "@/app/lib/types/examTypes";
import { motion } from 'framer-motion';
import style from "@/app/ui/admin/cards/questionCard.module.css";

interface QuestionCardProps {
  question: ExamQuestion;
  key: number;
}



const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const {
    statement,
    alternatives,
    question_number,
  } = question;

  return (
    <div
    className={style.question_card__container}
    >
      <p className={style.question_card__sentence}>
        <span>{question_number} - </span>
        {statement}
      </p>
      {alternatives.map((alternative: QuestionAlternative, index) => {
        return (
          <p key={index} className={style.question_card__alternative}>
            <span>{alternative.letter} - </span>
            {alternative.text}
          </p>
        );
      })}
    </div>
  );
};

export default QuestionCard;
