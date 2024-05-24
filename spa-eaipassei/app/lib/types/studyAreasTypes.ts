import { Subject } from "./subjectTypes";
import { FlashMessage } from "./messageTypes";
import { PaginatedAPIResponse, NavigationLink } from "./entityContextTypes";

export type StudyArea = {
  id: number;
  area: string;
  subjects?: Subject[];
}

export type StudyAreaContextType = {
  studyAreas: PaginatedAPIResponse<StudyArea> | null;
  setStudyAreas: (studyAreas: PaginatedAPIResponse<StudyArea> | null) => void;
  notPaginatedStudyAreas: StudyArea[] | null;
  setNotPaginatedStudyAreas: (notPaginatedStudyAreas: StudyArea[] | null) => void;
  studyAreasNavLinks: NavigationLink[] | null;
  setStudyAreasNavLinks: (studyAreasNavLinks: NavigationLink[] | null) => void;
  queryParams: StudyAreasQueryParams;
  setQueryParams: (filterList: StudyAreasFilterList[]) => void;
  filterList: StudyAreasFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<StudyAreasFilterList[]>>;
  studyAreasLoaded: boolean;
  setStudyAreasLoaded: (studyAreasLoaded: boolean) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  creationMode: boolean;
  setCreationMode: (creationMode: boolean) => void;
  studyAreaDeletionMode: boolean;
  setStudyAreaDeletionMode: (studyAreaDeletionMode: boolean) => void;
  studyAreaDeletionList: number[];
  setStudyAreaDeletionList: (studyAreaDeletionList: number[]) => void;
  studyAreasMessage: FlashMessage | null;
  setStudyAreasMessage: (studyAreasMessage: FlashMessage | null) => void;
}

export type StudyAreasQueryParams = {
  page?: number;
  order?: string;
  pagination?: boolean;
};

export type StudyAreasFilterList = {
  filter?: string | null;
  value?: string | null;
};

export type StudyAreasFormRequest = {
  area: string;
}