import { FlashMessage } from "./messageTypes";

export type Examination = {
  id?: number;
  educational_level_id: string;
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
  examinations: any[];
  setExaminations: (examinations: any) => void;
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