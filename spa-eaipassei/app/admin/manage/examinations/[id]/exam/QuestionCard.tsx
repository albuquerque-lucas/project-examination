import React from "react";
import { ExamQuestion, QuestionAlternative } from "@/app/lib/types/examTypes";
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
      <div className={style.card_sentence__container}>
        <span className={ style.sentence_number }>
          {question_number} - 
        </span>
        <span className={ style.card_sentence }>
          {statement}
        </span>
      </div>
      <div className={ style.alternatives_container }>
        {
          alternatives && alternatives.map((alternative: QuestionAlternative, index) => {
            return (
              <p key={index} className={style.question_card__alternative}>
                <span>{alternative.letter} - </span>
                {alternative.text}
              </p>
            );
          })
        }

      </div>
    </div>
  );
};

export default QuestionCard;
