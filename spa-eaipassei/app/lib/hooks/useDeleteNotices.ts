import { useContext, useEffect } from 'react';
import { NoticesContext } from '../context/NoticesContext';
import { toast } from 'react-toastify';
import { getAllNotices, deleteNotices } from '../api/noticesAPI';

export const useDeleteNotices = () => {
  const {
    noticeDeletionMode,
    setNoticeDeletionMode,
    noticeDeletionList,
    setNoticeDeletionList,
    setNotices,
    setNoticesLoaded,
  } = useContext(NoticesContext);

  useEffect(() => {

  }, [noticeDeletionList])

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (noticeDeletionList.length === 0) {
      console.error('ID is null');
      return;
    }
    
    try {
      const response = await deleteNotices(`${process.env.NEXT_PUBLIC_API_DELETE_NOTICES}`, noticeDeletionList);
      console.log('RESPONSE DELETE', response);
      const getResponse = await getAllNotices(`${process.env.NEXT_PUBLIC_API_GET_NOTICES_LIST}`, {});
      if (getResponse) {
        setNotices(getResponse.data);
      }
      setNoticesLoaded(false);
      setNoticeDeletionMode(false);
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('Erro ao deletar o edital', error.message);
      } else if (error.response) {
        console.log('Erro ao deletar o edital', error.response);
      } else {
        console.log('Erro ao deletar o edital', error);
      }
    }
  }

  return {
    noticeDeletionMode,
    setNoticeDeletionMode,
    noticeDeletionList,
    setNoticeDeletionList,
    handleDelete,
  }
}