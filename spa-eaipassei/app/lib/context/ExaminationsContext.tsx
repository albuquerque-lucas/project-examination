'use client';

import { createContext, useState, useMemo } from "react";
import { ExaminationsContextType, ExaminationFilterList } from "../types/examinationTypes";

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
  setFilterMessage: () => {},
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
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('asc');
  const [filterList, setFilterList] = useState<ExaminationFilterList[]>([]);
  const [filterMessage, setFilterMessage] = useState<string | null>(null);

  const value = useMemo(() => ({ 
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
  }), [
    examinations,
    navigationLinks,
    dashboardDeletionMode,
    examinationToDelete,
    currentPage,
    loaded,
    selectedOrder,
    filterList,
    filterMessage,
  ]);

  return (
    <ExaminationsContext.Provider value={value}>
      {children}
    </ExaminationsContext.Provider>
  );
}