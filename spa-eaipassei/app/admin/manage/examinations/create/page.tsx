'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExaminationSavingCard from "@/app/lib/components/ExaminationSavingCard/ExaminationSavingCard";
import { useFetchEducationalLevels } from '@/app/lib/hooks/useFetchEducationalLevels';
import withAuth from "@/app/lib/components/withAuth/withAuth"
import { motion, AnimatePresence } from 'framer-motion';
import MessageBox from '@/app/lib/components/Message/MessageBox';
import { useCreateExaminations } from '@/app/lib/hooks/useCreateExaminations';
import layout from '@/app/ui/admin/layout.module.css';
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';

const CreateExaminationsPage = () => {
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
      <h1 className={ layout.admin_content__title }>Formulário</h1>
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
              />

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