import { useContext, useEffect } from 'react';
import { StudyAreasContext } from '../context/StudyAreasContext';
import { getAllAreas, deleteAreas } from '../api/StudyAreasAPI';

export const useDeleteStudyAreas = () => {
  const {
    studyAreaDeletionMode,
    setStudyAreaDeletionMode,
    studyAreaDeletionList,
    setStudyAreaDeletionList,
    setStudyAreas,
    setStudyAreasLoaded,
  } = useContext(StudyAreasContext);

  useEffect(() => {

  }, [studyAreaDeletionList])

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (studyAreaDeletionList.length === 0) {
      console.error('ID is null');
      return;
    }

    console.log('DELETION LIST', studyAreaDeletionList);
    
    try {
      const response = await deleteAreas(`${process.env.NEXT_PUBLIC_API_DELETE_STUDY_AREAS}`, studyAreaDeletionList);
      console.log('RESPONSE DELETE', response);
      const getResponse = await getAllAreas(`${process.env.NEXT_PUBLIC_API_GET_STUDY_AREAS_LIST}`, {});
      if (getResponse) {
        setStudyAreas(getResponse.data);
      }
      setStudyAreasLoaded(false);
      setStudyAreaDeletionMode(false);
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('Erro ao deletar a area de estudo', error.message);
      } else if (error.response) {
        console.log('Erro ao deletar a area de estudo', error.response);
      } else {
        console.log('Erro ao deletar a area de estudo', error);
      }
    }
  }

  return {
    studyAreaDeletionMode,
    setStudyAreaDeletionMode,
    studyAreaDeletionList,
    setStudyAreaDeletionList,
    handleDelete,
  }
}