import { useState, useEffect } from "react";
import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { Exam } from "@/app/lib/types/examTypes";
import { Subject } from "@/app/lib/types/subjectTypes";
import { getAllSubjects } from "@/app/lib/api/subjectsAPI";
import { getExaminationById } from "@/app/lib/api/examinationsAPI";
import { StudyArea } from "@/app/lib/types/studyAreasTypes";
import { updateExam, updateDetachSubject } from "@/app/lib/api/examsAPI";
import style from '@/app/ui/admin/forms/updateExamSelectRow.module.css';

type SubjectInfoRowType = {
  exam: Exam | null;
  fieldKey: string;
  label: string;
};

export default function SubjectInfoRow({ exam, fieldKey, label }: SubjectInfoRowType) {
  const [updateMode, setUpdateMode] = useState(false);
  const [subjectsList, setSubjectsList] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(null);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);

  const renderFieldValue = (value: any, fieldKey: string): string => {
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === 'object' && 'title' in value[0]) {
        return (value as Subject[]).map(subject => subject.title).join(', ');
      }
      return value.join(', ');
    }
    return value?.toString() ?? '';
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubjectId(Number(e.target.value));
  };

  const addSubject = async () => {
    if (!exam || !selectedSubjectId) return;
    const data = {
      id: exam.id,
      subject_id: selectedSubjectId,
    };
    const result = await updateExam(data);
    setCurrentExam(result.exam);
    console.log('Resultado de addSubject', result);
  };

  const detachSubject = async (subjectId: number) => {
    if (!exam) return;
    const result = await updateDetachSubject(exam.id, subjectId);
    console.log('Resultado de detach Subject', result);
    setCurrentExam(result.exam);
  };

  useEffect(() => {
    !currentExam && setCurrentExam(exam);
    const fetchSubjects = async () => {
      if (!exam || !exam.examination_id) return;
      const examination = await getExaminationById(exam.examination_id.toString());
      const areasIds = examination?.study_areas.map((area: StudyArea) => area.id);
      const params = {
        study_area_id: areasIds,
      };
      const subjects = await getAllSubjects(`${process.env.NEXT_PUBLIC_GET_SUBJECTS_BY_AREA}`, { params });
      setSubjectsList(subjects);
    }

    fetchSubjects();
  }, [currentExam]);

  let availableSubjects: Subject[] = [];
  if (subjectsList !== null) {
      availableSubjects = subjectsList.filter(subject => 
        currentExam && currentExam.subjects && !currentExam?.subjects.some(examSubject => examSubject.id === subject.id)
      );

  }

  if (!updateMode) {
    return (
      <div
        className={`${style.row_item__container} ${style.display_mode__container}`}
        onDoubleClick={() => setUpdateMode(true)}
      >
        <span className={style.item_container__firstChild}>
          {label}:
        </span>
        <span className={style.item_container__lastChild}>
          {currentExam && currentExam.subjects && currentExam.subjects.length}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${style.row_item__container} ${style.edit_mode__container}`}
      onDoubleClick={() => setUpdateMode(prevState => !prevState)}
    >
      <div className={`${style.display_field} ${style.edit_field}`}>
        {
          currentExam && currentExam.subjects?.map((subject) => {
            return (
              <span key={subject.id} className={style.edit_row}>
                <p>{subject.title}</p>
                <button onClick={() => detachSubject(subject.id)}>
                  <IoCloseSharp />
                </button>
              </span>
            );
          })
        }
      </div>
      <div className={`${style.select_field} ${style.edit_field}`}>
        <select onChange={handleSubjectChange}>
          {
            availableSubjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.title}</option>
            ))
          }
        </select>
        <span>
          <button
            className={style.confirm_edit__btn}
            onClick={addSubject}
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
    </div>
  );
}
