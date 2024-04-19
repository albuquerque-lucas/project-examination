import { useState, useContext } from "react";
import { Subject } from "../types/subjectTypes";
import { SubjectsContext } from "../context/SubjectsContext";

export const useFetchSubjects = () => {
  const [subjectsList, setSubjectsList] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    subjects,
    setSubjects,
    queryParams,
    subjectsLoaded,
    setSubjectsLoaded,
    currentPage,
  } = useContext(SubjectsContext);
}