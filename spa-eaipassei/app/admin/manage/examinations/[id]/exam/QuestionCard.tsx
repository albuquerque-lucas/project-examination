import React, { useState } from "react";
import { ExamQuestion, QuestionAlternative } from "@/app/lib/types/examTypes";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { IoCheckbox } from "react-icons/io5";
import style from "@/app/ui/admin/cards/questionCard.module.css";

interface QuestionCardProps {
  question: ExamQuestion;
  key: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { statement, alternatives, question_number } = question;

  const [questionEditMode, setQuestionEditMode] = useState(false);
  const [alternativeEditMode, setAlternativeEditMode] = useState<number | null>(null);

  return (
    <div className={style.question_card__container}>
      <div className={style.card_header}>
        {!questionEditMode ? (
          <div className={style.card_sentence__container}>
            <span className={style.sentence_number}>{question_number} - </span>
            <span className={style.card_sentence}>{statement}</span>
            <button onClick={() => setQuestionEditMode(true)}>
              <FaEdit />
            </button>
          </div>
        ) : (
          <div className={style.card_sentence__inputs}>
            <span className={style.sentence_number}>
              <input type="text" defaultValue={question_number} />
            </span>
            <span className={style.card_sentence}>
              <input type="text" defaultValue={statement} />
            </span>
            <div className={style.input_buttons__container}>
              <button className={ style.confirm_edit__btn }>
                <IoCheckbox />
              </button>
              <button onClick={() => setQuestionEditMode(false)} className={ style.cancel_edit__btn }>
                <IoCloseSharp />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={style.alternatives_container}>
        {alternatives &&
          alternatives.map((alternative: QuestionAlternative, index) => {
            const isEditing = alternativeEditMode === index;
            return (
              <div key={index} className={style.question_card__alternative}>
                {
                !isEditing ? (
                  <>
                    <span className={style.alternative_letter}>{alternative.letter} - </span>
                    <span className={style.alternative_sentence}>{alternative.text}</span>
                    <button
                      className={ style.alternative_edit__btn }
                      onClick={() => setAlternativeEditMode(index)}
                    >
                      <FaEdit />
                    </button>
                  </>
                ) : (
                  <div className={style.alternative_sentence__inputs}>
                    <span className={style.alternative_letter}>
                      <input type="text" defaultValue={alternative.letter} />
                    </span>
                    <span className={style.alternative_sentence}>
                      <input type="text" defaultValue={alternative.text} />
                    </span>
                    <div className={style.alternative_buttons__container}>
                      <button className={ style.confirm_edit__btn }>
                        <IoCheckbox />
                      </button>
                      <button onClick={() => setAlternativeEditMode(null)} className={ style.cancel_edit__btn }>
                        <IoCloseSharp />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default QuestionCard;
