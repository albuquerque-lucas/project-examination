'use client';

import { createContext, useState, useMemo } from "react";
import {
  Examination,
  ExaminationsContextType,
  ExaminationFilterList,
  ExaminationsQueryParams,
  EducationalLevel,
} from "../types/examinationTypes";
import { PaginatedAPIResponse, NavigationLink } from "../types/entityContextTypes";
import { FlashMessage } from "../types/messageTypes";


type SetFilterMessage = (value: string | null) => void;

const defaultValue: ExaminationsContextType = {
  examinations: null,
  setExaminations: () => {},
  examinationNavLinks: null,
  setExaminationNavLinks: () => {},
  dashboardDeletionMode: false,
  setDashboardDeletionMode: () => {},
  examinationToDelete: null,
  setExaminationToDelete: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
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
  examinationsLoaded: false,
  setExaminationsLoaded: () => {},
};

export const ExaminationsContext = createContext<ExaminationsContextType>(defaultValue);

interface ExaminationsProviderProps {
  children: React.ReactNode;
}

export default function ExaminationsProvider({ children }: ExaminationsProviderProps) {
  const [examinations, setExaminations] = useState<PaginatedAPIResponse<Examination> | null>(null);
  const [examinationNavLinks, setExaminationNavLinks] = useState<NavigationLink[] | null>(null);
  const [dashboardDeletionMode, setDashboardDeletionMode] = useState(false);
  const [examinationToDelete, setExaminationToDelete] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState('desc');
  const [filterList, setFilterList] = useState<ExaminationFilterList[]>([]);
  const [filterMessage, setFilterMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, _setQueryParams] = useState<ExaminationsQueryParams>({});
  const [educationalLevels, setEducationalLevels] = useState<EducationalLevel[]>([]);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [examinationsLoaded, setExaminationsLoaded] = useState(false);

  const value = useMemo(() =>{ 

    const setQueryParams = (filterList: ExaminationFilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }


    return { 
    examinations,
    setExaminations,
    examinationNavLinks,
    setExaminationNavLinks,
    dashboardDeletionMode,
    setDashboardDeletionMode,
    examinationToDelete,
    setExaminationToDelete,
    currentPage,
    setCurrentPage,
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
    examinationsLoaded,
    setExaminationsLoaded,
  }
  }, [
    examinations,
    examinationNavLinks,
    dashboardDeletionMode,
    examinationToDelete,
    currentPage,
    selectedOrder,
    filterList,
    filterMessage,
    queryParams,
    educationalLevels,
    flashMessage,
    examinationsLoaded,
    setExaminationsLoaded,
  ]);

  return (
    <ExaminationsContext.Provider value={value}>
      {children}
    </ExaminationsContext.Provider>
  );
}