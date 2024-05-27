'use client';

import { useState, useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";
import { DetailedExamination } from "@/app/lib/types/examinationTypes";
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import QuestionCard from "./QuestionCard";
import EntityInfoBoard from "./EntityInfoBoard";
import ExamNavButtons from "./ExamNavButtons";
import { motion, AnimatePresence } from "framer-motion";
import layout from '@/app/ui/admin/layout.module.css';
import style from '@/app/ui/admin/pages/examinations/examinationEdit.module.css';

function ExaminationDisplay() {
  const [id, setId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examination, setExamination] = useState<DetailedExamination | null>(null);
  const [error, setError] = useState(null);

  const {
    entity,
    secondaryDataList,
    secondaryNavLinks,
    fetchExam,
    fetchExamQuestions,
    setSecondaryDataList,
    setSecondaryNavLinks,
  } = useGetExamById();

  const fetchData = async (id: number | null) => {
    try {
      const [exam, questions] = await Promise.all([fetchExam(id), fetchExamQuestions(id)]);
      const data = questions?.data;
      const links = questions?.links;
      data && setSecondaryDataList(data);
      links && setSecondaryNavLinks(links);
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
  }, [secondaryNavLinks, secondaryDataList]);
  return (
    <>
    {
      examination ? 
      <div className={ style.display_page }>
        <h1 className={ layout.admin_content__title  }>
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
                  whileTap={ { scale: 0.99 } }
                  onClick={ () => fetchData(selectedExamId) }
                >
                  Buscar
                </motion.button>
              </div>
            </div>
          </div>
          <div className={ style.examination_edit__info_board }>
            <div className={ style.info_board__card }>
                <h4>Instituicao</h4>
                <span>
                  Governo Federal
                </span>
            </div>
            <div className={ style.info_board__card }>
                <h4>Provas</h4>
                <span>
                  3
                </span>
            </div>
            <div className={ style.info_board__card }>
                <h4>Nivel de Escolaridade</h4>
                <span>
                  Ensino Superior
                </span>
            </div>
          </div>
          
        </section>
          {
            entity &&
              <section className={ style.exams_info__section }>
                <EntityInfoBoard
                key={ entity.id }
                exam={ entity }
                />
                <div className={ style.examination_edit_exam_display }>
                      <h3>
                        { entity.title }
                      </h3>
                      <div className={ style.navbutton_container}>
                        <ExamNavButtons
                        links={ secondaryNavLinks }
                        id={ selectedExamId }
                        />
                      </div>
                    {
                      secondaryDataList &&
                        secondaryDataList.map((question, index) => {
                          return (
                            <QuestionCard
                            key={ index }
                            question={ question }
                            />
                          )
                        }
                      )
                    }
                </div>
              </section>
        }
        {
          /*
            <section className={ style.examination_exams_utilities }>
              <motion.button
                whileTap={ { scale: 0.9 } }
                className={ style.examination_exams_utilities__button }
              >
                Adicionar prova
                <FaPlusCircle />
              </motion.button>
            </section>
          */
        }
      </div>
    :
    <h1>Loading</h1>
    }
    </>
  )
}

export default withAuth(ExaminationDisplay);