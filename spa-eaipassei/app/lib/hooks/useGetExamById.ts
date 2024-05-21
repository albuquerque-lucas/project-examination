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
    setCurrentPage,
  } = useContext(ExamsContext);
    const fetchExam = async (id: number) => {
      console.log('Chegou em fetchExam, e aqui esta o id', id);
      try {
        if (!dataLoaded) {
          setIsLoading(true);
          const apiResponse = await getExamById(`${process.env.NEXT_PUBLIC_API_GET_EXAM_BY_ID}`, queryParams);
          setEntity(apiResponse);
          setDataLoaded(true);
        }
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
    setCurrentPage,
    fetchExam,
  };
}