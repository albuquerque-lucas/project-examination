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
    id,
    exam_id,
    subject_id,
    topic_id,
    statement,
    alternatives,
    question_number,
  } = question;

  return (
    <motion.div
    className={style.question_card__container}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
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
    </motion.div>
  );
};

export default QuestionCard;
