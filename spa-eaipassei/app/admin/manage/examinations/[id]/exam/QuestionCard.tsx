import React, { useState, useEffect } from "react";
import { ExamQuestion, QuestionAlternative } from "@/app/lib/types/examTypes";
import { FaEdit } from "react-icons/fa";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { updateQuestion, updateAlternative } from "@/app/lib/api/examsAPI";
import style from "@/app/ui/admin/cards/questionCard.module.css";

interface QuestionCardProps {
  question: ExamQuestion;
  key: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { id, statement, alternatives, question_number } = question;

  const [questionEditMode, setQuestionEditMode] = useState(false);
  const [alternativeEditMode, setAlternativeEditMode] = useState<number | null>(null);
  const [dataUpdated, setDataUpdated] = useState(false);

  const [newNumber, setNewNumber] = useState(question_number);
  const [newStatement, setNewStatement] = useState(statement);
  const [updatedQuestion, setUpdatedQuestion] = useState<ExamQuestion>(question);

  const [newAlternativeLetter, setNewAlternativeLetter] = useState<string | null>(null);
  const [newAlternativeText, setNewAlternativeText] = useState<string | null>(null);
  const [updatedAlternatives, setUpdatedAlternatives] = useState<QuestionAlternative[]>(alternatives ?? []);

  const submitSentenceEdit = async () => {
    const updatedQuestion: ExamQuestion = {
      ...question,
      statement: newStatement,
      question_number: newNumber,
    };
    const result = await updateQuestion(updatedQuestion);
    console.log('Result de updateQuestion em QuestionCard', result);
    setQuestionEditMode(false);
    setUpdatedQuestion(updatedQuestion);
    setDataUpdated(true);
  }

  const submitAlternativeEdit = async (index: number) => {
    const updatedAlternativesCopy = [...updatedAlternatives];
    if (newAlternativeLetter !== null && newAlternativeText !== null) {
      updatedAlternativesCopy[index] = {
        ...updatedAlternativesCopy[index],
        letter: newAlternativeLetter,
        text: newAlternativeText,
      };
    }
    const result = await updateAlternative(updatedAlternativesCopy[index]);
    console.log('Result de updateAlternative em QuestionCard', result);
    setUpdatedAlternatives(updatedAlternativesCopy);
    setAlternativeEditMode(null);
  }

  useEffect(() => {
    setNewNumber(updatedQuestion.question_number);
    setNewStatement(updatedQuestion.statement);
  }, [updatedQuestion]);

  useEffect(() => {
    if (alternativeEditMode === null) {
      setNewAlternativeLetter(null);
      setNewAlternativeText(null);
    }
  }, [alternativeEditMode]);

  return (
    <div className={style.question_card__container}>
      <div className={style.card_header}>
        {!questionEditMode ? (
          <div className={style.card_sentence__container}>
            <span className={style.sentence_number}>{newNumber} - </span>
            <span className={style.card_sentence}>{newStatement}</span>
            <button onClick={() => setQuestionEditMode(true)}>
              <FaEdit />
            </button>
          </div>
        ) : (
          <div className={style.card_sentence__inputs}>
            <span className={style.sentence_number}>
              <input
                type="text"
                value={newNumber}
                onChange={(e) => setNewNumber(Number(e.target.value))}
              />
            </span>
            <span className={style.card_sentence}>
              <input
                type="text"
                value={newStatement}
                onChange={(e) => setNewStatement(e.target.value)}
              />
            </span>
            <div className={style.input_buttons__container}>
              <button
                className={style.confirm_edit__btn}
                onClick={submitSentenceEdit}
              >
                <IoCheckbox />
              </button>
              <button onClick={() => setQuestionEditMode(false)} className={style.cancel_edit__btn}>
                <IoCloseSharp />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={style.alternatives_container}>
        {updatedAlternatives &&
          updatedAlternatives.map((alternative: QuestionAlternative, index) => {
            const isEditing = alternativeEditMode === index;
            return (
              <div key={index} className={style.question_card__alternative}>
                {
                !isEditing ? (
                  <>
                    <span className={style.alternative_letter}>{alternative.letter} - </span>
                    <span className={style.alternative_sentence}>{alternative.text}</span>
                    <button
                      className={style.alternative_edit__btn}
                      onClick={() => {
                        setAlternativeEditMode(index);
                        setNewAlternativeLetter(alternative.letter);
                        setNewAlternativeText(alternative.text);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </>
                ) : (
                  <div className={style.alternative_sentence__inputs}>
                    <span className={style.alternative_letter}>
                      <input
                        type="text"
                        value={newAlternativeLetter || ""}
                        onChange={(e) => setNewAlternativeLetter(e.target.value)}
                      />
                    </span>
                    <span className={style.alternative_sentence}>
                      <input
                        type="text"
                        value={newAlternativeText || ""}
                        onChange={(e) => setNewAlternativeText(e.target.value)}
                      />
                    </span>
                    <div className={style.alternative_buttons__container}>
                      <button
                        className={style.confirm_edit__btn}
                        onClick={() => submitAlternativeEdit(index)}
                      >
                        <IoCheckbox />
                      </button>
                      <button onClick={() => setAlternativeEditMode(null)} className={style.cancel_edit__btn}>
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
