import { FlashMessage } from "./messageTypes";
import { PaginatedAPIResponse, NavigationLink } from "./entityContextTypes";

export type Examination = {
  id?: number | string;
  educational_level_id: string;
  educational_level?: string;
  title: string;
  institution: string;
  active?: boolean;
  notice?: File | null;
};

export type DetailedExamination = {
  id: number;
  title: string;
  institution: string;
  educational_level: string;
  active: boolean;
  exams_count: number;
  exams_start_date: string;
  exams_end_date: string;
  registration_start_date: string;
  registration_end_date: string;
  study_areas: Array<{ id: number; area: string }>;
  exam_list: Array<any>;
}

export type ExaminationUpdateRequest = {
  id: number | string;
  educational_level_id?: string;
  title?: string;
  institution?: string;
  active?: boolean;
  notice?: File | null;
}

export type EducationalLevel = {
  id: number;
  name: string;
};

export type ExaminationsContextType = {
  examinations: PaginatedAPIResponse<Examination> | null;
  setExaminations: (examinations: PaginatedAPIResponse<Examination> | null) => void;
  examinationNavLinks: NavigationLink[] | null;
  setExaminationNavLinks: (examinationNavLinks: NavigationLink[] | null) => void;
  dashboardDeletionMode: boolean;
  setDashboardDeletionMode: (dashboardDeletionMode: boolean) => void;
  examinationToDelete: number | null;
  setExaminationToDelete: (examinationToDelete: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  selectedOrder: string | null;
  setSelectedOrder: (selectedOrder: string) => void;
  filterList: ExaminationFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<ExaminationFilterList[]>>;
  filterMessage: string | null;
  setFilterMessage: (filterMessage: string) => void;
  queryParams: ExaminationsQueryParams;
  setQueryParams: (filterList: ExaminationFilterList[]) => void;
  educationalLevels: EducationalLevel[];
  setEducationalLevels: (educationalLevels: EducationalLevel[]) => void;
  flashMessage: FlashMessage | null;
  setFlashMessage: (flashMessage: FlashMessage | null) => void;
  examinationsLoaded: boolean;
  setExaminationsLoaded: (examinationsLoaded: boolean) => void;
};

export type ExaminationFilterList = {
  filter?: string | null;
  value?: string | null;
};

export type ExaminationsQueryParams = {
  educational_level_id?: string;
  title?: string;
  active?: boolean;
  institution?: string;
  page?: number;
  order?: string;
};