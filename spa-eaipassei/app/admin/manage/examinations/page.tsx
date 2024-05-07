'use client';

import { useEffect, useContext } from "react";
import { getExaminationsByPage } from "@/app/lib/api/examinationsAPI";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import NavigationButtons from "@/app/lib/components/NavigationButtons/navigationButtons";
import DashboardExaminations from './dashboardExaminations';
import { ExaminationsContext } from "@/app/lib/context/ExaminationsContext";
import { useNavigations } from "@/app/lib/hooks/useNavigations";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import { useRouter } from "next/navigation";
import { useFetchExaminations } from "@/app/lib/hooks/useFetchExaminations";
import FilterBox from "@/app/lib/components/Filters/filterBox";
import SelectedFiltersBar from "@/app/lib/components/SelectedFiltersBar/selectedFiltersBar";
import { motion, AnimatePresence } from 'framer-motion';
import FlashMessage from "@/app/lib/components/Message/FlashMessage";
import style from '@/app/ui/admin/examinations/examinations.module.css';
import MessageBox from "@/app/lib/components/Message/MessageBox";


function ExaminationsPage() {
  const {
    examinations,
    flashMessage,
    setFlashMessage,
  } = useContext(ExaminationsContext);

  const { updateNavigationLinks } = useNavigations();

  const { examinationList, isLoading, examinationsLoaded, currentPage } = useFetchExaminations();
  const router = useRouter();

  useEffect(() => {
    console.log('ExaminationList', examinationList);
    if (examinationList.links) {
      updateNavigationLinks(examinationList.links);
    }
  }, [examinationsLoaded]);

  return (
      <div className="examinations_content">
        <h1 className={ style.examinations_headtitle }>
          Dashboard Concursos
        </h1>
        <div className={ style.messages_messagebox }>
          <AnimatePresence>
            { flashMessage && (
              <MessageBox
                message={ flashMessage.message }
                setMessage={ setFlashMessage }
                type={ flashMessage.type }
              />
            )  
            }
          </AnimatePresence>
        </div>
        <div className={ style.examinations_utilitiesbox }>
          <div className={ style.utilities_buttons } >
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{color: '#fff', backgroundColor: '#4F525A'}}
              className={ style.go_back__button }
              onClick={() => router.back()}
            >
              Voltar
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{color: '#fff', backgroundColor: '#3393FF'}}
              onClick={() => router.push('/admin/manage/examinations/create')}
              className={ style.new_examination__button }
            >
              Adicionar Concurso
            </motion.button>
          </div>
          <div className={ style.utilities_filters }>
            <FilterBox />
          </div>
        </div>
        {isLoading && currentPage === 1 ? (
          <SpinnerLoader />
        ) : (
          <>
            <NavigationButtons />
            <div className={ style.selected_filters }>
            <SelectedFiltersBar />
            </div>
            <DashboardExaminations
            data={ examinations }
            />
          </>
        )}
      </div>
  );
}

export default withAuth(ExaminationsPage);