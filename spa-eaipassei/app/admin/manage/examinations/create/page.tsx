'use client';

import ExaminationSavingCard from "@/app/lib/components/ExaminationSavingCard/ExaminationSavingCard";
import withAuth from "@/app/lib/components/withAuth/withAuth"
import style from '@/app/ui/admin/examinations/examinationsCreate.module.css';
import { motion } from 'framer-motion';

const CreateExaminationsPage = () => {
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
              />
              <input 
                type="text" 
                placeholder='Instituição responsável'
              />
              <select name="" id="">
                <option value="">Selecione o nível de escolaridade</option>
                <option value="">Ensino Médio</option>
                <option value="">Ensino Superior</option>
              </select>
              <motion.button
                whileTap={{scale:0.9}}
              >
                Adicionar
              </motion.button>
            </div>
            <div className={ style.presaved_examinations_screen }>
            <h3 className={ style.form_title }>Lista de persistência</h3>
            <div className={ style.list_display }>

              <ExaminationSavingCard
                title='Concurso 1'
                institution='Instituição 1'
                educational_level_id={1}
                active={true}
                registration_start_date='01/01/2021'
                registration_end_date='01/02/2021'
                exams_start_date='01/03/2021'
                exams_end_date='01/04/2021'
              />
              <ExaminationSavingCard
                title='Concurso 1'
                institution='Instituição 1'
                educational_level_id={1}
                active={true}
                registration_start_date='01/01/2021'
                registration_end_date='01/02/2021'
                exams_start_date='01/03/2021'
                exams_end_date='01/04/2021'
              />
              <ExaminationSavingCard
                title='Concurso 1'
                institution='Instituição 1'
                educational_level_id={1}
                active={true}
                registration_start_date='01/01/2021'
                registration_end_date='01/02/2021'
                exams_start_date='01/03/2021'
                exams_end_date='01/04/2021'
              />
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