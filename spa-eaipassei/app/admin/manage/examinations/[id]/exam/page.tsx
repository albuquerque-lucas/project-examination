'use client';

import { useEffect, useState, useContext } from "react";
import { ExamsContext } from "@/app/lib/context/ExamsContext";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import QuestionCard from "./QuestionCard";
import ExamNavButtons from "./ExamNavButtons";
import { getExamById, getQuestionsByExam } from "@/app/lib/api/examsAPI";
import style from '@/app/ui/admin/pages/examinations/questions.module.css';

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];
  // const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const {
    queryParams,
    questionList,
    setQuestionList,
    questionsNavLinks,
    setQuestionsNavLinks,
    questionsCurrentPage,
  } = useContext(ExamsContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getQuestionsByExam(`${process.env.NEXT_PUBLIC_API_GET_QUESTION_BY_EXAM}`, { exam_id: id, ...queryParams, page: questionsCurrentPage });
      res && setQuestionList(res.data);
      res && setQuestionsNavLinks(res.links);
      console.log(res);
    }
    fetchData();
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
          {
            questionList && questionList.map((question, index) => {
              return (
                <QuestionCard key={question.id as number} question={question} />
              );
            })
          }
        </div>
      </section>
    </div>
  );
}

export default withAuth(ExamDisplay);
