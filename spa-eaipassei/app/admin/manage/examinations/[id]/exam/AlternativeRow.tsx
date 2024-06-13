import React, { useState } from "react";
import { QuestionAlternative } from "@/app/lib/types/examTypes";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { updateAlternative } from "@/app/lib/api/examsAPI";
import style from "@/app/ui/admin/cards/questionCard.module.css";

interface AlternativeRowProps {
  alternative: QuestionAlternative;
  index: number;
  onUpdate: (index: number, updatedAlternative: QuestionAlternative) => void;
  onDelete: (alternativeId: number | string) => void;
}

const AlternativeRow: React.FC<AlternativeRowProps> = ({ alternative, index, onUpdate, onDelete }) => {
  const [alternativeEditMode, setAlternativeEditMode] = useState(false);
  const [alternativeDeletionMode, setAlternativeDeletionMode] = useState(false);
  const [newAlternativeLetter, setNewAlternativeLetter] = useState(alternative.letter);
  const [newAlternativeText, setNewAlternativeText] = useState(alternative.text);

  const submitAlternativeEdit = async () => {
    const updatedAlternative = {
      ...alternative,
      letter: newAlternativeLetter,
      text: newAlternativeText,
    };
    const result = await updateAlternative(updatedAlternative);
    console.log('Result de updateAlternative em AlternativeRow', result);
    onUpdate(index, updatedAlternative);
    setAlternativeEditMode(false);
  };

  return (
    <div className={style.question_card__alternative}>
      {!alternativeEditMode ? (
        <>
          <span className={style.alternative_letter}>{alternative.letter} - </span>
          <span className={style.alternative_sentence}>{alternative.text}</span>

          {alternativeDeletionMode ? (
            <>
              <button
              className={style.cancel_delete__btn}
              onClick={() => setAlternativeDeletionMode(false)}
              >
                <IoCloseSharp />
              </button>
              <button
                className={style.confirm_delete__btn}
                onClick={() => onDelete(alternative.id as number)}
              >
                <FaCheck />
              </button>

            </>
          ) : (
            <>
              <button
                className={style.alternative_edit__btn}
                onClick={() => {
                  setAlternativeEditMode(true);
                }}
              >
                <FaEdit />
              </button>
              <button
                className={style.alternative_delete__btn}
                onClick={() => setAlternativeDeletionMode(true)}
              >
                <IoCloseSharp />
              </button>
            </>
          )}
        </>
      ) : (
        <div className={style.alternative_sentence__inputs}>
          <span className={style.alternative_letter}>
            <input
              type="text"
              value={newAlternativeLetter}
              onChange={(e) => setNewAlternativeLetter(e.target.value)}
            />
          </span>
          <span className={style.alternative_sentence}>
            <input
              type="text"
              value={newAlternativeText}
              onChange={(e) => setNewAlternativeText(e.target.value)}
            />
          </span>
          <div className={style.alternative_buttons__container}>
            <button
              className={style.confirm_edit__btn}
              onClick={submitAlternativeEdit}
            >
              <IoCheckbox />
            </button>
            <button onClick={() => setAlternativeEditMode(false)} className={style.cancel_edit__btn}>
              <IoCloseSharp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlternativeRow;
