'use client';

import { useEffect, useState } from "react";
import { getAllExaminations } from "@/app/lib/api/examinationsAPI";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import style from '@/app/ui/admin/examinations/examinations.module.css';
import NavigationButtons from "@/app/lib/components/NavigationButtons/navigationButtons";

function ExaminationsDashboard() {
  const [examinations, setExaminations] = useState({});
  const [navigationLinks, setNavigationLinks] = useState([]);


  useEffect(() => {
    const fetchExaminations = async () => {
      try {
        if (Object.keys(examinations).length === 0) {
          const examinationList = await getAllExaminations();
          setExaminations(examinationList);
          setNavigationLinks(examinationList.links);
          console.log('EXAMINATIONS LIST', examinationList);
        }
        console.log('EXAMIANATIONS', examinations);
        console.log('NAVIGATION LINKS', navigationLinks);
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
      />
      <div className={ style.examinations_table__container }>

      </div>
    </div>
  );
}

export default withAuth(ExaminationsDashboard);