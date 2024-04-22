export type EducationalLevel = {
  id: number;
  name: string;
}

export type EducationalLevelContextType = {
  educationalLevels: EducationalLevel[];
  setEducationalLevels: (educationalLevels: EducationalLevel[]) => void;
  queryParams: EducationalLevelsQueryParams;
  setQueryParams: (filterList: EducationalLevelsFilterList[]) => void;
  filterList: EducationalLevelsFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<EducationalLevelsFilterList[]>>;
  educationalLevelsLoaded: boolean;
  setEducationalLevelsLoaded: (educationalLevelsLoaded: boolean) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  creationMode: boolean;
  setCreationMode: (creationMode: boolean) => void;
  educationalLevelDeletionMode: boolean;
  setEducationalLevelDeletionMode: (educationalLevelDeletionMode: boolean) => void;
  educationalLevelDeletionList: number[];
  setEducationalLevelDeletionList: (educationalLevelDeletionList: number[]) => void;
}

export type EducationalLevelsQueryParams = {
  page?: number;
  order?: string;
};

export type EducationalLevelsFilterList = {
  filter?: string | null;
  value?: string | null;
};

export type EducationalLevelsFormRequest = {
  name: string;
}