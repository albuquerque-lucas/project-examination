import { useState, useContext, useEffect } from "react";
import { SubjectsContext } from "../context/SubjectsContext";
import { getAllSubjects } from "../api/subjectsAPI";

export const useFetchSubjects = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    subjects,
    setSubjects,
    queryParams,
    subjectsLoaded,
    setSubjectsLoaded,
    currentPage,
  } = useContext(SubjectsContext);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        if (!subjectsLoaded) {
          setIsLoading(true);
          const apiResponse = await getAllSubjects(`${process.env.NEXT_PUBLIC_API_GET_SUBJECTS_LIST}`, queryParams);
          setSubjects(apiResponse);
          setSubjectsLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar as disciplinas', error);
        setSubjects(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [subjectsLoaded]);

  return {
    subjects,
    isLoading,
    subjectsLoaded,
    currentPage,
    setSubjectsLoaded,
  };
}