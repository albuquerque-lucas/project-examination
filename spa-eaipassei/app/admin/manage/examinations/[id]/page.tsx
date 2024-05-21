'use client';

import { useState, useEffect } from "react";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";
import { DetailedExamination } from "@/app/lib/types/examinationTypes";
import { FaEye, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { BiSolidDownArrowSquare } from "react-icons/bi";
import { motion } from "framer-motion";
import style from '@/app/ui/admin/pages/examinations/examinationEdit.module.css';

function ExaminationDisplay() {
  const [id, setId] = useState<string | null>(null);
  const [examination, setExamination] = useState<DetailedExamination | null>(null);
  const [error, setError] = useState(null);

  const callExamInfo = (id: number) => {
    console.log('clicked', id);
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
            <h3>Provas</h3>
            <div className={ style.examination_edit_exams_list }>
              {
                examination &&
                (
                  examination.exam_list.map((exam, index) => {
                    return (
                      <div key={ index } className={ style.examination_edit_exam }>
                        <div className={ style.examination_edit_exam__info }>
                          <h4>{ exam.title }</h4>
                          <p>Questoes: { exam.questions_count }</p>
                        </div>
                        <div className={ style.examination_edit_exam__actions }>
                          <motion.button
                            className={ style.exam_actions_visualize }
                            whileTap={ { scale: 0.9 } }
                            onClick={ () => callExamInfo( exam.id ) }
                          >
                            <FaEye />
                          </motion.button>
                          <motion.button
                            className={ style.exam_actions__view_more }
                            whileTap={ { scale: 0.9 } }
                          >
                            <BiSolidDownArrowSquare />
                          </motion.button>
                        </div>
                      </div>
                    )
                  })
                )
              }
            </div>
          </div>
          <div className={ style.examination_edit_exam_display }>

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