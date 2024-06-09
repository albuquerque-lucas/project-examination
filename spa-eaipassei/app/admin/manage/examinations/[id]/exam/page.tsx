'use client';

import { useEffect, useState } from "react";
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import QuestionCard from "./QuestionCard";
import ExamNavButtons from "./ExamNavButtons";
import { ExamQuestion } from "@/app/lib/types/examTypes";
import { getQuestionsByExam } from "@/app/lib/api/examsAPI";
import style from '@/app/ui/admin/pages/examinations/questions.module.css';

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];
  // const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const {
    exam,
    questions,
    questionList,
    questionsNavLinks,
    setQuestionsNavLinks,
    setQueryParams,
    fetchExam,
    fetchExamQuestions,
    queryParams,
    questionsCurrentPage,
  } = useGetExamById();

  useEffect(() => {
    console.log('EXAM DISPLAY - QueryParams', queryParams);
    const fetchLocalData = async () => {
      const [exam, questions] = await Promise.all([fetchExam(Number(id)), fetchExamQuestions(Number(id))]);
    }

    fetchLocalData();
  }, [questionsCurrentPage]);

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
            links={ questionsNavLinks }
          />
        </div>
        <div className={style.page_questions__container}>
          {questionList && questionList.map((question, index) => {
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
