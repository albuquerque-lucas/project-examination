import { useState, useContext, useEffect } from "react";
import { getAllEducationalLevels } from "../api/educationalLevelsAPI";
import { EducationalLevelsContext } from "../context/EducationalLevelsContext";
import { EducationalLevel } from "../types/examinationTypes";

export const useFetchEducationalLevels = () => {
  const [educationalLevelsList, setEducationalLevelsList] = useState<EducationalLevel[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    educationalLevels,
    setEducationalLevels,
    queryParams,
    educationalLevelsLoaded,
    setEducationalLevelsLoaded,
    currentPage,
  } = useContext(EducationalLevelsContext);

  useEffect(() => {
    const fetchEducationalLevels = async () => {
      try {
        if (!educationalLevelsLoaded) {
          setIsLoading(true);
          const fetchedEducationalLevelsList = await getAllEducationalLevels(`${process.env.NEXT_PUBLIC_API_GET_EDUCATIONAL_LEVELS_LIST}`, queryParams);
            setEducationalLevelsList(fetchedEducationalLevelsList);
            setEducationalLevels(fetchedEducationalLevelsList);
            setEducationalLevelsLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os níveis educacionais', error);
        setEducationalLevels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEducationalLevels();
  }, [educationalLevelsLoaded]);

  return {
    educationalLevels,
    educationalLevelsList,
    isLoading,
    educationalLevelsLoaded,
    currentPage,
    queryParams,
  };
}