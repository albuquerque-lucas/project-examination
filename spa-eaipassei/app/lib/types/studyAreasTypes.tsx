export type StudyArea = {
  id: number;
  title: string;
}

export type StudyAreaContextType = {
  studyAreas: StudyArea[];
  setStudyAreas: (studyAreas: StudyArea[]) => void;
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
}

export type StudyAreasQueryParams = {
  page?: number;
  order?: string;
};

export type StudyAreasFilterList = {
  filter?: string | null;
  value?: string | null;
};

export type StudyAreasFormRequest = {
  title: string;
}