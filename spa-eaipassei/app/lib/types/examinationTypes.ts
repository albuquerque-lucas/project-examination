import { FlashMessage } from "./messageTypes";
import { PaginatedAPIResponse, NavigationLink } from "./responseTypes";

export type Examination = {
  id?: number | string;
  educational_level_id: string;
  educational_level?: string;
  title: string;
  institution: string;
  active?: boolean;
  notice?: File | null;
};

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