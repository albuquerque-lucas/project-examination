'use client';

import { createContext, useState, useMemo } from "react";

export type ExaminationsContextType = {
  examinations: any[];
  setExaminations: (examinations: any) => void;
  navigationLinks: any[];
  setNavigationLinks: (navigationLinks: any) => void;
};

const defaultValue: ExaminationsContextType = {
  examinations: [],
  setExaminations: () => {},
  navigationLinks: [],
  setNavigationLinks: () => {},
};

export const ExaminationsContext = createContext<ExaminationsContextType>(defaultValue);

interface ExaminationsProviderProps {
  children: React.ReactNode;
}

export default function ExaminationsProvider({ children }: ExaminationsProviderProps) {
  const [examinations, setExaminations] = useState([]);
  const [navigationLinks, setNavigationLinks] = useState([]);
  const value = useMemo(() => ({ 
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks
  }), [
    examinations,
    navigationLinks,
  ]);

  return (
    <ExaminationsContext.Provider value={value}>
      {children}
    </ExaminationsContext.Provider>
  );
}