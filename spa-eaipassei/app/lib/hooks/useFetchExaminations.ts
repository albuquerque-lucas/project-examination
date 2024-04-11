
import { useState, useEffect, useContext } from 'react';
import { getExaminationsByPage } from '@/app/lib/api/examinationsAPI';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import { NavigationContext } from '../context/NavigationContext';

export const useFetchExaminations = () => {
  const [examinationList, setExaminationList] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const { setExaminations, queryParams } = useContext(ExaminationsContext);
  const { loaded, setLoaded } = useContext(NavigationContext);

  useEffect(() => {
    const fetchExaminations = async () => {
      try {
        if (!loaded) {
          setIsLoading(true);
          const examinationList = await getExaminationsByPage(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}`, queryParams);
          setExaminationList(examinationList);
          setExaminations(examinationList.data);
          setLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os concursos', error);
        setExaminations({});
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExaminations();
  }, [loaded]);

  return {
    examinationList,
    isLoading,
    loaded,
  };
}