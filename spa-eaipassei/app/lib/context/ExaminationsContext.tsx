'use client';

import { createContext, useState, useMemo } from "react";

export type ExaminationsContextType = {
  examinations: any[];
  setExaminations: (examinations: any) => void;
  navigationLinks: any[];
  setNavigationLinks: (navigationLinks: any) => void;
  dashboardDeletionMode: boolean;
  setDashboardDeletionMode: (dashboardDeletionMode: boolean) => void;
  examinationToDelete: number | null;
  setExaminationToDelete: (examinationToDelete: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
};

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
  }), [
    examinations,
    navigationLinks,
    dashboardDeletionMode,
    examinationToDelete,
    currentPage,
    loaded,
  ]);

  return (
    <ExaminationsContext.Provider value={value}>
      {children}
    </ExaminationsContext.Provider>
  );
}