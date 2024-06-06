'use client';

import { useEffect, useState } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import QuestionCard from "./QuestionCard";
import ExamNavButtons from "./ExamNavButtons";
import { ExamQuestion } from "@/app/lib/types/examTypes";
import style from '@/app/ui/admin/pages/examinations/questions.module.css';

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const {
    entity,
    secondaryData,
    secondaryDataList,
    secondaryNavLinks,
    setSecondaryNavLinks,
    fetchExam,
    fetchExamQuestions,
  } = useGetExamById();

  useEffect(() => {
    const fetchLocalData = async () => {
      const [exam, questions] = await Promise.all([fetchExam(Number(id)), fetchExamQuestions(Number(id))]);
    }

    fetchLocalData();
  }, []);

  return (
    <div className={style.questions_page}>
      <section className={style.page_header}>
        <div className={style.header_control}></div>
        <div className={style.header_edit}></div>
      </section>
      <section className={style.page_body}>
        <div className={style.page_navbuttons__container}>
          <ExamNavButtons
            id={Number(id)}
            links={secondaryNavLinks}
          />
        </div>
        <div className={style.page_questions__container}>
          {secondaryDataList && secondaryDataList.map((question, index) => {
            return (
              <QuestionCard key={index} question={question} />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default withAuth(ExamDisplay);
