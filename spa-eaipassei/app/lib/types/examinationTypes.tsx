export type Examination = {
  educational_level_id: string;
  title: string;
  active?: boolean;
  institution: string;
  registration_start_date?: string;
  registration_end_date?: string;
  exams_start_date?: string;
  exams_end_date?: string;
};

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
  selectedOrder: string | null;
  setSelectedOrder: (selectedOrder: string) => void;
  filterList: ExaminationFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<ExaminationFilterList[]>>;
  filterMessage: string | null;
  setFilterMessage: (filterMessage: string) => void;
  queryParams: ExaminationsQueryParams;
  setQueryParams: (filterList: ExaminationFilterList[]) => void;
};

export type ExaminationFilterList = {
  filter: string;
  value: string;
};

export type ExaminationsQueryParams = {
  educational_level_id?: string;
  title?: string;
  active?: boolean;
  institution?: string;
  page?: number;
  order?: string;
};