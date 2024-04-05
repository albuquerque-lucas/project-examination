'use client';

import { useEffect, useState, useContext } from "react";
import { getAllExaminations, getExaminationsByPage } from "@/app/lib/api/examinationsAPI";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import style from '@/app/ui/admin/examinations/examinations.module.css';
import NavigationButtons from "@/app/lib/components/NavigationButtons/navigationButtons";
import DashboardExaminations from "@/app/lib/components/DashboardTable/dashboardExaminations";
import  { ExaminationsContext } from "@/app/lib/context/ExaminationsContext";
import { SpinnerLoader } from "@/app/lib/components/Loaders/Loader";
import Link from "next/link";


function ExaminationsDashboard() {
  const {
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks
  } = useContext(ExaminationsContext);

  const [examinationList, setExaminationList] = useState({} as any);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchExaminations = async () => {
      setIsLoading(true);
      try {
        if (Object.keys(examinations).length === 0) {
          const examinationList = await getAllExaminations();
          setExaminationList(examinationList);
          setExaminations(examinationList.data);
          updateNavigationLinks(examinationList.links);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os concursos', error);
        setExaminations({});
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchExaminations();
  }, [examinations]);

  return (
      <div className="examinations_content">
        <h1 className={ style.examinations_headtitle }>Dashboard Concursos</h1>
        <div className={ style.examinations_utilitiesbox }>
          <div className={ style.utilities_buttons } >
            <Link
              href='/admin/manage/examinations/create'
            >
              <button>
                Adicionar Concurso
              </button>
            </Link>
          </div>
          <div className={ style.utilities_filters }>

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
            <DashboardExaminations
            data={ examinations }
            />
          </>
        )}
      </div>
  );
}

export default withAuth(ExaminationsDashboard);