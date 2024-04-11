'use client';

import { createContext, useState, useMemo } from "react";
import { ExaminationsContextType, ExaminationFilterList, ExaminationsQueryParams, EducationalLevel } from "../types/examinationTypes";


type SetFilterMessage = (value: string | null) => void;

const defaultValue: ExaminationsContextType = {
  examinations: [],
  setExaminations: () => {},
  navigationLinks: [],
  setNavigationLinks: () => {},
  dashboardDeletionMode: false,
  setDashboardDeletionMode: () => {},
  examinationToDelete: null,
  setExaminationToDelete: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  loaded: false,
  setLoaded: () => {},
  selectedOrder: 'asc',
  setSelectedOrder: () => {},
  filterList: [] as ExaminationFilterList[],
  setFilterList: () => {},
  filterMessage: null,
  setFilterMessage: (() => {}) as SetFilterMessage,
  queryParams: {} as ExaminationsQueryParams,
  setQueryParams: () => {},
  educationalLevels: [],
  setEducationalLevels: () => {},
  flashMessage: null,
  setFlashMessage: () => {},
};

export const ExaminationsContext = createContext<ExaminationsContextType>(defaultValue);

interface ExaminationsProviderProps {
  children: React.ReactNode;
}

export default function ExaminationsProvider({ children }: ExaminationsProviderProps) {
  const [examinations, setExaminations] = useState([]);
  const [navigationLinks, setNavigationLinks] = useState([]);
  const [dashboardDeletionMode, setDashboardDeletionMode] = useState(false);
  const [examinationToDelete, setExaminationToDelete] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('desc');
  const [filterList, setFilterList] = useState<ExaminationFilterList[]>([]);
  const [filterMessage, setFilterMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, _setQueryParams] = useState<ExaminationsQueryParams>({});
  const [educationalLevels, setEducationalLevels] = useState<EducationalLevel[]>([]);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  const value = useMemo(() =>{ 

    const setQueryParams = (filterList: ExaminationFilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) { // Verifique se filter.filter e filter.value não são null ou undefined
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    
      // const mergedQueryParams = {
      //   ...queryParams, // include existing queryParams
      //   ...newQueryParams, // include new queryParams
      // };
    }


    return { 
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks,
    dashboardDeletionMode,
    setDashboardDeletionMode,
    examinationToDelete,
    setExaminationToDelete,
    currentPage,
    setCurrentPage,
    loaded,
    setLoaded,
    selectedOrder,
    setSelectedOrder,
    filterList,
    setFilterList,
    filterMessage,
    setFilterMessage,
    queryParams,
    setQueryParams,
    educationalLevels,
    setEducationalLevels,
    flashMessage,
    setFlashMessage,
  }
  }, [
    examinations,
    navigationLinks,
    dashboardDeletionMode,
    examinationToDelete,
    currentPage,
    loaded,
    selectedOrder,
    filterList,
    filterMessage,
    queryParams,
    educationalLevels,
    flashMessage,
  ]);

  return (
    <ExaminationsContext.Provider value={value}>
      {children}
    </ExaminationsContext.Provider>
  );
}