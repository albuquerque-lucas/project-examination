'use client';

import React, { useRef, useState, useEffect } from 'react';
import ExaminationSavingCard from "@/app/lib/components/ExaminationSavingCard/ExaminationSavingCard";
import withAuth from "@/app/lib/components/withAuth/withAuth"
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';
import { Examination } from '@/app/lib/types/examinationTypes';
import { motion } from 'framer-motion';

const CreateExaminationsPage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);

  useEffect(() => {
    console.log('PERSISTENCE LIST', persistenceList);
  }, [persistenceList]);

  const addToList = () => {
    const examination: Examination = {
      title: titleRef.current?.value ?? '',
      institution: institutionRef.current?.value ?? '',
      educational_level_id: educationalLevelRef.current?.value ?? ''
    }
    setPersistenceList([...persistenceList, examination]);
    console.log('NEW EXAMINATION', examination);
  }

  return (
    <div className={ style.examination_creation__content  }>
      <h1>Adicionar Concurso</h1>
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
                <option value="">Selecione o nível de escolaridade</option>
                <option value="3">Ensino Médio</option>
                <option value="4">Ensino Superior</option>
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
                      examination={ examination }
                    />
                  ))
                : <h3>Ainda não há concursos adicionados</h3>
            }
            </div>
            </div>
            <div className={ style.form_button_box }>
              <motion.button
                whileTap={{scale:0.9}}
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