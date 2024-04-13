export type Notice = {
  id: number;
  file_path: string;
  extension: string;
  file_name?: string;
  publication_date?: string;
  examination?: NoticeExamination;
};

export type NoticeFormRequest = {
  examination_id: number;
  notice_file: File,
  file_name: string;
  extension: string;
};

export type NoticeContextType = {
  notices: Notice[];
  setNotices: (notices: Notice[]) => void;
  filterList: NoticeFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<NoticeFilterList[]>>;
  queryParams: NoticesQueryParams;
  setQueryParams: (filterList: NoticeFilterList[]) => void;
  noticesLoaded: boolean;
  setNoticesLoaded: (noticesLoaded: boolean) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
};

export type NoticesQueryParams = {
  page?: number;
  order?: string;
};

export type NoticeFilterList = {
  filter?: string | null;
  value?: string | null;
};

export type NoticeExamination = {
  id: number;
  title: string;
  institution: string;
};