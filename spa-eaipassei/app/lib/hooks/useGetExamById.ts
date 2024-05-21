import { useContext, useState, useEffect } from "react";
import { getExamById } from "../api/examsAPI";
import { ExamsContext } from "../context/ExamsContext";

export const useGetExamById = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    entity,
    setEntity,
    queryParams,
    setDataLoaded,
    dataLoaded,
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

  return {
    entity,
    isLoading,
    dataLoaded,
    setEntity,
    setDataLoaded,
    fetchExam,
  };
}