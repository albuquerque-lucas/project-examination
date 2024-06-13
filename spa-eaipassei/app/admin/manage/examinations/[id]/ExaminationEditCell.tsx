import { useState, MouseEvent, useContext } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { deleteStudyAreaFromExamination } from '@/app/lib/api/StudyAreasAPI';
import { updateExamination } from '@/app/lib/api/examinationsAPI';
import { EducationalLevel } from '@/app/lib/types/examinationTypes';
import { ExamsContext } from '@/app/lib/context/ExamsContext';
import { EditCellOptions } from '@/app/lib/types/componentsTypes';
import { motion } from 'framer-motion';
import { StudyArea } from '@/app/lib/types/studyAreasTypes';
import style from '@/app/ui/admin/cards/examinationEditCell.module.css';

interface ExaminationEditCellProps {
  title: string;
  value: string | number | StudyArea[];
  type: 'text' | 'number' | 'date' | 'select' | 'not-editable' | 'list';
  examinationId: number;
  fieldName: string;
  options?: EditCellOptions;
}

export default function ExaminationEditCell({
  title,
  value,
  type,
  examinationId,
  fieldName,
  options,
}: ExaminationEditCellProps) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editedValue, setEditedValue] = useState<string | number | StudyArea[]>(value);
  const { setDataLoaded } = useContext(ExamsContext);

  const handleDivClick = (e: MouseEvent<HTMLDivElement>) => {
    if (type !== 'not-editable') {
      setEditMode(!editMode);
    }
  };

  const dissociateStudyArea = async (e: MouseEvent<HTMLButtonElement>, areaId: number) => {
    e.stopPropagation();
    const result = await deleteStudyAreaFromExamination({ study_area_id: areaId, examination_id: examinationId });
    if (result) {
      setDataLoaded(true);
    }
  };

  const confirmEdit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const updatedData = {
      [fieldName]: editedValue,
    };
    const result = await updateExamination({ id: examinationId, ...updatedData });
    if (result) {
      setEditMode(false);
      setDataLoaded(true);
    }
  };

  const cancelEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setEditMode(false);
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement | HTMLInputElement | HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const renderValue = () => {
    if (Array.isArray(value)) {
      const list = value.map((item: StudyArea) => item.area);
      return list.join(', ');
    }
    return value;
  };

  const renderEditableInput = () => {
    if (type === 'select' && options?.educationalLevels) {
      return (
        <select
          defaultValue={value as string}
          onChange={(e) => setEditedValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          {options.educationalLevels.map((level: EducationalLevel) => (
            <option key={level.id} value={level.id}>
              {level.name}
            </option>
          ))}
        </select>
      );
    } else if (type === 'list' && Array.isArray(value)) {
      return (
        <ul className={style.items_list}>
          {value.map((item: StudyArea) => (
            <li key={item.id}>
              {item.area}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => dissociateStudyArea(e, item.id)}
              >
                <MdCancelPresentation />
              </motion.button>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <input
          type={type}
          placeholder={renderValue() as string}
          defaultValue={typeof value === 'string' ? value : ''}
          onChange={(e) => setEditedValue(e.target.value)}
          onClick={stopPropagation}
        />
      );
    }
  };

  return (
    <div className={style.detail_section__card} onDoubleClick={handleDivClick}>
      <h4>{`${title}:`}</h4>
      {editMode ? (
        <div className={style.examination_input__container}>
          {renderEditableInput()}
          {type !== 'list' && (
            <>
              <motion.button
                className={style.confirm_edit__btn}
                whileTap={{ scale: 0.9 }}
                onClick={confirmEdit}
              >
                <IoCheckbox />
              </motion.button>
              <motion.button
                className={style.cancel_edit__btn}
                whileTap={{ scale: 0.9 }}
                onClick={cancelEdit}
              >
                <MdCancelPresentation />
              </motion.button>
            </>
          )}
        </div>
      ) : (
        <p>{renderValue()}</p>
      )}
    </div>
  );
}
