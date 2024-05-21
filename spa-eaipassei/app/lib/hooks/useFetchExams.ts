import { useContext, useEffect, useState } from 'react';
import { getExams } from '../api/examsAPI';
import { ExamsContext } from '@/app/lib/context/ExamsContext';

export const useFetchExams = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    data,
    setData,
    queryParams,
    setDataLoaded,
    dataLoaded,
    setCurrentPage,
  } = useContext(ExamsContext);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        if (!dataLoaded) {
          setIsLoading(true);
          const apiResponse = await getExams(`${process.env.NEXT_PUBLIC_API_GET_EXAMS_LIST}`, queryParams);
          setData(apiResponse);
          setDataLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os exames', error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExams();
  }, [dataLoaded]);

  return {
    data,
    isLoading,
    dataLoaded,
    setDataLoaded,
    setCurrentPage,
  };
}