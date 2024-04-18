import { useState, useEffect, useContext } from 'react';
import { NoticesContext } from '@/app/lib/context/NoticesContext';
import { NavigationContext } from '../context/NavigationContext';
import { getAllNotices } from '../api/noticesAPI';

export const useFetchNotices = () => {
  const [noticesList, setNoticesList] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const {
    notices,
    setNotices,
    queryParams,
    noticesLoaded,
    setNoticesLoaded,
    currentPage,
  } = useContext(NoticesContext);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        if (!noticesLoaded) {
          setIsLoading(true);
          const noticesList = await getAllNotices(`${process.env.NEXT_PUBLIC_API_GET_NOTICES_LIST}`, queryParams);
          setNoticesList(noticesList);
          setNotices(noticesList.data);
          setNoticesLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os editais', error);
        setNotices([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchNotices();
  }, [noticesLoaded]);

  return {
    notices,
    noticesList,
    isLoading,
    noticesLoaded,
    currentPage,
  };

}
