'use client';

import { createContext, useState, useMemo } from "react";
import {
  SubjectContextType,
  Subject,
  SubjectsQueryParams,
  SubjectsFilterList
} from "../types/subjectTypes";
import { PaginatedAPIResponse, NavigationLink } from "../types/entityContextTypes";
import { FlashMessage } from "../types/messageTypes";

const defaultValue: SubjectContextType = {
  subjects: null,
  setSubjects: () => {},
  subjectsNavLinks: null,
  setSubjectsNavLinks: () => {},
  queryParams: {} as SubjectsQueryParams,
  setQueryParams: () => {},
  filterList: [] as SubjectsFilterList[],
  setFilterList: () => {},
  subjectsLoaded: false,
  setSubjectsLoaded: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  creationMode: false,
  setCreationMode: () => {},
  subjectDeletionMode: false,
  setSubjectDeletionMode: () => {},
  subjectDeletionList: [],
  setSubjectDeletionList: () => {},
  subjectsMessage: null,
  setSubjectsMessage: () => {},

};

export const SubjectsContext = createContext<SubjectContextType>(defaultValue);

interface SubjectsProviderProps {
  children: React.ReactNode;
}

export default function SubjectsProvider({ children }: SubjectsProviderProps) {
  const [subjects, setSubjects] = useState<PaginatedAPIResponse<Subject> | null>(null);
  const [subjectsNavLinks, setSubjectsNavLinks] = useState<NavigationLink[] | null>(null); // [1
  const [queryParams, _setQueryParams] = useState<SubjectsQueryParams>({});
  const [filterList, setFilterList] = useState<SubjectsFilterList[]>([]);
  const [subjectsLoaded, setSubjectsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [creationMode, setCreationMode] = useState(false);
  const [subjectDeletionMode, setSubjectDeletionMode] = useState(false);
  const [subjectDeletionList, setSubjectDeletionList] = useState<number[]>([]);
  const [subjectsMessage, setSubjectsMessage] = useState<FlashMessage | null>(null);

  const value = useMemo(() => {

    const setQueryParams = (filterList: SubjectsFilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }

    return {
      subjects,
      setSubjects,
      subjectsNavLinks,
      setSubjectsNavLinks,
      queryParams,
      setQueryParams,
      filterList,
      setFilterList,
      subjectsLoaded,
      setSubjectsLoaded,
      currentPage,
      setCurrentPage,
      creationMode,
      setCreationMode,
      subjectDeletionMode,
      setSubjectDeletionMode,
      subjectDeletionList,
      setSubjectDeletionList,
      subjectsMessage,
      setSubjectsMessage,

    }
    }, [
      subjects,
      queryParams,
      subjectsNavLinks,
      filterList,
      subjectsLoaded,
      currentPage,
      creationMode,
      subjectDeletionMode,
      subjectDeletionList,
      subjectsMessage,

    ]);

  return (
    <SubjectsContext.Provider value={value}>
      {children}
    </SubjectsContext.Provider>
  );
}