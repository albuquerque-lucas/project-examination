'use client';

import React, { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { ExaminationsContext } from '@/app/lib/context/ExaminationsContext';
import ExaminationSavingCard from "@/app/lib/components/ExaminationSavingCard/ExaminationSavingCard";
import withAuth from "@/app/lib/components/withAuth/withAuth"
import { Examination } from '@/app/lib/types/examinationTypes';
import { createMany } from '@/app/lib/api/examinationsAPI';
import { educationalLevelsApi } from '@/app/lib/api/educationalLevelsAPI';
import { motion, AnimatePresence } from 'framer-motion';
import FlashMessage from '@/app/lib/components/Message/FlashMessage';
import { useExaminations } from '@/app/lib/hooks/useExamination';
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';

const CreateExaminationsPage = () => {
  const router = useRouter();
  const { setLoaded, educationalLevels, setEducationalLevels, flashMessage, setFlashMessage } = useContext(ExaminationsContext);
  const { getAll } = educationalLevelsApi;
  const {
    titleRef,
    institutionRef,
    educationalLevelRef,
    persistenceList,
    setPersistenceList,
    addToList,
    submitExaminations
  } = useExaminations();
  
  
  useEffect(() => {
    try {
      if (educationalLevels.length === 0) {
        const fetchData = async () => {
          const levels = await getAll();
          if (levels) {
            setEducationalLevels(levels.data);
          }
        };
        fetchData();
      }
    } catch (error: any) {
      console.error('ERROR', error);
    }
  }, [persistenceList, educationalLevels, flashMessage]);


  return (
    <div className={ style.examination_creation__content  }>
      <h1>Formulário</h1>
      <div className={ style.message_container }>
        <AnimatePresence>
          { flashMessage &&
            <FlashMessage
              message={ flashMessage }
              setMessage={ setFlashMessage }
            />
          }
        </AnimatePresence>
      </div>
      <div className={ style.creation_form__box }>
        <form action="" onSubmit={(e) => e.preventDefault() }>
          <section className={ style.creation_screen}>
            <div className={ style.form_inputs }>
              <h3 className={ style.form_title }>Formulário de adição</h3>
              <input
                type="text"
                placeholder='Título do concurso'
                ref={ titleRef }
              />
              <input 
                type="text" 
                placeholder='Instituição responsável'
                ref={ institutionRef }
              />
              <select ref={ educationalLevelRef }>
                {
                  educationalLevels.length > 0 &&
                  educationalLevels.map((level, index) => (
                    <option key={ index } value={ level.id }>{ level.name }</option>
                  ))
                }
              </select>
              <motion.button
                whileTap={{scale:0.9}}
                onClick={ addToList }
              >
                Adicionar
              </motion.button>
            </div>
            <div className={ style.presaved_examinations_screen }>
            <h3 className={ style.form_title }>Lista de persistência</h3>
            <div className={ style.list_display }>
            {
              persistenceList.length > 0 
                ? persistenceList.map((examination, index) => (
                    <ExaminationSavingCard
                      key={ index }
                      index={ index }
                      examination={ examination }
                      persistenceList={ persistenceList }
                      setPersistenceList={ setPersistenceList }
                    />
                  ))
                : <h3>Nenhum concurso adicionado</h3>
            }
            </div>
            </div>
            <div className={ style.form_button_box }>
              <motion.button
                whileTap={{scale:0.9}}
                onClick={ submitExaminations }
              >
                Enviar
              </motion.button>
              <motion.button
                whileTap={{scale:0.9}}
                onClick={() => {
                  setPersistenceList([]);
                  router.push('/admin/manage/examinations');
                }}
              >
                Cancelar
              </motion.button>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default withAuth(CreateExaminationsPage);