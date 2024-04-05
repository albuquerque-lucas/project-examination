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
  const value = useMemo(() => ({ 
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks,
    dashboardDeletionMode,
    setDashboardDeletionMode,
    examinationToDelete,
    setExaminationToDelete
  }), [
    examinations,
    navigationLinks,
    dashboardDeletionMode,
    examinationToDelete,
  ]);

  return (
    <ExaminationsContext.Provider value={value}>
      {children}
    </ExaminationsContext.Provider>
  );
}