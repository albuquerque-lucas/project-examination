'use client';

import { useEffect, useState, useContext } from "react";
import { getAllExaminations } from "@/app/lib/api/examinationsAPI";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import style from '@/app/ui/admin/examinations/examinations.module.css';
import NavigationButtons from "@/app/lib/components/NavigationButtons/navigationButtons";
import DashboardExaminations from "@/app/lib/components/DashboardTable/dashboardExaminations";
import ExaminationsProvider, { ExaminationsContext } from "@/app/lib/context/ExaminationsContext";
import { getExaminationsByPage } from "@/app/lib/api/examinationsAPI";

function ExaminationsDashboard() {
  const {
    examinations,
    setExaminations,
    navigationLinks,
    setNavigationLinks
  } = useContext(ExaminationsContext);

  const [examinationList, setExaminationList] = useState({} as any);

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
    console.log('Examinations:', examinations);
    const fetchExaminations = async () => {
      try {
        if (Object.keys(examinations).length === 0) {
          const examinationList = await getAllExaminations();
          // console.log('ExaminationsLIST:', examinationList);
          setExaminationList(examinationList);
          setExaminations(examinationList.data);
          updateNavigationLinks(examinationList.links);
        }
      } catch (error: any) {
        console.log('Erro ao buscar os concursos', error);
        setExaminations({});
      }
    };
  
    fetchExaminations();
  }, [examinations]);

  return (
      <div className="examinations_content">
        <h1 className={ style.examinations_headtitle }>Dashboard Concursos</h1>
        <div className={ style.examinations_filterbox }>

        </div>
        <NavigationButtons
          navigationLinks={ navigationLinks }
          setData={ setExaminations }
          setLinks={ setNavigationLinks }
          getDataByPage={ getExaminationsByPage }
        />
        <DashboardExaminations
        data={ examinations }
        />
      </div>
  );
}

export default withAuth(ExaminationsDashboard);