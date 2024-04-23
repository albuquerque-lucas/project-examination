import { useState, useContext, useEffect } from "react";
import { getAllAreas } from "../api/StudyAreasAPI";
import { StudyAreasContext } from "../context/StudyAreasContext";
import { StudyArea } from "../types/studyAreasTypes";

export const useFetchStudyAreas = () => {
  const [studyAreasList, setStudyAreasList] = useState<StudyArea[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    studyAreas,
    setStudyAreas,
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
          const fetchedStudyAreasList = await getAllAreas(`${process.env.NEXT_PUBLIC_API_GET_STUDY_AREAS_LIST}`, queryParams);
          console.log('RESPONSE HOOK', fetchedStudyAreasList);
            setStudyAreasList(fetchedStudyAreasList);
            setStudyAreas(fetchedStudyAreasList);
            setStudyAreasLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar as areas', error);
        setStudyAreas([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudyAreas();
  }, [studyAreasLoaded]);

  return {
    studyAreas,
    studyAreasList,
    isLoading,
    studyAreasLoaded,
    currentPage,
    queryParams,
  };
}