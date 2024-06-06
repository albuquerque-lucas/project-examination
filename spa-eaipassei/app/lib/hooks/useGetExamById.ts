import { useContext, useState, useEffect, useCallback } from "react";
import { getExamById, getQuestionsByExam } from "../api/examsAPI";
import { Exam, ExamQueryParams, ExamQuestion } from "../types/examTypes";
import { ExamsContext } from "../context/ExamsContext";
import { PaginatedAPIResponse } from "../types/entityContextTypes";

export const useGetExamById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState(false);

  const {
    entity,
    setEntity,
    queryParams,
    dataLoaded,
    setDataLoaded,
    secondaryData,
    setSecondaryData,
    secondaryDataList,
    setSecondaryDataList,
    secondaryNavLinks,
    setSecondaryNavLinks,
  } = useContext(ExamsContext);

  const fetchExam = useCallback(async (id: number | null): Promise<Exam | null> => {
    if (!id) return null;
    console.log('Chegou em fetchExam, e aqui esta o id', id);
    console.log('QueryParams', queryParams);
    try {
      setIsLoading(true);
      const apiResponse = await getExamById(`${process.env.NEXT_PUBLIC_API_EXAM_BY_ID}/${id}`, queryParams);
      // console.log('Result do hook useGetExamById', apiResponse);
      setEntity(apiResponse);
      setDataLoaded(true);
      return apiResponse;
    } catch (error: any) {
      // console.log('Erro ao buscar o exame', error);
      setEntity(null);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [queryParams, setEntity, setDataLoaded]);

  const fetchExamQuestions = useCallback(async (id: number | null): Promise<PaginatedAPIResponse<ExamQuestion> | null> => {
    if (!id) return null;
    console.log('Chegou em fetchExamQuestions, e aqui esta o id', id);
    try {
      setQuestionsLoading(true);
      const apiResponse = await getQuestionsByExam(`${process.env.NEXT_PUBLIC_API_GET_QUESTION_BY_EXAM}`, { exam_id: id });
      console.log('Result do hook useGetExamById', apiResponse);
      setSecondaryData(apiResponse);
      apiResponse && setSecondaryDataList(apiResponse.data);
      apiResponse && setSecondaryNavLinks(apiResponse.links);
      return apiResponse;
    } catch (error: any) {
      console.log('Erro ao buscar as questões', error);
      setEntity(null);
      return null;
    } finally {
      setQuestionsLoading(false);
    }
  }, [setEntity, setSecondaryData, setSecondaryData]);

  return {
    entity,
    secondaryData,
    isLoading,
    dataLoaded,
    secondaryDataList,
    secondaryNavLinks,
    queryParams,
    setEntity,
    setSecondaryData,
    setDataLoaded,
    fetchExam,
    fetchExamQuestions,
    setSecondaryDataList,
    setSecondaryNavLinks,
  };
};
