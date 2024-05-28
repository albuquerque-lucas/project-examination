'use client';

import { useState, useEffect, useRef, useContext } from "react";
import { ExamsContext } from "@/app/lib/context/ExamsContext";
import withAuth from "@/app/lib/components/withAuth/withAuth";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";
import { DetailedExamination } from "@/app/lib/types/examinationTypes";
import { useGetExamById } from "@/app/lib/hooks/useGetExamById";
import { createExam } from "@/app/lib/api/examsAPI";
import EntityInfoBoard from "./EntityInfoBoard";
import MessageBox from "@/app/lib/components/Message/MessageBox";
import DeleteExamPopUp from "@/app/lib/components/ConfirmationPopUp/DeleteExamPopUp";
import { FlashMessage } from "@/app/lib/types/messageTypes";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import layout from '@/app/ui/admin/layout.module.css';
import style from '@/app/ui/admin/pages/examinations/examinationEdit.module.css';

function ExaminationDisplay() {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [examination, setExamination] = useState<DetailedExamination | null>(null);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const questionsRef = useRef<HTMLInputElement>(null);
  const alternativesRef = useRef<HTMLInputElement>(null);

  const {
    dataLoaded,
    setDataLoaded,
    deletionMode,
  } = useContext(ExamsContext);

  const {
    entity,
    secondaryDataList,
    secondaryNavLinks,
    fetchExam,
    fetchExamQuestions,
    setSecondaryDataList,
    setSecondaryNavLinks,
  } = useGetExamById();

  const submitExam = async () => {
    const title = titleRef.current?.value;
    const questions = questionsRef.current?.value;
    const alternatives = alternativesRef.current?.value;

    if (!title || !questions || !alternatives) {
      setFlashMessage({
        message: 'Todos os campos devem estar preenchidos.',
        type: 'error',
      });
      return;

    };

    try {
      const response = await createExam(process.env.NEXT_PUBLIC_API_CREATE_EXAM as string, {
        examination_id: id,
        title: title,
      });

      if (response === null) {
        console.log('Nao obteve resposta.');
        return;
      };

      setDataLoaded(true);
      setFlashMessage({
        message: 'Prova adicionada com sucesso.',
        type: 'success',
      });

      titleRef.current.value = '';
      questionsRef.current.value = '';
      alternativesRef.current.value = '';

      console.log('Response:', response);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchData = async (id: number | null) => {
    try {
      const [exam, questions] = await Promise.all([fetchExam(id), fetchExamQuestions(id)]);
      const data = questions?.data;
      const links = questions?.links;
      data && setSecondaryDataList(data);
      links && setSecondaryNavLinks(links);
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
          setDataLoaded(false);
        } catch (error: any) {
          console.error('Error fetching examination:', error);
        }
      }

      fetchExamination();
    }
  }, [secondaryNavLinks, secondaryDataList, dataLoaded]);

  if (!examination) return <h1>Loading...</h1>;
  return (
    <div className={ style.examination_page }>
      <section className={ style.page_header__section }>
        <div className={ style.header_title }>
          <h1 className={ layout.admin_content__title }>
            { examination.title }
          </h1>

        </div>
        <div className={ style.header_message__box }>
          <button
            onClick={ () => router.push('/admin/manage/examinations') }
          >
            Concursos
          </button>
          <div className={ style.message_container }>
            <AnimatePresence>
              { flashMessage && (
                <MessageBox
                  message={ flashMessage.message }
                  setMessage={ setFlashMessage }
                  type={ flashMessage.type }
                />
              )
              }
            </AnimatePresence>
          </div>
        </div>
      </section>


      <section className={ style.page_info__section }>
        <div className={ style.exams_form }>
          <h4>Formulario de Provas</h4>
          <input
            type="text"
            id="new_exam"
            placeholder="Titulo da Prova"
            ref={ titleRef }
          />
          <label htmlFor="question_number">
            Questões por prova:
          </label>
          <input
            type="number"
            id="question_number"
            ref={ questionsRef }
          />
          <label htmlFor="alternatives_by_question">
            Alternativas por questão: 
          </label>
          <input
            type="number"
            id="alternatives_by_question"
            ref={ alternativesRef }
          />
          <motion.button
            whileTap={ { scale: 0.99 } }
            onClick={ submitExam }
          >
            Adicionar
          </motion.button>
        </div>
      </section>


      <section  className={ style.exams_info__section }>
        <div className={ style.exam_search__container }>
          <h3>
            Buscar Prova
          </h3>
          <div className={ style.exam_search__select }>
            <select
              onChange={ (e) => setSelectedExamId(Number(e.target.value)) }
            >
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
      </section>
      <section className={ style.exams_info_section }>
        {
          entity &&
              <EntityInfoBoard
                key={ entity.id }
                exam={ entity }
              />
        }
      </section>
        <div className={ style.deletion_pop__up }>
          {
            deletionMode &&
            <DeleteExamPopUp />
          }
        </div>
    </div>
  )
}

export default withAuth(ExaminationDisplay);