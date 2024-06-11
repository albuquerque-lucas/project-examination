import { useState } from 'react';
import { Exam } from '@/app/lib/types/examTypes';
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import UpdateInfoRow from './UpdateInfoRow';
import style from '@/app/ui/admin/forms/updateExamForm.module.css';

type UpdateExamFormType = {
  exam: Exam | null;
}

export default function UpdateExamForm({ exam }: UpdateExamFormType) {
  const [updateMode, setUpdateMode] = useState({
    title: false,
    description: false,
    date: false,
    subjects: false,
    topics: false,
  });
  return (
    <div className={ style.update_form__container }>
      <h3>Info</h3>
      <div className={ style.form_row }>
        {
          updateMode.title ?
          <div
          className={ style.row_item__container }
          onDoubleClick={ () => setUpdateMode({ ...updateMode, title: false }) }
          >
            <span>
              Titulo:
            </span>
            <input type="text" />
            <span>
              <button
              className={ style.confirm_edit__btn }
              >
                <IoCheckbox />
              </button>
              <button

              className={ style.cancel_edit__btn }
              onClick={ () => setUpdateMode({ ...updateMode, title: false }) }
              >
                
                <IoCloseSharp />
              </button>
            </span>
          </div>
          :
          <div
          className={ style.row_item__container }
          onDoubleClick={ () => setUpdateMode({ ...updateMode, title: true }) }
          >
            <span>
              Titulo:
            </span>
            <span>
              { exam?.title }
            </span>
          </div>
        }
      </div>
    </div>
  )
}