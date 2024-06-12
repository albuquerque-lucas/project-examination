import { useState, useRef } from "react";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { Exam } from "@/app/lib/types/examTypes";
import { Subject } from "@/app/lib/types/subjectTypes";
import { format } from 'date-fns';
import style from '@/app/ui/admin/forms/updateExamTextRow.module.css';

type UpdateModeKeys = 'title' | 'description' | 'date' | 'topics';
type UpdateInfoRowType = {
  exam: Exam | null;
  fieldKey: UpdateModeKeys;
  label: string;
  inputType: 'text' | 'date' | 'number';
};

export default function UpdateInfoRow({ exam, fieldKey, label, inputType }: UpdateInfoRowType) {
  const [updateMode, setUpdateMode] = useState({
    title: false,
    description: false,
    date: false,
    topics: false,
  });

  const renderFieldValue = (value: any, fieldKey: UpdateModeKeys): string => {
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object' && 'title' in value[0]) {
        return (value as Subject[]).map(subject => subject.title).join(', ');
      }
      return value.join(', ');
    }
    if (fieldKey === 'date' && value) {
      const parsedDate = new Date(value);
      return format(parsedDate, 'dd/MM/yyyy');
    }
    return value?.toString() ?? '';
  };

  if (!updateMode[fieldKey]) {
    return (
      <div
        className={`${style.row_item__container} ${style.display_mode__container}`}
        onDoubleClick={() => setUpdateMode(prevState => ({ ...prevState, [fieldKey]: true }))}
      >
        <span>
          {label}:
        </span>
        <span>
          {exam ? renderFieldValue(exam[fieldKey], fieldKey) : ''}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${style.row_item__container} ${style.edit_mode__container}`}
      onDoubleClick={() => setUpdateMode(prevState => ({ ...prevState, [fieldKey]: false }))}
    >
      <span>
        {label}:
      </span>
      <input type={ inputType } defaultValue={exam ? renderFieldValue(exam[fieldKey], fieldKey) : ''} />
      <span>
        <button
          className={style.confirm_edit__btn}
        >
          <IoCheckbox />
        </button>
        <button
          className={style.cancel_edit__btn}
          onClick={() => setUpdateMode(prevState => ({ ...prevState, [fieldKey]: false }))}
        >
          <IoCloseSharp />
        </button>
      </span>
    </div>
  );
}
