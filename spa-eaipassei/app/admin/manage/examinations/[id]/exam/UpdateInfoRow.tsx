import { useState, useRef, useEffect } from "react";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { Exam, ExamUpdateRequest } from "@/app/lib/types/examTypes";
import { Subject } from "@/app/lib/types/subjectTypes";
import { format } from 'date-fns';
import { updateExam } from '@/app/lib/api/examsAPI';
import style from '@/app/ui/admin/forms/updateExamTextRow.module.css';

type UpdateModeKeys = 'title' | 'description' | 'date' | 'topics';
type UpdateInfoRowType = {
  exam: Exam | null;
  fieldKey: UpdateModeKeys;
  label: string;
  inputType: 'text' | 'date' | 'number';
};

export default function UpdateInfoRow({ exam, fieldKey, label, inputType }: UpdateInfoRowType) {
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  const [updateMode, setUpdateMode] = useState(false);
  const valueRef = useRef<HTMLInputElement | null>(null);

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

  const updateElement = async () => {
    console.log('Ref', valueRef.current?.value);
    console.log('FieldKey', fieldKey);
    const updateForm: ExamUpdateRequest = {
      id: exam?.id as number,
      [fieldKey]: valueRef.current?.value,
    };

    console.log('Update Form', updateForm);
    const result = await updateExam(updateForm);
    console.log('Resultado do update', result);
    if (result !== null) {
      setCurrentExam(result.exam);
      setUpdateMode(false);
    }
  }


  useEffect(() => {
    !currentExam && setCurrentExam(exam);
  }, [currentExam]);

  if (!updateMode) {
    return (
      <div
        className={`${style.row_item__container} ${style.display_mode__container}`}
        onDoubleClick={() => setUpdateMode(true)}
      >
        <span>
          {label}:
        </span>
        <span>
          {currentExam ? renderFieldValue(currentExam[fieldKey], fieldKey) : ''}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${style.row_item__container} ${style.edit_mode__container}`}
      onDoubleClick={() => setUpdateMode(false)}
    >
      <span>
        {label}:
      </span>
      <input
      ref={ valueRef }
      type={ inputType }
      placeholder={currentExam ? renderFieldValue(currentExam[fieldKey], fieldKey) : ''}
      />
      <span>
        <button
          className={style.confirm_edit__btn}
          onClick={ updateElement }
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
