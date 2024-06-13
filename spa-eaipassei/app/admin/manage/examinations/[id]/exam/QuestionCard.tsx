import React, { useState, useEffect, useContext } from "react";
import { ExamsContext } from "@/app/lib/context/ExamsContext";
import { ExamQuestion, QuestionAlternative } from "@/app/lib/types/examTypes";
import { FaEdit, FaCheck } from "react-icons/fa";
import { IoCloseSharp, IoCheckbox, IoAddCircleSharp } from "react-icons/io5";
import {
  updateQuestion,
  deleteQuestion,
  getQuestionsByExam,
  deleteAlternative,
  createAlternative,

} from "@/app/lib/api/examsAPI";
import style from "@/app/ui/admin/cards/questionCard.module.css";
import AlternativeRow from "./AlternativeRow";

interface QuestionCardProps {
  question: ExamQuestion;
  key: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { id, exam_id, statement, alternatives, question_number } = question;
  const { questionList, setQuestionList, queryParams, questionsCurrentPage, dataLoaded } = useContext(ExamsContext);

  const [questionEditMode, setQuestionEditMode] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [newNumber, setNewNumber] = useState(question_number);
  const [newStatement, setNewStatement] = useState(statement);
  const [updatedQuestion, setUpdatedQuestion] = useState<ExamQuestion>(question);

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

  const handleDelete = async () => {
    if (!id) return;
    console.log('Deletar questão', id);
    const deleteResult = await deleteQuestion(id);
    console.log('Resultado da delecao', deleteResult);

    const fetchResult = await getQuestionsByExam(`${process.env.NEXT_PUBLIC_API_GET_QUESTION_BY_EXAM}`, { exam_id: exam_id, ...queryParams, page: questionsCurrentPage });
    console.log('Resultado do fetch', fetchResult);
    fetchResult && setQuestionList(fetchResult.data);
    setDeleteMode(false);
  }

  const handleAlternativeAdd = async () => {
    const lastAlternative = updatedAlternatives.slice(-1)[0];
    const lastLetter = lastAlternative ? lastAlternative.letter : '';
    const newLetter = String.fromCharCode(lastLetter.charCodeAt(0) + 1 || 65); // Default to 'A' if lastLetter is empty

    const newAlternative: QuestionAlternative = {
      letter: newLetter.toLowerCase(),
      text: '',
      is_answer: false,
      exam_question_id: id
    };

    // Enviar solicitação para criar uma nova alternativa
    const result = await createAlternative(newAlternative);
    console.log('Resultado da criação da nova alternativa', result);

    const updatedAlternativesCopy = [...updatedAlternatives, result.alternative];
    setUpdatedAlternatives(updatedAlternativesCopy);

    const updatedQuestion = {
      ...question,
      alternatives: updatedAlternativesCopy
    };

    if (!questionList) return;
    const updatedList = questionList.map(q => q.id === question.id ? updatedQuestion : q);
    setQuestionList(updatedList);
  }

  const handleAlternativeUpdate = (index: number, updatedAlternative: QuestionAlternative) => {
    const updatedAlternativesCopy = [...updatedAlternatives];
    updatedAlternativesCopy[index] = updatedAlternative;
    setUpdatedAlternatives(updatedAlternativesCopy);
  };

  const handleAlternativeDelete = async (alternativeId: number | string) => {
    console.log('Deletar alternativa', alternativeId);
    
    const deleteResult = await deleteAlternative(alternativeId);
    console.log('Resultado da delecao', deleteResult);

    const updatedAlternativesCopy = updatedAlternatives.filter(alt => alt.id !== alternativeId);
    setUpdatedAlternatives(updatedAlternativesCopy);

    const updatedQuestion = {
      ...question,
      alternatives: updatedAlternativesCopy
    };

    if (!questionList) return;
    const updatedList = questionList.map(q => q.id === question.id ? updatedQuestion : q);
    setQuestionList(updatedList);

  };

  useEffect(() => {
    setNewNumber(updatedQuestion.question_number);
    setNewStatement(updatedQuestion.statement);
  }, [updatedQuestion, questionList]);

  return (
    <div className={style.question_card__container}>
      <div className={style.card_header}>
        {!questionEditMode ? (
          <div className={style.card_sentence__container}>
            <span className={style.sentence_number}>{newNumber} - </span>
            <span className={style.card_sentence}>{newStatement}</span>
            {
              deleteMode ?
              (
              <button
              className={ style.cancel_delete__btn }
              onClick={() => setDeleteMode(false)}
              >
                <IoCloseSharp />
              </button>

              )
              :
              (
              <button
              className={ style.open_edit__btn }
              onClick={() => setQuestionEditMode(true)}
              >
                <FaEdit />
              </button>

              )
            }
            {
              !deleteMode ? (
                <button
                className={ style.delete_edit__btn }
                onClick={() => setDeleteMode(true)}
                >
                  <IoCloseSharp />
                </button>
              ) : (
                <button
                className={ style.confirm_delete__btn }
                onClick={() => handleDelete()}
                >
                  <FaCheck />
                </button>
              )
            }
              <button
              className={ style.add_alternative__btn }
              onClick={ () => handleAlternativeAdd() }
              >
                <IoAddCircleSharp />
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
        updatedAlternatives
          .slice()
          .sort((a, b) => a.letter.localeCompare(b.letter)) // Ordenar alfabeticamente
          .map((alternative, index) => (
            <AlternativeRow
              key={alternative.id}
              alternative={alternative}
              index={index}
              onUpdate={handleAlternativeUpdate}
              onDelete={handleAlternativeDelete}
            />
      ))}
      </div>
    </div>
  );
};

export default QuestionCard;
