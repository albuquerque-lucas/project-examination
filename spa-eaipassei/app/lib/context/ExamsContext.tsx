'use client';

import { createContext, useMemo, useState } from "react";
import { defaultValue, FilterList, NavigationLink, PaginatedAPIResponse } from "../types/entityContextTypes";
import { Exam, ExamQueryParams, ExamQuestion, ExamContext, defaultExamContextValue } from "../types/examTypes";
import { FlashMessage } from "../types/messageTypes";

export const ExamsContext = createContext<ExamContext>(defaultExamContextValue);

interface ExamsProviderProps {
  children: React.ReactNode;
}

export default function ExamsProvider({ children }: ExamsProviderProps) {
  const [exams, setExams] = useState<PaginatedAPIResponse<Exam> | null>(defaultExamContextValue.exams);
  const [examList, setExamList] = useState<Exam[] | null>(defaultExamContextValue.examList);
  const [questions, setQuestions] = useState<PaginatedAPIResponse<ExamQuestion> | ExamQuestion[] | null>(defaultExamContextValue.questions);
  const [questionList, setQuestionList] = useState<ExamQuestion[] | null>(defaultExamContextValue.questionList);
  const [exam, setExam] = useState<Exam | null>(defaultExamContextValue.exam);
  const [navLinks, setNavLinks] = useState<NavigationLink[] | null>(defaultExamContextValue.navLinks);
  const [questionsNavLinks, setQuestionsNavLinks] = useState<NavigationLink[] | null>(defaultExamContextValue.questionsNavLinks);
  const [examDeletionMode, setExamDeletionMode] = useState<boolean>(defaultExamContextValue.examDeletionMode);
  const [examToDelete, setExamToDelete] = useState<number | null>(defaultExamContextValue.examToDelete);
  const [currentPage, setCurrentPage] = useState<number>(defaultExamContextValue.currentPage);
  const [questionsCurrentPage, setQuestionsCurrentPage] = useState<number>(defaultExamContextValue.questionsCurrentPage);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(defaultExamContextValue.selectedOrder);
  const [filterList, setFilterList] = useState<FilterList[]>(defaultExamContextValue.filterList);
  const [filterMessage, setFilterMessage] = useState<string | null>(defaultExamContextValue.filterMessage);
  const [queryParams, _setQueryParams] = useState<ExamQueryParams>(defaultExamContextValue.queryParams);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(defaultExamContextValue.flashMessage);
  const [dataLoaded, setDataLoaded] = useState<boolean>(defaultExamContextValue.dataLoaded);

  const value = useMemo(() => {
    const setQueryParams = (filterList: FilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }

    return {
      exams,
      setExams,
      examList,
      setExamList,
      questions,
      setQuestions,
      questionList,
      setQuestionList,
      exam,
      setExam,
      navLinks,
      setNavLinks,
      questionsNavLinks,
      setQuestionsNavLinks,
      examDeletionMode,
      setExamDeletionMode,
      examToDelete,
      setExamToDelete,
      currentPage,
      setCurrentPage,
      questionsCurrentPage,
      setQuestionsCurrentPage,
      selectedOrder,
      setSelectedOrder,
      filterList,
      setFilterList,
      filterMessage,
      setFilterMessage,
      queryParams,
      setQueryParams,
      flashMessage,
      setFlashMessage,
      dataLoaded,
      setDataLoaded,
    };
  }, [
    exams,
    examList,
    questions,
    questionList,
    exam,
    navLinks,
    questionsNavLinks,
    examDeletionMode,
    examToDelete,
    currentPage,
    questionsCurrentPage,
    selectedOrder,
    filterList,
    filterMessage,
    queryParams,
    flashMessage,
    dataLoaded,
  ]);

  return (
    <ExamsContext.Provider value={value}>
      {children}
    </ExamsContext.Provider>
  );
}
