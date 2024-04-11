import { useState, useEffect, useContext } from 'react';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import { NavigationContext } from '../context/NavigationContext';
import { getExaminationsByPage } from '@/app/lib/api/examinationsAPI';

export const useFetchExaminations = () => {
  const [examinationList, setExaminationList] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setExaminations,
    queryParams,
    examinationsLoaded,
    setExaminationsLoaded
  } = useContext(ExaminationsContext);

  useEffect(() => {
    const fetchExaminations = async () => {
      try {
        if (!examinationsLoaded) {
          setIsLoading(true);
          const examinationList = await getExaminationsByPage(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`, queryParams);
          setExaminationList(examinationList);
          setExaminations(examinationList.data);
          setExaminationsLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os concursos', error);
        setExaminations({});
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExaminations();
  }, [examinationsLoaded]);

  return {
    examinationList,
    isLoading,
    examinationsLoaded,
  };
}