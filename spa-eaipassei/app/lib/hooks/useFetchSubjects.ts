import { useState, useContext, useEffect } from "react";
import { Subject } from "../types/subjectTypes";
import { SubjectsContext } from "../context/SubjectsContext";
import { getAllSubjects } from "../api/subjectsAPI";

export const useFetchSubjects = () => {
  const [subjectsList, setSubjectsList] = useState({} as any);
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
          const subjectsList = await getAllSubjects(`${process.env.NEXT_PUBLIC_API_GET_SUBJECTS_LIST}`, queryParams);
          setSubjectsList(subjectsList);
          setSubjects(subjectsList.data);
          setSubjectsLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar as disciplinas', error);
        setSubjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, [subjectsLoaded]);

  return {
    subjects,
    subjectsList,
    isLoading,
    subjectsLoaded,
    currentPage,
  };
}