export type Subject = {
  id: number;
  title: string;
  study_area?: string;
  educational_level?: string;
}

export type SubjectContextType = {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
  queryParams: SubjectsQueryParams;
  setQueryParams: (filterList: SubjectsFilterList[]) => void;
  filterList: SubjectsFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<SubjectsFilterList[]>>;
  subjectsLoaded: boolean;
  setSubjectsLoaded: (subjectsLoaded: boolean) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  creationMode: boolean;
  setCreationMode: (creationMode: boolean) => void;
  subjectDeletionMode: boolean;
  setSubjectDeletionMode: (subjectDeletionMode: boolean) => void;
  subjectDeletionList: number[];
  setSubjectDeletionList: (subjectDeletionList: number[]) => void;
}

export type SubjectsQueryParams = {
  page?: number;
  order?: string;
};

export type SubjectsFilterList = {
  filter?: string | null;
  value?: string | null;
};

export type SubjectsFormRequest = {
  title: string;
  educational_level_id: number;
  study_area_id: number;

}