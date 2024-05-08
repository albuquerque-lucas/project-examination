'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchSubjects } from "@/app/lib/hooks/useFetchSubjects";
import { useDeleteSubjects } from "@/app/lib/hooks/useDeleteSubjects";
import { useCreateSubjects } from "@/app/lib/hooks/useCreateSubjects";
import { useFetchStudyAreas } from "@/app/lib/hooks/useFetchStudyAreas";
import { useFetchEducationalLevels } from "@/app/lib/hooks/useFetchEducationalLevels";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import SubjectsNavigationButtons from "./SubjectsNavigationButtons";
import DeleteSubjectsPopUp from "@/app/lib/components/ConfirmationPopUp/DeleteSubjectsPopUp";
import SubjectsDashboard from "./SubjectsDashboard";
import MessageBox from "@/app/lib/components/Message/MessageBox";
import { motion, AnimatePresence } from 'framer-motion';
import style from '@/app/ui/admin/pages/subjects/subjects.module.css';

function SubjectsPage () {
  const router = useRouter();
  const { subjectDeletionMode } = useDeleteSubjects();
  const { updateNavigationLinks } = useNavigations();
  const {
    subjects,
    subjectsList,
    isLoading,
    currentPage,
    subjectsLoaded,
  } = useFetchSubjects();
  const { 
    notPaginatedAreasList,
    studyAreasLoaded,
    setStudyAreasLoaded,
  } = useFetchStudyAreas();

  const {
    educationalLevelsList,
  } = useFetchEducationalLevels();

  const {
    creationMode,
    setCreationMode,
    submitSubject,
    titleRef,
    educationalLevelRef,
    studyAreaRef,
    subjectsMessage,
    setSubjectsMessage,
  } = useCreateSubjects();

  useEffect(() => {
    setStudyAreasLoaded(false);
    if (subjectsList.links) {
      updateNavigationLinks(subjectsList.links);
    }
  }, [subjectsLoaded]);

  return (
    <div className="subjects_content">
      <h1>
        Matérias
      </h1>
      <div className={ style.messages_messagebox}>
        <AnimatePresence>
          {
            subjectsMessage &&
            <MessageBox 
              message={ subjectsMessage.message }
              setMessage={ setSubjectsMessage }
              type={ subjectsMessage.type }
            />
          }
        </AnimatePresence>
      </div>
      <div className={ style.subjects_utilitiesbox }>
        <div className={ style.utilities_buttons }>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{color: '#fff', backgroundColor: '#4F525A'}}
            className={ style.go_back__button }
            onClick={() => router.back()}
          >
            Voltar
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
            className={ style.new_subject__button }
            onClick={() => setCreationMode(!creationMode)}
          >
            Adicionar Matéria
          </motion.button>
          {
            creationMode &&
            <div className={ style.subject_creation__form }>
              <label htmlFor="subject_title">Título:</label>
              <input type="text" id='subject_title' ref={ titleRef }/>
              <select id="educatonal_level_select" ref={ educationalLevelRef }>
                {
                  educationalLevelsList.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))
                }
              </select>
              <select id="study_areas_select" ref={ studyAreaRef }>
                {
                  notPaginatedAreasList.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.area}
                    </option>
                  ))
                }
              </select>
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
                className={ style.submit_subject__button }
                onClick={() => submitSubject()}
              >
                Adicionar
              </motion.button>
            </div>
          }

        </div>
      </div>
      {isLoading && currentPage === 1 ? (
          <SpinnerLoader />
        ) : (
          <>
            <SubjectsNavigationButtons />
            <div className={ style.selected_filters }>
            </div>
            <SubjectsDashboard
              data={subjects}
            />
            {
              subjectDeletionMode &&
              <DeleteSubjectsPopUp />
            }
          </>
        )}
    </div>
  );
}

export default withAuth(SubjectsPage);