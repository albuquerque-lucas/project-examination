import React from 'react';
import { Examination } from '../../types/examinationTypes';
import style from '@/app/ui/admin/cards/examinationSavingCard.module.css'

type ExaminationSavingCardProps = {
  examination: Examination;
};

const ExaminationSavingCard: React.FC<ExaminationSavingCardProps> = ({ examination }) => {
  const {
    educational_level_id,
    title,
    active,
    institution,
    registration_start_date,
    registration_end_date,
    exams_start_date,
    exams_end_date
  } = examination;

  return (
    <div className={ style.saving_card__container }>
      <h4>{title}</h4>
      <p><span>Instituição:</span> {institution}</p>
      {/* <div className="hidden_atributes">
        <p><span>ID do Nível Educacional:</span> {educational_level_id}</p>
        <p><span>Atividade:</span> {active ? 'Ativo' : 'Inativo'}</p>
        <p><span>Data de Início das Inscrições:</span> {registration_start_date || '--/--/----'}</p>
        <p><span>Data de Término das Inscrições:</span> {registration_end_date || '--/--/----'}</p>
        <p><span>Data de Início das Provas:</span> {exams_start_date || '--/--/----'}</p>
        <p><span>Data de Término das Provas:</span> {exams_end_date || '--/--/----'}</p>
      </div> */}
    </div>
  );
};

export default ExaminationSavingCard;