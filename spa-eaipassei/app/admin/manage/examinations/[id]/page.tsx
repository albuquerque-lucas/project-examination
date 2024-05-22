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
import { motion, AnimatePresence } from "framer-motion";
import { ExamQuestion } from "@/app/lib/types/examTypes";
import EntityInfoBoard from "./EntityInfoBoard";
import ExamNavButtons from "./ExamNavButtons";
import style from '@/app/ui/admin/pages/examinations/examinationEdit.module.css';
import { NavigationLink } from "@/app/lib/types/entityContextTypes";

function ExaminationDisplay() {
  const [id, setId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examination, setExamination] = useState<DetailedExamination | null>(null);
  const [questionList, setQuestionList] = useState<ExamQuestion[] | null>(null);
  const [navLinks, setNavLinks] = useState<NavigationLink[] | null>(null);
  const [error, setError] = useState(null);

  const {
    entity,
    fetchExam,
    fetchExamQuestions,
  } = useGetExamById();

  const fetchData = async (id: number | null) => {
    try {
      const [exam, questions] = await Promise.all([fetchExam(id), fetchExamQuestions(id)]);
      const data = questions?.data;
      const links = questions?.links;
      data && setQuestionList(data);
      links && setNavLinks(links);
      console.log('Exam', exam);
      console.log('Questions', questions);
      console.log('Data', data);
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
  }, [navLinks, questionList]);
  return (
    <>
    {
      examination ? 
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
              <div className={ style.exams_select }>
                <select onChange={ (e) => setSelectedExamId(Number(e.target.value)) }>
                    <option>
                      Selecione uma prova
                    </option>
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
              <AnimatePresence>
                {
                  entity &&
                  <EntityInfoBoard 
                  exam={ entity }
                  />
                }
              </AnimatePresence>
            </div>
          </div>
              {
                entity &&
          <div className={ style.examination_edit_exam_display }>
            <AnimatePresence>
                <motion.h3
                  initial={ { opacity: 0 } }
                  animate={ { opacity: 1 } }
                  exit={ { opacity: 0 } }
                  transition={ { duration: 0.1 } }
                >
                  { entity.title }
                </motion.h3>

                <ExamNavButtons
                links={ navLinks }
                />
              {
                questionList &&
                  questionList.map((question, index) => {
                    return (
                      <QuestionCard
                      key={ index }
                      question={ question }
                      />
                    )
                  }
                )
              }

            </AnimatePresence>
          </div>
              }
          
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