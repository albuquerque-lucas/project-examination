import { useState, useEffect, useContext } from 'react';
import { NoticesContext } from '@/app/lib/context/NoticesContext';
import { NavigationContext } from '../context/NavigationContext';
import { getAllNotices } from '../api/noticesAPI';

export const useFetchNotices = () => {
  const [noticesList, setNoticesList] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const { notices, setNotices, queryParams } = useContext(NoticesContext);
  const { loaded, setLoaded } = useContext(NavigationContext);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        if (!loaded) {
          setIsLoading(true);
          const noticesList = await getAllNotices(`${process.env.NEXT_PUBLIC_API_GET_NOTICES_LIST}`, queryParams);
          setNoticesList(noticesList);
          setNotices(noticesList.data);
          setLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os editais', error);
        setNotices([]);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchNotices();
  }, [loaded]);

  return {
    noticesList,
    isLoading,
    loaded,
  };

}
