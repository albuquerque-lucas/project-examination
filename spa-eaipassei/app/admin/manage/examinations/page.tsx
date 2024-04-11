'use client';

import { useEffect, useState, useContext } from "react";
import { getExaminationsByPage } from "@/app/lib/api/examinationsAPI";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import NavigationButtons from "@/app/lib/components/NavigationButtons/navigationButtons";
import DashboardExaminations from "@/app/lib/components/DashboardTable/dashboardExaminations";
import { ExaminationsContext } from "@/app/lib/context/ExaminationsContext";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import { useRouter } from "next/navigation";
import { useFetchExaminations } from "@/app/lib/hooks/useFetchExaminations";
import FilterBox from "@/app/lib/components/Filters/filterBox";
import SelectedFiltersBar from "@/app/lib/components/SelectedFiltersBar/selectedFiltersBar";
import { motion, AnimatePresence } from 'framer-motion';
import FlashMessage from "@/app/lib/components/Message/FlashMessage";
import style from '@/app/ui/admin/examinations/examinations.module.css';


function ExaminationsPage() {
  const {
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks,
    loaded,
    setLoaded,
    queryParams,
    flashMessage,
    setFlashMessage,
  } = useContext(ExaminationsContext);

  const { examinationList, isLoading } = useFetchExaminations();
  const router = useRouter();

  useEffect(() => {
    if (examinationList.links) {
      updateNavigationLinks(examinationList.links);
    }
  }, [examinationList]);

  const updateNavigationLinks = (links: any[]) => {
    const updatedLinks = links.map((link: any, index: number, array: any[]) => {
      if (index === array.length - 1) {
          return {
            ...link,
            label: link.label.replace('&raquo;', '\u00BB'),
          };
      }
      if (index === 0) {
        return {
          ...link,
          label: link.label.replace('&laquo;', '\u00AB'),
        };
      }
      return link;
    });

    setNavigationLinks(updatedLinks);
  };

  return (
      <div className="examinations_content">
        <h1 className={ style.examinations_headtitle }>
          Dashboard Concursos
        </h1>
        <div className={ style.messages_messagebox }>
          <AnimatePresence>
            { flashMessage && (
              <FlashMessage
                message={ flashMessage }
                setMessage={ setFlashMessage }
              />
            )  
            }
          </AnimatePresence>
        </div>
        <div className={ style.examinations_utilitiesbox }>
          <div className={ style.utilities_buttons } >
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
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <>
            <NavigationButtons
              navigationLinks={ navigationLinks }
              setData={ setExaminations }
              setLinks={ setNavigationLinks }
              getDataByPage={ getExaminationsByPage }
            />
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