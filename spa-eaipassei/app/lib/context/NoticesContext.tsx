'use client';

import { createContext, useState, useMemo } from "react";
import { NoticeContextType, Notice, NoticesQueryParams, NoticeFilterList } from "../types/noticeTypes";
import { PaginatedAPIResponse, NavigationLink } from "../types/entityContextTypes";
import { FlashMessage } from "../types/messageTypes";

const defaultValue: NoticeContextType = {
  notices: null,
  setNotices: () => {},
  filterList: [] as NoticeFilterList[],
  noticesNavLinks: null,
  setNoticesNavLinks: () => {},
  setFilterList: () => {},
  queryParams: {} as NoticesQueryParams,
  setQueryParams: () => {},
  noticesLoaded: false,
  setNoticesLoaded: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
  creationMode: false,
  setCreationMode: () => {},
  noticeDeletionMode: false,
  setNoticeDeletionMode: () => {},
  noticeDeletionList: [],
  setNoticeDeletionList: () => {},
  noticeMessage: null,
  setNoticeMessage: () => {},
};

export const NoticesContext = createContext<NoticeContextType>(defaultValue);

interface NoticesProviderProps {
  children: React.ReactNode;
}

export default function NoticesProvider({ children }: NoticesProviderProps) {
  const [notices, setNotices] = useState<PaginatedAPIResponse<Notice> | null>(null);
  const [noticesNavLinks, setNoticesNavLinks] = useState<NavigationLink[] | null>(null);
  const [filterList, setFilterList] = useState<NoticeFilterList[]>([]);
  const [queryParams, _setQueryParams] = useState<NoticesQueryParams>({});
  const [noticesLoaded, setNoticesLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [creationMode, setCreationMode] = useState(false);
  const [noticeDeletionMode, setNoticeDeletionMode] = useState(false);
  const [noticeDeletionList, setNoticeDeletionList] = useState<number[]>([]);
  const [noticeMessage, setNoticeMessage] = useState<FlashMessage | null>(null);

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
      noticesNavLinks,
      setNoticesNavLinks,
      filterList,
      setFilterList,
      queryParams,
      setQueryParams,
      noticesLoaded,
      setNoticesLoaded,
      currentPage,
      setCurrentPage,
      creationMode,
      setCreationMode,
      noticeDeletionMode,
      setNoticeDeletionMode,
      noticeDeletionList,
      setNoticeDeletionList,
      noticeMessage,
      setNoticeMessage,
    }
  }, [
    notices,
    noticesNavLinks,
    setNoticesNavLinks,
    filterList,
    queryParams,
    noticesLoaded,
    currentPage,
    creationMode,
    noticeDeletionMode,
    noticeDeletionList,
    noticeMessage,
  ]);

  return (
    <NoticesContext.Provider value={value}>
      {children}
    </NoticesContext.Provider>
  );
}