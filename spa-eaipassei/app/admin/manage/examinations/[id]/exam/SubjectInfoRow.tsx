import { useState } from "react";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { Exam } from "@/app/lib/types/examTypes";
import { Subject } from "@/app/lib/types/subjectTypes";
import style from '@/app/ui/admin/forms/updateExamForm.module.css';

type SubjectInfoRowType = {
  exam: Exam | null;
  fieldKey: string;
  label: string;
};

export default function SubjectInfoRow({ exam, fieldKey, label }: SubjectInfoRowType) {
  const [updateMode, setUpdateMode] = useState(false);

  const renderFieldValue = (value: any, fieldKey: string): string => {
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object' && 'title' in value[0]) {
        return (value as Subject[]).map(subject => subject.title).join(', ');
      }
      return value.join(', ');
    }
    return value?.toString() ?? '';
  };

  if (!updateMode) {
    return (
      <div
        className={style.row_item__container}
        onDoubleClick={() => setUpdateMode(true)}
      >
        <span>
          {label}:
        </span>
        <span>
          { renderFieldValue(exam && exam.subjects, fieldKey) }
        </span>
      </div>
    );
  }

  return (
    <div
      className={style.row_item__container}
      onDoubleClick={() => setUpdateMode(prevState => !prevState)}
    >
      <span>
        {label}:
      </span>
      <select name="" id="">
        <option value="1">Lado 1</option>
        <option value="2">Lado 2</option>
      </select>
      <span>
      <button
          className={style.confirm_edit__btn}
        >
          <IoCheckbox />
        </button>
        <button
          className={style.cancel_edit__btn}
          onClick={() => setUpdateMode(false)}
        >
          <IoCloseSharp />
        </button>
      </span>
    </div>
  );
}