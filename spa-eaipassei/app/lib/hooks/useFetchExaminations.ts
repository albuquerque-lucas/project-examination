import { useState, useEffect, useContext } from 'react';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import { getExaminations } from '@/app/lib/api/examinationsAPI';

export const useFetchExaminations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    examinations,
    setExaminations,
    queryParams,
    examinationsLoaded,
    setExaminationsLoaded,
    currentPage,
  } = useContext(ExaminationsContext);

  useEffect(() => {
    const fetchExaminations = async () => {
      try {
        if (!examinationsLoaded) {
          setIsLoading(true);
          const apiResponse = await getExaminations(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`, queryParams);
          setExaminations(apiResponse);
          setExaminationsLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os concursos', error);
        setExaminations(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExaminations();
  }, [examinationsLoaded]);

  return {
    examinations,
    isLoading,
    examinationsLoaded,
    setExaminationsLoaded,
    currentPage,
  };
}