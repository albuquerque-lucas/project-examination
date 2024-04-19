'use client';

import withAuth from "@/app/lib/components/withAuth/withAuth";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import style from '@/app/ui/admin/pages/subjects/subjects.module.css';
import SubjectsNavigationButtons from "./SubjectsNavigationButtons";
import DeleteSubjectsPopUp from "@/app/lib/components/ConfirmationPopUp/DeleteSubjectsPopUp";

function SubjectsDashboard () {
  const router = useRouter();
  const isLoading = false;
  const currentPage = 1;
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
            // onClick={() => setCreationMode(!creationMode)}
          >
            Adicionar Edital
          </motion.button>
          {
            // creationMode &&
            <div className={ style.subject_creation__form }>
              <label htmlFor="subject_name">Nome:</label>
              <input type="test" name='subject_name'/>
              <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
              className={ style.submit_subject__button }
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
            />
            {
              // noticeDeletionMode &&
              <DeleteSubjectsPopUp />
            }
          </>
        )}
    </div>
  );
}

export default withAuth(SubjectsDashboard);