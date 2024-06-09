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
  setExams: (exams: PaginatedAPIResponse<Exam> | null) => void;
  examList: Exam[] | null;
  setExamList: (examList: Exam[] | null) => void;
  questions: PaginatedAPIResponse<ExamQuestion> | ExamQuestion[] | null;
  setQuestions: (questions: PaginatedAPIResponse<ExamQuestion> | ExamQuestion[] | null) => void;
  questionList: ExamQuestion[] | null;
  setQuestionList: (questionList: ExamQuestion[] | null) => void;
  exam: Exam | null;
  setExam: (exam: Exam | null) => void;
  navLinks: NavigationLink[] | null;
  setNavLinks: (navLinks: NavigationLink[] | null) => void;
  questionsNavLinks: NavigationLink[] | null;
  setQuestionsNavLinks: (questionNavLinks: NavigationLink[] | null) => void;
  examDeletionMode: boolean;
  setExamDeletionMode: (examDeletionMode: boolean) => void;
  examToDelete: number | null;
  setExamToDelete: (examToDelete: number | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  questionsCurrentPage: number;
  setQuestionsCurrentPage: (page: number) => void;
  selectedOrder: string | null;
  setSelectedOrder: (order: string | null) => void;
  filterList: FilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<FilterList[]>>;
  filterMessage: string | null;
  setFilterMessage: (message: string | null) => void;
  queryParams: ExamQueryParams;
  setQueryParams: (filterList: FilterList[]) => void;
  flashMessage: FlashMessage | null;
  setFlashMessage: (message: FlashMessage | null) => void;
  dataLoaded: boolean;
  setDataLoaded: (dataLoaded: boolean) => void;
};

export const defaultExamContextValue: ExamContext = {
  exams: null,
  setExams: () => {},
  examList: null,
  setExamList: () => {},
  questions: null,
  setQuestions: () => {},
  questionList: null,
  setQuestionList: () => {},
  exam: null,
  setExam: () => {},
  navLinks: null,
  setNavLinks: () => {},
  questionsNavLinks: null,
  setQuestionsNavLinks: () => {},
  examDeletionMode: false,
  setExamDeletionMode: () => {},
  examToDelete: null,
  setExamToDelete: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  questionsCurrentPage: 1,
  setQuestionsCurrentPage: () => {},
  selectedOrder: 'desc',
  setSelectedOrder: () => {},
  filterList: [] as FilterList[],
  setFilterList: () => {},
  filterMessage: null,
  setFilterMessage: () => {},
  queryParams: {} as ExamQueryParams,
  setQueryParams: () => {},
  flashMessage: null,
  setFlashMessage: () => {},
  dataLoaded: false,
  setDataLoaded: () => {},
};
