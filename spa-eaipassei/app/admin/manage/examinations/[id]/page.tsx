'use client';

import { useState, useEffect, useContext } from "react";
import { ExamsContext} from '@/app/lib/context/ExamsContext';
import withAuth from "@/app/lib/components/withAuth/withAuth";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";
import { DetailedExamination } from "@/app/lib/types/examinationTypes";
import { FaEye, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { BiSolidDownArrowSquare } from "react-icons/bi";
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import { getExamById } from "@/app/lib/api/examsAPI";
import QuestionCard from "./QuestionCard";
import { motion } from "framer-motion";
import style from '@/app/ui/admin/pages/examinations/examinationEdit.module.css';
import { ExamQuestion } from "@/app/lib/types/examTypes";

function ExaminationDisplay() {
  const [id, setId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examination, setExamination] = useState<DetailedExamination | null>(null);
  const [questionList, setQuestionList] = useState<ExamQuestion[] | null>(null);
  const [error, setError] = useState(null);

  const {
    entity,
    fetchExam,
    fetchExamQuestions,
  } = useGetExamById();

  const fetchData = async (id: number | null) => {
    try {
      const exam = await fetchExam(id);
      console.log('Exam', exam);
      const questions = await fetchExamQuestions(id);
      console.log('Questions', questions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/');
      const id = pathSegments[pathSegments.length - 1];
      setId(id);

      const fetchExamination = async () => {
        try {
          const result = await getExaminationById(id);
          setExamination(result);
          console.log('RESULTADO', result);
        } catch (error: any) {
          setError(error);
        }
      }

      fetchExamination();
    }
  }, []);
  return (
    <>
    { examination ? 
      <div className={ style.display_page }>
        <h1 className={ style.examination_headtitle }>
          { examination.title }
        </h1>
        <section className={ style.examination_edit__messagebox }>

        </section>
        <section className={ style.examination_edit__section }>
          <div className={ style.examination_edit__exams_list__container }>
            <h3>Provas Cadastradas</h3>
            <div className={ style.examination_edit_exams_list }>
              {
                examination &&
                (
                  <div className={ style.exams_select }>
                    <select onChange={ (e) => setSelectedExamId(Number(e.target.value)) }>
                      {
                        examination.exam_list.map((exam, index) => {
                          return (
                            <option key={ index } value={ exam.id }>
                              { exam.title }
                            </option>
                          )
                        })
                      }
                    </select>
                    <motion.button
                      className={ style.search_exam__btn }
                      whileTap={ { scale: 0.9 } }
                      onClick={ () => fetchData(selectedExamId) }
                    >
                      Buscar
                    </motion.button>
                  </div>
                  
                )
              }
            </div>
          </div>
          <div className={ style.examination_edit_exam_display }>
            <QuestionCard

            />
            <QuestionCard

            />
            <QuestionCard

            />
            <QuestionCard

            />
            <QuestionCard

            />
          </div>
          
        </section>
        {/* <section className={ style.examination_exams_utilities }>
          <motion.button
            whileTap={ { scale: 0.9 } }
            className={ style.examination_exams_utilities__button }
          >
            Adicionar prova
            <FaPlusCircle />
          </motion.button>
        </section> */}
      </div>
    :
    <h1>Loading</h1>
    }
    </>
  )
}

export default withAuth(ExaminationDisplay);