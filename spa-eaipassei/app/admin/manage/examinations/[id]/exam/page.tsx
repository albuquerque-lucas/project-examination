'use client';

import { useEffect, useState } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth"
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import QuestionCard from "./QuestionCard";
import ExamNavButtons from "./ExamNavButtons";
import style from '@/app/ui/admin/pages/examinations/questions.module.css';

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];
  const [questions, setQuestions] = useState([]);
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

  useEffect(() => {
    const fetchLocalData = async () => {
      await Promise.all([fetchExam(Number(id)), fetchExamQuestions(Number(id))]);
    }

    fetchLocalData();
  }, []);
  console.log('entity', entity);
  console.log('secondaryData', secondaryData);
  console.log('secondaryDataList', secondaryDataList);

  return (
    <div className={ style.questions_page }>
      <section className={ style.page_header }>
        <div className={ style.header_control }>

        </div>
        <div className={ style.header_edit }>

        </div>
      </section>
      <section className={ style.page_body }>
      <div className={ style.page_navbuttons__container }>
        <ExamNavButtons links={ secondaryNavLinks } id={Number(id)} />
      </div>
      <div className={ style.page_questions__container }>
        {
          secondaryDataList && secondaryDataList.map((question, index) => {
            return (
              <QuestionCard key={index} question={question} />
            );
          })
        }
      </div>
      </section>
    </div>
  )
}

export default withAuth(ExamDisplay);