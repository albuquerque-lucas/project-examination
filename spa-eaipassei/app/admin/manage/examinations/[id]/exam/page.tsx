'use client';

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ExamsContext } from "@/app/lib/context/ExamsContext";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import QuestionCard from "./QuestionCard";
import ExamNavButtons from "./ExamNavButtons";
import { getExamById, getQuestionsByExam } from "@/app/lib/api/examsAPI";
import style from '@/app/ui/admin/pages/examinations/questions.module.css';
import { Exam } from "@/app/lib/types/examTypes";
import AddQuestionForm from "./AddQuestionForm";

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];
  const router = useRouter();
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [addQuestionMode, setAddQuestionMode] = useState<boolean>(false);

  const {
    dataLoaded,
    queryParams,
    questionList,
    setQuestionList,
    questionsNavLinks,
    setQuestionsNavLinks,
    questionsCurrentPage,
  } = useContext(ExamsContext);

  useEffect(() => {
    const fetchData = async () => {
      const [exam, questions] = await Promise.all([
        getExamById(`${process.env.NEXT_PUBLIC_API_EXAM_BY_ID}/${id}`,
          queryParams),
        getQuestionsByExam(`${process.env.NEXT_PUBLIC_API_GET_QUESTION_BY_EXAM}`,
          { exam_id: id, ...queryParams, page: questionsCurrentPage })
      ]);
      exam && setCurrentExam(exam);
      questions && setQuestionList(questions.data);
      questions && setQuestionsNavLinks(questions.links);
      console.log(exam);
      console.log(questions);
      }
    fetchData();
  }, [dataLoaded]);

  return (
    <div className={style.questions_page}>
      <section className={style.page_header}>
        <div className={style.header_control}>
          <button
          onClick={() => router.push(`/admin/manage/examinations/${currentExam?.examination_id}`)}
          >
            Voltar
          </button>
          <button
          onClick={() => setAddQuestionMode(!addQuestionMode)}
          >
            Adicionar Questão
          </button>
          <button>
            Info
          </button>
        </div>
        <div className={style.header_edit}>
          {
            addQuestionMode &&
            <AddQuestionForm
            exam_id={ id }
            />
          }
        </div>
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
