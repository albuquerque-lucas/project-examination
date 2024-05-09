'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFetchStudyAreas } from "@/app/lib/hooks/useFetchStudyAreas";
import { useCreateStudyAreas } from "@/app/lib/hooks/useCreateStudyAreas";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import { useDeleteStudyAreas } from "@/app/lib/hooks/useDeleteStudyAreas";
import { motion, AnimatePresence } from 'framer-motion';
import DeleteStudyAreasPopUp from "@/app/lib/components/ConfirmationPopUp/DeleteStudyAreasPopUp";
import StudyAreasDashboard from "./StudyAreasDashboard";
import StudyAreasNavigationButtons from "./StudyAreasNavigationButtons";
import style from '@/app/ui/admin/pages/study-areas/studyArea.module.css';
import MessageBox from "@/app/lib/components/Message/MessageBox";

function StudyAreasPage() {
  console.log('A pagina Study Areas foi renderizada');
  const router = useRouter();
  const { updateNavigationLinks } = useNavigations();
  const { studyAreaDeletionMode } = useDeleteStudyAreas();
  const { 
    studyAreasLoaded,
    studyAreas,
    studyAreasAPIResponse,
  } = useFetchStudyAreas();

  const {
    titleRef,
    creationMode,
    setCreationMode,
    submitStudyArea,
    studyAreasMessage,
    setStudyAreasMessage,
    setStudyAreasLoaded,
  } = useCreateStudyAreas();

  useEffect(() => {
    if (studyAreasAPIResponse.links) {
      updateNavigationLinks(studyAreasAPIResponse.links);
    } else {
      setStudyAreasLoaded(false);
    }
  }, [studyAreasLoaded]);
  return (
    <div className={ style.study_area_content }>
      <h1 className={ style.study_areas_headtitle }>
        Dashboard Áreas de Estudo
      </h1>
      <div className={ style.messages_messagebox}>
        <AnimatePresence>
          {
            studyAreasMessage &&
            <MessageBox 
              message={ studyAreasMessage.message }
              type={ studyAreasMessage.type }
              setMessage={ setStudyAreasMessage }
            />
          }
        </AnimatePresence>
      </div>
      <div className={ style.study_areas_utilitiesbox }>
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
            className={ style.new_study_area__button }
            onClick={() => setCreationMode(!creationMode)}
          >
            Adicionar Area
          </motion.button>
          {
            creationMode &&
            <div className={ style.study_area_creation__form }>
              <label htmlFor="study_area_title">Título:</label>
              <input
                type="text"
                id='study_area_title'
                ref={ titleRef }
                />
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
                className={ style.submit_study_area__button }
                onClick={() => submitStudyArea()}
              >
                Adicionar
              </motion.button>
            </div>
          }
        </div>
      </div>
          <>
            <StudyAreasNavigationButtons />
            <div className={ style.selected_filters }>
            </div>
            <StudyAreasDashboard
              data={ studyAreas }
            />
            {
              studyAreaDeletionMode &&
              <DeleteStudyAreasPopUp />
            }
          </>
    </div>
  );
}

export default withAuth(StudyAreasPage);