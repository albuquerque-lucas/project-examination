import { useState, useEffect, useContext } from 'react';
import { NoticesContext } from '@/app/lib/context/NoticesContext';
import { getAllNotices } from '../api/noticesAPI';

export const useFetchNotices = () => {
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
          const apiResponse = await getAllNotices(`${process.env.NEXT_PUBLIC_API_GET_NOTICES_LIST}`, queryParams);
          setNotices(apiResponse);
          setNoticesLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os editais', error);
        setNotices(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchNotices();
  }, [noticesLoaded]);

  return {
    notices,
    isLoading,
    noticesLoaded,
    currentPage,
    setNoticesLoaded,
  };

}
