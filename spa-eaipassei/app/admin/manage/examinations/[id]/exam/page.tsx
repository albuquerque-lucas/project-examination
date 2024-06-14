'use client';

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ExamsContext } from "@/app/lib/context/ExamsContext";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import QuestionCard from "./QuestionCard";
import ExamNavButtons from "./ExamNavButtons";
import { getExamById, getQuestionsByExam, organizeQuestions } from "@/app/lib/api/examsAPI";
import { Exam } from "@/app/lib/types/examTypes";
import AddQuestionForm from "./AddQuestionForm";
import UpdateExamForm from "./UpdateExamForm";
import { motion } from "framer-motion";
import style from '@/app/ui/admin/pages/examinations/questions.module.css';

function ExamDisplay() {
  const id = window.location.pathname.split('/')[4];
  const router = useRouter();
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [refresh, setRefresh] = useState<number>(0);
  const [controlMode, setControlMode] = useState({
    addQuestion: false,
    examInfo: false,
  });

  const {
    dataLoaded,
    setDataLoaded,
    queryParams,
    questionList,
    setQuestionList,
    questionsNavLinks,
    setQuestionsNavLinks,
    questionsCurrentPage,
  } = useContext(ExamsContext);

  const organizeQuestionList = async (examId: number) => {
    console.log('Organizar questões');
    const result = await organizeQuestions(examId);
    
    console.log('Resultado de organizeQuestions', result);
    if (!result) {
      console.log('Nao obteve resultados');
      return;
    }
    setQuestionList(result.questions);
    setRefresh(prevState => prevState + 1);

    console.log('Result', result);
  }

  useEffect(() => {
    const fetchData = async () => {
      const [exam, questions] = await Promise.all([
        getExamById(`${process.env.NEXT_PUBLIC_API_EXAM_BY_ID}/${id}`, queryParams),
        getQuestionsByExam(`${process.env.NEXT_PUBLIC_API_GET_QUESTION_BY_EXAM}`, { exam_id: id, ...queryParams, page: questionsCurrentPage })
      ]);
      exam && setCurrentExam(exam);
      console.log('Current Exam', exam);
      questions && setQuestionList(questions.data);
      questions && setQuestionsNavLinks(questions.links);
      console.log(exam);
      console.log(questions);
    }
    fetchData();
  }, [dataLoaded]);

  const handleControlMode = (mode: string) => {
    setControlMode(prevState => ({
      addQuestion: mode === 'addQuestion' ? !prevState.addQuestion : false,
      examInfo: mode === 'examInfo' ? !prevState.examInfo : false,
    }));
  };

  return (
    <div className={style.questions_page}>
      <section className={style.page_header}>
        <div className={style.header_control}>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => router.push(`/admin/manage/examinations/${currentExam?.examination_id}`)}
          >
            Voltar
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => handleControlMode('examInfo')}
          >
            Info
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => handleControlMode('addQuestion')}
          >
            Adicionar Questão
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={ () => organizeQuestionList(Number(id)) }
          >
            Organizar Questões
          </motion.button>
        </div>
        <div className={style.header_edit}>
          {controlMode.addQuestion && <AddQuestionForm exam_id={id} />}
          {controlMode.examInfo && <UpdateExamForm exam={ currentExam } />}
        </div>
      </section>
      <section className={style.page_body}>
        <div className={style.page_navbuttons__container}>
          <ExamNavButtons
            id={Number(id)}
            links={questionsNavLinks}
          />
        </div>
        <div className={style.page_questions__container}>
          {questionList && questionList.map((question, index) => {
            return (
              <QuestionCard
              key={Number(`${question.id}${question.question_number}`)}
              question={question}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default withAuth(ExamDisplay);
