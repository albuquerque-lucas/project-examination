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
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';

const CreateExaminationsPage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);
  const router = useRouter();
  const { setLoaded, educationalLevels, setEducationalLevels, flashMessage, setFlashMessage } = useContext(ExaminationsContext);
  const { getAll } = educationalLevelsApi;

  
  const addToList = () => {
    const title = titleRef.current?.value ?? '';
    const institution = institutionRef.current?.value ?? '';
    const educational_level_id = educationalLevelRef.current?.value ?? '';
    
    if (!title || !institution || !educational_level_id) {
      setFlashMessage('Os campos do formulário não podem estar vazios.');
      return;
    }
    
    const examination: Examination = {
      title,
      institution,
      educational_level_id
    }

    const doesItemExist = persistenceList.some(item => 
      item.title === title && 
      item.institution === institution && 
      item.educational_level_id === educational_level_id
    );
  
    if (doesItemExist) {
      setFlashMessage('Um item com os mesmos dados já existe na lista.');
      return;
    }
  
    setPersistenceList([...persistenceList, examination]);
  }

  const submitExaminations = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const response = await createMany(persistenceList);
      setFlashMessage(response.data.message);
      if (response.status === 409) {
        setFlashMessage(response.data.message);
        console.log('CONFLITO', response.data.message);
      };

      if (response.status === 201) {
        setFlashMessage(response.data.message);
        console.log('RESPONSE CREATION', response.data.message)
        setLoaded(false);
        router.push('/admin/manage/examinations');
      };
    } catch (error) {
      console.error('ERROR', error);
    }
  }
  
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