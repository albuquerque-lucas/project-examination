'use client';

import { createContext, useState, useMemo } from "react";
import {
  StudyAreaContextType,
  StudyArea,
  StudyAreasQueryParams,
  StudyAreasFilterList,
} from "../types/studyAreasTypes";
import { FlashMessage } from "../types/messageTypes";
import { PaginatedAPIResponse, NavigationLink } from "../types/entityContextTypes";

const defaultValue: StudyAreaContextType = {
  studyAreas: null,
  setStudyAreas: () => {},
  notPaginatedStudyAreas: null,
  setNotPaginatedStudyAreas: () => {},
  studyAreasNavLinks: null,
  setStudyAreasNavLinks: () => {},
  queryParams: {} as StudyAreasQueryParams,
  setQueryParams: () => {},
  filterList: [] as StudyAreasFilterList[],
  setFilterList: () => {},
  studyAreasLoaded: false,
  setStudyAreasLoaded: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  creationMode: false,
  setCreationMode: () => {},
  studyAreaDeletionMode: false,
  setStudyAreaDeletionMode: () => {},
  studyAreaDeletionList: [],
  setStudyAreaDeletionList: () => {},
  studyAreasMessage: null,
  setStudyAreasMessage: () => {},
};

export const StudyAreasContext = createContext<StudyAreaContextType>(defaultValue);

interface StudyAreasProviderProps {
  children: React.ReactNode;
}

export default function StudyAreasProvider({ children }: StudyAreasProviderProps) {
  const [studyAreas, setStudyAreas] = useState<PaginatedAPIResponse<StudyArea> | null>(null);
  const [notPaginatedStudyAreas, setNotPaginatedStudyAreas] = useState<StudyArea[] | null>(null); // [1
  const [studyAreasNavLinks, setStudyAreasNavLinks] = useState<NavigationLink[] | null>(null);
  const [queryParams, _setQueryParams] = useState<StudyAreasQueryParams>({});
  const [filterList, setFilterList] = useState<StudyAreasFilterList[]>([]);
  const [studyAreasLoaded, setStudyAreasLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [creationMode, setCreationMode] = useState(false);
  const [studyAreaDeletionMode, setStudyAreaDeletionMode] = useState(false);
  const [studyAreaDeletionList, setStudyAreaDeletionList] = useState<number[]>([]);
  const [studyAreasMessage, setStudyAreasMessage] = useState<FlashMessage | null>(null);

  const value = useMemo(() => {
    const setQueryParams = (filterList: StudyAreasFilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }
    return {
      studyAreas,
      setStudyAreas,
      studyAreasNavLinks,
      setStudyAreasNavLinks,
      queryParams,
      setQueryParams,
      filterList,
      setFilterList,
      studyAreasLoaded,
      setStudyAreasLoaded,
      currentPage,
      setCurrentPage,
      creationMode,
      setCreationMode,
      studyAreaDeletionMode,
      setStudyAreaDeletionMode,
      studyAreaDeletionList,
      setStudyAreaDeletionList,
      studyAreasMessage,
      setStudyAreasMessage,
      notPaginatedStudyAreas,
      setNotPaginatedStudyAreas,
    }
  }, [
    studyAreas,
    studyAreasNavLinks,
    queryParams,
    filterList,
    studyAreasLoaded,
    currentPage,
    creationMode,
    studyAreaDeletionMode,
    studyAreaDeletionList,
    studyAreasMessage,
    notPaginatedStudyAreas,
  ]);

  return (
    <StudyAreasContext.Provider value={value}>
      {children}
    </StudyAreasContext.Provider>
  );
}