import React from 'react';
import style from '@/app/ui/admin/cards/examinationSavingCard.module.css'

type Examination = {
  educational_level_id: number;
  title: string;
  active?: boolean;
  institution: string;
  registration_start_date?: string;
  registration_end_date?: string;
  exams_start_date?: string;
  exams_end_date?: string;
};

const ExaminationSavingCard: React.FC<Examination> = ({
  educational_level_id,
  title,
  active,
  institution,
  registration_start_date,
  registration_end_date,
  exams_start_date,
  exams_end_date
}) => {
  return (
    <div className={ style.saving_card__container }>
      <h4>{title}</h4>
      <p><span>Instituição:</span> {institution}</p>
      <p><span>ID do Nível Educacional:</span> {educational_level_id}</p>
      <p><span>Atividade:</span> {active ? 'Ativo' : 'Inativo'}</p>
      <p><span>Data de Início das Inscrições:</span> {registration_start_date || '--/--/----'}</p>
      <p><span>Data de Término das Inscrições:</span> {registration_end_date || '--/--/----'}</p>
      <p><span>Data de Início das Provas:</span> {exams_start_date || '--/--/----'}</p>
      <p><span>Data de Término das Provas:</span> {exams_end_date || '--/--/----'}</p>
    </div>
  );
};

export default ExaminationSavingCard;