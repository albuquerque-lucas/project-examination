import { PaginatedAPIResponse } from "./entityContextTypes";
import { NavigationLink } from "./entityContextTypes";
import { FlashMessage } from "./messageTypes";
import { FilterList } from "./entityContextTypes";
import { Subject } from "./subjectTypes";

export type Exam = {
  id: number;
  examination_id: number | null;
  title: string;
  description?: string | null;
  date?: string | null;
  examination?: string | null;
  questions_count?: number | null;
  subjects?: Subject[];
}

export type ExamUpdateRequest = {
  id: number;
  title?: string | null;
  description?: string | null;
  date?: string | null;
  subjects?: Subject[];
}

export type ExamQueryParams = {
  examination_id?: number;
  title?: string;
  page?: number;
  order?: string;
  search?: string;
}

export type ExamQuestion = {
  id?: number;
  exam_id?: number;
  subject_id?: number;
  topic_id?: number;
  statement?: string;
  alternatives?: QuestionAlternative[];
  question_number?: number;
}

export type QuestionAlternative = {
  letter: string;
  text: string;
  is_answer: boolean;
};


export type ExamContext = {
  exams: PaginatedAPIResponse<Exam> | null;
  setExams: (value: PaginatedAPIResponse<Exam>) => void;
  examList: Exam[] | null;
  setExamList: (value: Exam[]) => void;
  questions: PaginatedAPIResponse<ExamQuestion> | null;
  setQuestions: (value: PaginatedAPIResponse<ExamQuestion>) => void;
  questionList: ExamQuestion[] | null;
  setQuestionList: (value: ExamQuestion[]) => void;
  exam: Exam | null;
  setExam: (value: Exam) => void;
  navLinks: NavigationLink[] | null;
  setNavLinks: (value: NavigationLink[]) => void;
  secondaryNavLinks: NavigationLink[] | null;
  setSecondaryNavLinks: (value: NavigationLink[]) => void;
  examDeletionMode: boolean;
  setExamDeletionMode: (value: boolean) => void;
  examToDelete: number | null;
  setExamToDelete: (value: number) => void;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  selectedOrder: string;
  setSelectedOrder: (value: string) => void;
  filterList: FilterList[];
  setFilterList: (value: FilterList[]) => void;
  filterMessage: string | null;
  setFilterMessage: (value: string | null) => void;
  queryParams: ExamQueryParams;
  setQueryParams: (value: ExamQueryParams) => void;
  flashMessage: FlashMessage | null;
  setFlashMessage: (value: FlashMessage | null) => void;
  dataLoaded: boolean;
  setDataLoaded: (value: boolean) => void;
};