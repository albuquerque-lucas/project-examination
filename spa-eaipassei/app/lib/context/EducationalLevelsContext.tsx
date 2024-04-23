import { createContext, useState, useMemo } from "react";
import {
  EducationalLevelContextType,
  EducationalLevel,
  EducationalLevelsQueryParams,
  EducationalLevelsFilterList,
} from "../types/educationalLevelTypes";

const defaultValue: EducationalLevelContextType = {
  educationalLevels: [],
  setEducationalLevels: () => {},
  queryParams: {} as EducationalLevelsQueryParams,
  setQueryParams: () => {},
  filterList: [] as EducationalLevelsFilterList[],
  setFilterList: () => {},
  educationalLevelsLoaded: false,
  setEducationalLevelsLoaded: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  creationMode: false,
  setCreationMode: () => {},
  educationalLevelDeletionMode: false,
  setEducationalLevelDeletionMode: () => {},
  educationalLevelDeletionList: [],
  setEducationalLevelDeletionList: () => {},
};

export const EducationalLevelsContext = createContext<EducationalLevelContextType>(defaultValue);

interface EducationalLevelsProviderProps {
  children: React.ReactNode;
}

export default function EducationalLevelsProvider({ children }: EducationalLevelsProviderProps) {
  const [educationalLevels, setEducationalLevels] = useState<EducationalLevel[]>([]);
  const [queryParams, _setQueryParams] = useState<EducationalLevelsQueryParams>({});
  const [filterList, setFilterList] = useState<EducationalLevelsFilterList[]>([]);
  const [educationalLevelsLoaded, setEducationalLevelsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [creationMode, setCreationMode] = useState(false);
  const [educationalLevelDeletionMode, setEducationalLevelDeletionMode] = useState(false);
  const [educationalLevelDeletionList, setEducationalLevelDeletionList] = useState<number[]>([]);

  const value = useMemo(() => {
    const setQueryParams = (filterList: EducationalLevelsFilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }
    return {
      educationalLevels,
      setEducationalLevels,
      queryParams,
      setQueryParams,
      filterList,
      setFilterList,
      educationalLevelsLoaded,
      setEducationalLevelsLoaded,
      currentPage,
      setCurrentPage,
      creationMode,
      setCreationMode,
      educationalLevelDeletionMode,
      setEducationalLevelDeletionMode,
      educationalLevelDeletionList,
      setEducationalLevelDeletionList,
    };
  }, [
    educationalLevels,
    queryParams,
    filterList,
    educationalLevelsLoaded,
    currentPage,
    creationMode,
    educationalLevelDeletionMode,
    educationalLevelDeletionList,
  ]);

  return (
    <EducationalLevelsContext.Provider value={value}>
      {children}
    </EducationalLevelsContext.Provider>
  );
}