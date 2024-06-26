'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";
import { useRouter } from "next/navigation";
import { useFetchSubjects } from "@/app/lib/hooks/useFetchSubjects";
import { useDeleteSubjects } from "@/app/lib/hooks/useDeleteSubjects";
import { useCreateSubjects } from "@/app/lib/hooks/useCreateSubjects";
import { useFetchStudyAreas } from "@/app/lib/hooks/useFetchStudyAreas";
import { useFetchEducationalLevels } from "@/app/lib/hooks/useFetchEducationalLevels";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import SubjectsNavigationButtons from "./SubjectsNavigationButtons";
import DeleteSubjectsPopUp from "@/app/lib/components/ConfirmationPopUp/DeleteSubjectsPopUp";
import SubjectsDashboard from "./SubjectsDashboard";
import MessageBox from "@/app/lib/components/Message/MessageBox";
import { motion, AnimatePresence } from 'framer-motion';
import layout from '@/app/ui/admin/layout.module.css';
import style from '@/app/ui/admin/pages/subjects/subjects.module.css';

function SubjectsPage () {
  const router = useRouter();
  const { subjectDeletionMode } = useDeleteSubjects();
  const {
    subjects,
    isLoading,
    currentPage,
  } = useFetchSubjects();
  const { 
    notPaginatedStudyAreas,
  } = useFetchStudyAreas();

  const {
    educationalLevelsList,
  } = useFetchEducationalLevels();

  const {
    titleRef,
    educationalLevelRef,
    studyAreaRef,
    creationMode,
    setCreationMode,
    submitSubject,
    subjectsMessage,
    setSubjectsMessage,
  } = useCreateSubjects();

  return (
    <div className="subjects_content">
      <h1 className={ layout.admin_content__title }>
        Dashboard Matérias
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
            className={ style.go_back__button }
            onClick={() => router.push('/admin/home')}
          >
            Voltar
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
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
                  notPaginatedStudyAreas && notPaginatedStudyAreas.map((area) => (
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
            <SubjectsNavigationButtons
              links={ subjects && subjects.links }
            />
            <div className={ style.selected_filters }>
            </div>
            <SubjectsDashboard
              data={ subjects && subjects.data }
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