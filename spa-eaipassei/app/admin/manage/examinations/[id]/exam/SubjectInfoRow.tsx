import { useState, useContext, useEffect } from "react";
import { ExamsContext } from "@/app/lib/context/ExamsContext";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { Exam } from "@/app/lib/types/examTypes";
import { Subject } from "@/app/lib/types/subjectTypes";
import { getAllSubjects } from "@/app/lib/api/subjectsAPI";
import { getAllAreas } from "@/app/lib/api/StudyAreasAPI";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";
import style from '@/app/ui/admin/forms/updateExamForm.module.css';
import { StudyArea } from "@/app/lib/types/studyAreasTypes";

type SubjectInfoRowType = {
  exam: Exam | null;
  fieldKey: string;
  label: string;
};

export default function SubjectInfoRow({ exam, fieldKey, label }: SubjectInfoRowType) {
  const [updateMode, setUpdateMode] = useState(false);
  const [subjectsList, setSubjectsList] = useState<Subject[]>([]);


  const renderFieldValue = (value: any, fieldKey: string): string => {
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object' && 'title' in value[0]) {
        return (value as Subject[]).map(subject => subject.title).join(', ');
      }
      return value.join(', ');
    }
    return value?.toString() ?? '';
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!exam || !exam.examination_id) return;
      const examination = await getExaminationById(exam?.examination_id.toString());
      const areasIds = examination?.study_areas.map((area: StudyArea) => area.id);
      const params = {
        study_area_id: areasIds,
      };
      const subjects = await getAllSubjects(`${process.env.NEXT_PUBLIC_GET_SUBJECTS_BY_AREA}`, { params });
      setSubjectsList(subjects);
    }

    fetchSubjects();
  }, []);

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
        {
          subjectsList.map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.title}</option>
          ))
        }
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