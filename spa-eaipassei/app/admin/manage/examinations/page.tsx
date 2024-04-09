'use client';

import { useEffect, useState, useContext } from "react";
import { getExaminationsByPage } from "@/app/lib/api/examinationsAPI";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import style from '@/app/ui/admin/examinations/examinations.module.css';
import NavigationButtons from "@/app/lib/components/NavigationButtons/navigationButtons";
import DashboardExaminations from "@/app/lib/components/DashboardTable/dashboardExaminations";
import  { ExaminationsContext } from "@/app/lib/context/ExaminationsContext";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import { useRouter } from "next/navigation";
import FilterBox from "@/app/lib/components/Filters/filterBox";
import SelectedFiltersBar from "@/app/lib/components/SelectedFiltersBar/selectedFiltersBar";
import { motion } from 'framer-motion';


function ExaminationsDashboard() {
  const {
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks,
    currentPage,
    setCurrentPage,
    loaded,
    setLoaded,
    selectedOrder,
    filterList,
    setFilterList,
  } = useContext(ExaminationsContext);

  const [examinationList, setExaminationList] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchExaminations = async () => {
      try {
        if (!loaded) {
          setIsLoading(true);
          const examinationList = await getExaminationsByPage(`${process.env.NEXT_PUBLIC_API_GET_EXAMINATIONS_LIST}?page=${currentPage}?order=${selectedOrder}`);
          console.log('LOG DE PAGE DA PAGE', currentPage);
          setExaminationList(examinationList);
          setExaminations(examinationList.data);
          updateNavigationLinks(examinationList.links);
          setLoaded(true);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os concursos', error);
        setExaminations({});
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExaminations();
  }, [loaded, currentPage, selectedOrder, filterList]);

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

  const removeFromFilterList = (indexToRemove: number) => {
    setFilterList(prevFilterList => prevFilterList.filter((_, index) => index !== indexToRemove));
  }

  const clearFilters = () => {
    setFilterList([]);
  }

  return (
      <div className="examinations_content">
        <h1 className={ style.examinations_headtitle }>Dashboard Concursos</h1>
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

export default withAuth(ExaminationsDashboard);