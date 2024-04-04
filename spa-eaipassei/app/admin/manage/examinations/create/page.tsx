'use client';

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
              <h4>Formulário de adição</h4>
              <input
                type="text"
                placeholder='Título do concurso'
              />
              <input 
                type="text" 
                placeholder='Instituição responsável'
              />
              <select name="" id="">
                <option value="">Selecione o tipo de concurso</option>
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
              
            </div>
          </section>
          <section className={ style.form_button_box }>
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
          </section>
        </form>
      </div>
    </div>
  )
}

export default withAuth(CreateExaminationsPage);