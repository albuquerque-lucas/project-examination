import { useState } from 'react';
import { Exam } from '@/app/lib/types/examTypes';
import UpdateInfoRow from './UpdateInfoRow';
import SubjectInfoRow from './SubjectInfoRow';
import style from '@/app/ui/admin/forms/updateExamForm.module.css';

type UpdateExamFormType = {
  exam: Exam | null;
};

export default function UpdateExamForm({ exam }: UpdateExamFormType) {

  return (
    <div className={style.update_form__container}>
      <h3>Info</h3>
      <div className={style.form_row}>
        <UpdateInfoRow
          inputType='text'
          exam={exam}
          fieldKey="title"
          label="Título"
        />
      </div>
      <div className={style.form_row}>
        <UpdateInfoRow
          inputType='text'
          exam={exam}
          fieldKey="description"
          label="Descrição"
        />
      </div>
      <div className={style.form_row}>
        <UpdateInfoRow
          inputType='date'
          exam={exam}
          fieldKey="date"
          label="Data"
        />
      </div>
      <div className={style.form_row}>
        <SubjectInfoRow
          exam={exam}
          fieldKey="subjects"
          label="Assuntos"
        />
      </div>
      {/* <div className={style.form_row}>
        <UpdateInfoRow
          inputType='text'
          exam={exam}
          fieldKey="topics"
          label="Tópicos"
        />
      </div> */}
    </div>
  );
}
