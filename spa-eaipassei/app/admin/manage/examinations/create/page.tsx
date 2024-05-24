'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ExaminationSavingCard from "@/app/lib/components/ExaminationSavingCard/ExaminationSavingCard";
import { useFetchEducationalLevels } from '@/app/lib/hooks/useFetchEducationalLevels';
import withAuth from "@/app/lib/components/withAuth/withAuth"
import { motion, AnimatePresence } from 'framer-motion';
import MessageBox from '@/app/lib/components/Message/MessageBox';
import { useCreateExaminations } from '@/app/lib/hooks/useCreateExaminations';
import { BiSolidLeftArrow } from "react-icons/bi";
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';

const CreateExaminationsPage = () => {
  const [persistenceListOpen, setPersistenceListOpen] = useState(false);

  const router = useRouter();

  const {
    educationalLevelsList,
  } = useFetchEducationalLevels();

  const {
    fileRef,
    titleRef,
    institutionRef,
    educationalLevelRef,
    persistenceList,
    flashMessage,
    setPersistenceList,
    addToList,
    submitExaminations,
    setFlashMessage,
  } = useCreateExaminations();
  
  
  useEffect(() => {

  }, [persistenceList, educationalLevelsList, flashMessage]);


  return (
    <div className={ style.examination_creation__content  }>
      <div className={ style.message_container }>
        <AnimatePresence>
          { flashMessage &&
            <MessageBox
              message={ flashMessage.message }
              setMessage={ setFlashMessage }
              type={ flashMessage.type }
            />
          }
        </AnimatePresence>
      </div>
      <div className={ style.creation_form__box }>
        <form action="" onSubmit={(e) => e.preventDefault() }>
          <section className={ style.creation_screen}>
            <div className={ style.utilities_buttons__container }>
                <button
                  onClick={() => router.push('/admin/manage/examinations')}
                >
                  Concursos
                </button>
                <button
                  onClick={() => router.push('/admin/manage/notices')}
                >
                  Editais
                </button>
            </div>
            <div className={ style.form_inputs__container }>
              <h3 className={ style.form_title }>
                Formulário de cadastro
              </h3>
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
                  educationalLevelsList.length > 0 &&
                  educationalLevelsList.map((level, index) => (
                    <option key={ index } value={ level.id }>{ level.name }</option>
                  ))
                }
              </select>

              <input
                type="file"
                name="file_path"
                ref={ fileRef }
                accept=".pdf"
              />

              <motion.button
                whileTap={{scale:0.9}}
                onClick={ addToList }
              >
                Adicionar
              </motion.button>
            </div>
          </section>
        </form>
      </div>
      <motion.div
        className={ style.presaved_examinations_screen }
        initial={{ x: '100%' }}
        animate={{ x: persistenceListOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', stiffness: 50 }} 
      >
        <div className={ style.presaved_screen__control }>
          <motion.button
            animate={{ rotate: persistenceListOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 50 }}
            onClick={() => setPersistenceListOpen(!persistenceListOpen)}
          >
            <BiSolidLeftArrow />
          </motion.button>
          {
            persistenceList.length > 0 && 
            <span>{ persistenceList.length }</span>
          }
        </div>
        <h3 className={ style.form_title }>Lista de envio</h3>
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
            : <h4>Nenhum concurso adicionado</h4>
        }
        </div>
        <div className={ style.form_button__box }>
          <motion.button
            whileTap={{scale:0.9}}
            onClick={ submitExaminations }
          >
            Enviar
          </motion.button>
          <motion.button
            whileTap={{scale:0.9}}
            onClick={() => { setPersistenceList([]) }}
          >
            Cancelar
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default withAuth(CreateExaminationsPage);