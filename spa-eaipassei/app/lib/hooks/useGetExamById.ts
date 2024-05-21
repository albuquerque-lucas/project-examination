import { useContext, useState, useEffect } from "react";
import { getExamById, getQuestionsByExam } from "../api/examsAPI";
import { ExamsContext } from "../context/ExamsContext";

export const useGetExamById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const {
    entity,
    setEntity,
    queryParams,
    setDataLoaded,
    dataLoaded,
    secondaryData,
    setSecondaryData,
  } = useContext(ExamsContext);
    const fetchExam = async (id: number | null) => {
      if (!id) return;
      console.log('Chegou em fetchExam, e aqui esta o id', id);
      try {
        setIsLoading(true);
        const apiResponse = await getExamById(`${process.env.NEXT_PUBLIC_API_EXAM_BY_ID}/${id}`, queryParams);
        console.log('Result do hook useGetExamById', apiResponse);
        setEntity(apiResponse);
        setDataLoaded(true);
      } catch (error: any) {
        console.log('Erro ao buscar o exame', error);
        setEntity(null);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchExamQuestions = async (id: number | null) => {
      if (!id) return;
      console.log('Chegou em fetchExamQuestions, e aqui esta o id', id);
      try {
        setQuestionsLoading(true);
        const apiResponse = await getQuestionsByExam(`${process.env.NEXT_PUBLIC_API_GET_QUESTION_BY_EXAM}`, { exam_id: id });
        console.log('Result do hook useGetExamById', apiResponse);
        setSecondaryData(apiResponse);
      } catch (error: any) {
        console.log('Erro ao buscar o exame', error);
        setEntity(null);
      } finally {
        setQuestionsLoading(false);
      }
    }

  return {
    entity,
    secondaryData,
    isLoading,
    dataLoaded,
    setEntity,
    setSecondaryData,
    setDataLoaded,
    fetchExam,
    fetchExamQuestions,
  };
}