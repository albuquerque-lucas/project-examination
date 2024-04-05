'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ExaminationSavingCard from "@/app/lib/components/ExaminationSavingCard/ExaminationSavingCard";
import withAuth from "@/app/lib/components/withAuth/withAuth"
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';
import { Examination } from '@/app/lib/types/examinationTypes';
import { createMany } from '@/app/lib/api/examinationsAPI';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const CreateExaminationsPage = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const institutionRef = useRef<HTMLInputElement>(null);
  const educationalLevelRef = useRef<HTMLSelectElement>(null);
  const [persistenceList, setPersistenceList] = useState<Examination[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log('Lista de persistência atualizada:', persistenceList);
  }, [persistenceList]);

  const addToList = () => {
    const examination: Examination = {
      title: titleRef.current?.value ?? '',
      institution: institutionRef.current?.value ?? '',
      educational_level_id: educationalLevelRef.current?.value ?? ''
    }
    setPersistenceList([...persistenceList, examination]);
  }

  const submitExaminations = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await toast.promise(
        createMany(persistenceList),
        {
          pending: 'Enviando para o banco de dados...',
          success: 'Os registros foram salvos no banco de dados.',
          error: 'Falha ao enviar os registros.'
        }
      );
      router.push('/admin/manage/examinations');
    } catch (error) {
      console.error('ERROR', error);
    }
  }

  return (
    <div className={ style.examination_creation__content  }>
      <h1>Formulário</h1>
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