import { createContext, useMemo, useState } from "react";
import { defaultValue, EntityContext, FilterList } from "../types/entityContextTypes";
import { Exam, ExamQueryParams } from "../types/examTypes";
import { PaginatedAPIResponse, NavigationLink } from "../types/entityContextTypes";
import { FlashMessage } from "../types/messageTypes";

export const ExamsContext = createContext<EntityContext<Exam, ExamQueryParams>>(defaultValue);

interface ExamsProviderProps {
  children: React.ReactNode;
}

export default function ExamsProvider({ children }: ExamsProviderProps) {
  const [data, setData] = useState<PaginatedAPIResponse<Exam> | null>(null);
  const [navLinks, setNavLinks] = useState<NavigationLink[] | null>(null);
  const [deletionMode, setDeletionMode] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState('asc');
  const [filterList, setFilterList] = useState<FilterList[]>([]);
  const [filterMessage, setFilterMessage] = useState<string | null>(null);
  const [queryParams, _setQueryParams] = useState<ExamQueryParams>({});
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);


  const value = useMemo(() => {
    const setQueryParams = (filterList: FilterList[]) => {
      const newQueryParams: { [key: string]: string } = filterList.reduce((acc, filter) => {
        if (filter.filter && filter.value) {
          acc[filter.filter] = filter.value;
        }
        return acc;
      }, {} as { [key: string]: string });
    
      _setQueryParams(newQueryParams);
    }

    return {
      data,
      setData,
      navLinks,
      setNavLinks,
      deletionMode,
      setDeletionMode,
      entityToDelete,
      setEntityToDelete,
      currentPage,
      setCurrentPage,
      selectedOrder,
      setSelectedOrder,
      filterList,
      setFilterList,
      filterMessage,
      setFilterMessage,
      queryParams,
      setQueryParams,
      flashMessage,
      setFlashMessage,
      dataLoaded,
      setDataLoaded,
    };
  }, [
    data,
    navLinks,
    deletionMode,
    entityToDelete,
    currentPage,
    selectedOrder,
    filterList,
    filterMessage,
    queryParams,
    flashMessage,
    dataLoaded,
  ])
  return (
    <ExamsContext.Provider value={value}>
      {children}
    </ExamsContext.Provider>
  );
}