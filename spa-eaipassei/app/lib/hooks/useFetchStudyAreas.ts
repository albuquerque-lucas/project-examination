import { useState, useContext, useEffect } from "react";
import { getAllAreas } from "../api/StudyAreasAPI";
import { StudyAreasContext } from "../context/StudyAreasContext";
import { StudyArea } from "../types/studyAreasTypes";

export const useFetchStudyAreas = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    studyAreas,
    setStudyAreas,
    notPaginatedStudyAreas,
    setNotPaginatedStudyAreas,
    queryParams,
    studyAreasLoaded,
    setStudyAreasLoaded,
    currentPage,
  } = useContext(StudyAreasContext);

  useEffect(() => {
    const fetchStudyAreas = async () => {
      try {
        if (!studyAreasLoaded) {
          setIsLoading(true);
          const [fetchedStudyAreasList, fetchedNotPaginatedAreasList] = await Promise.all([
            getAllAreas(`${process.env.NEXT_PUBLIC_API_GET_STUDY_AREAS_LIST}`, queryParams),
            getAllAreas(`${process.env.NEXT_PUBLIC_API_GET_STUDY_AREAS_LIST}`, { order: 'asc', pagination: false})
          ]);
          setStudyAreas(fetchedStudyAreasList);
          setNotPaginatedStudyAreas(fetchedNotPaginatedAreasList);
          setStudyAreasLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar as areas', error);
        setStudyAreas(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchStudyAreas();
  }, [studyAreasLoaded]);

  return {
    studyAreas,
    isLoading,
    studyAreasLoaded,
    setStudyAreasLoaded,
    currentPage,
    queryParams,
    notPaginatedStudyAreas,
  };
}