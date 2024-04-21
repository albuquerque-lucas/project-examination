'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchSubjects } from "@/app/lib/hooks/useFetchSubjects";
import { useDeleteSubjects } from "@/app/lib/hooks/useDeleteSubjects";
import { useCreateSubjects } from "@/app/lib/hooks/useCreateSubjects";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import { motion } from 'framer-motion';
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import SubjectsNavigationButtons from "./SubjectsNavigationButtons";
import DeleteSubjectsPopUp from "@/app/lib/components/ConfirmationPopUp/DeleteSubjectsPopUp";
import SubjectsDashboard from "./SubjectsDashboard";
import style from '@/app/ui/admin/pages/subjects/subjects.module.css';

function SubjectsPage () {
  const {
    subjects,
    subjectsList,
    isLoading,
    currentPage,
    subjectsLoaded,
  } = useFetchSubjects();
  const { subjectDeletionMode } = useDeleteSubjects();
  const { updateNavigationLinks } = useNavigations();
  const { creationMode, setCreationMode, submitSubject, titleRef } = useCreateSubjects();
  const router = useRouter();

  useEffect(() => {
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
            Adicionar Edital
          </motion.button>
          {
            creationMode &&
            <div className={ style.subject_creation__form }>
              <label htmlFor="subject_title">Título:</label>
              <input type="text" id='subject_title' ref={ titleRef }/>
              <input type="text" id="study_area_title"/>
              <select id="educational_level_select">
                
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