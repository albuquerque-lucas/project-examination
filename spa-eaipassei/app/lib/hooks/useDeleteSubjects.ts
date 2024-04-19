import { useContext, useEffect } from 'react';
import { SubjectsContext } from '../context/SubjectsContext';
import { getAllSubjects, deleteSubjects } from '../api/subjectsAPI';

export const useDeleteSubjects = () => {
  const {
    subjectDeletionMode,
    setSubjectDeletionMode,
    subjectDeletionList,
    setSubjectDeletionList,
    setSubjects,
    setSubjectsLoaded,
  } = useContext(SubjectsContext);

  useEffect(() => {

  }, [subjectDeletionList])

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (subjectDeletionList.length === 0) {
      console.error('ID is null');
      return;
    }
    
    try {
      const response = await deleteSubjects(`${process.env.NEXT_PUBLIC_API_DELETE_SUBJECTS}`, subjectDeletionList);
      console.log('RESPONSE DELETE', response);
      const getResponse = await getAllSubjects(`${process.env.NEXT_PUBLIC_API_GET_SUBJECTS_LIST}`, {});
      if (getResponse) {
        setSubjects(getResponse.data);
      }
      setSubjectsLoaded(false);
      setSubjectDeletionMode(false);
    } catch (error: any) {
      if (error instanceof Error) {
        console.log('Erro ao deletar a disciplina', error.message);
      } else if (error.response) {
        console.log('Erro ao deletar a disciplina', error.response);
      } else {
        console.log('Erro ao deletar a disciplina', error);
      }
    }
  }

  return {
    subjectDeletionMode,
    setSubjectDeletionMode,
    subjectDeletionList,
    setSubjectDeletionList,
    handleDelete,
  }
}