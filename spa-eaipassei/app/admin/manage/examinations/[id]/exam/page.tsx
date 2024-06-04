'use client';

import { useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth"
import style from '@/app/ui/admin/pages/examinations/questions.module.css';
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import { useRouter } from "next/navigation";

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];


  const {
    entity,
    secondaryData,
    isLoading,
    dataLoaded,
    secondaryDataList,
    secondaryNavLinks,
    setEntity,
    setSecondaryData,
    fetchExam,
    fetchExamQuestions,
  } = useGetExamById();

  // console.log('router', id);
  // console.log('entity', entity);

  useEffect(() => {
    const fetchLocalData = async () => {
      const result = await fetchExamQuestions(Number(id));
      console.log('result', result);
    }

    fetchLocalData();
  }, []);
  // console.log('entity', entity);
  // console.log('secondaryData', secondaryData);

  return (
    <div className={ style.questions_page }>
      <section className={ style.page_header }>
        <div className={ style.header_control }>

        </div>
        <div className={ style.header_edit }>

        </div>
      </section>
    </div>
  )
}

export default withAuth(ExamDisplay);