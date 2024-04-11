export type Notice = {
  id: number;
  file: string;
  extension: string;
  file_name?: string;
  publication_date?: string;
};

export type NoticeContextType = {
  notices: Notice[];
  setNotices: (notices: Notice[]) => void;
  filterList: NoticeFilterList[];
  setFilterList: React.Dispatch<React.SetStateAction<NoticeFilterList[]>>;
  queryParams: NoticesQueryParams;
  setQueryParams: (filterList: NoticeFilterList[]) => void;
};

export type NoticesQueryParams = {
  page?: number;
  order?: string;
};

export type NoticeFilterList = {
  filter?: string | null;
  value?: string | null;
};