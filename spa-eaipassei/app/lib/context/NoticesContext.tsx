'use client';

import { createContext, useState, useMemo } from "react";
import { NoticeContextType, Notice, NoticesQueryParams, NoticeFilterList } from "../types/noticeTypes";

const defaultValue: NoticeContextType = {
  notices: [],
  setNotices: () => {},
  filterList: [] as NoticeFilterList[],
  setFilterList: () => {},
  queryParams: {} as NoticesQueryParams,
  setQueryParams: () => {},
};

export const NoticesContext = createContext<NoticeContextType>(defaultValue);

interface NoticesProviderProps {
  children: React.ReactNode;
}

export default function NoticesProvider({ children }: NoticesProviderProps) {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filterList, setFilterList] = useState<NoticeFilterList[]>([]);
  const [queryParams, _setQueryParams] = useState<NoticesQueryParams>({});

  const value = useMemo(() => {

    const setQueryParams = (filterList: NoticeFilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }

    return {
      notices,
      setNotices,
      filterList,
      setFilterList,
      queryParams,
      setQueryParams,
    }
  }, [
    notices,
    filterList,
    queryParams,
  ]);

  return (
    <NoticesContext.Provider value={value}>
      {children}
    </NoticesContext.Provider>
  );
}