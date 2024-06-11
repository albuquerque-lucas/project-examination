import { IoCloseSharp, IoCheckbox } from "react-icons/io5";
import { Exam } from "@/app/lib/types/examTypes";
import style from '@/app/ui/admin/forms/updateExamForm.module.css';

type UpdateInfoRowType = {
  exam: Exam | null;
  updateMode: { [key: string]: boolean };
  setMode: (mode: { [key: string]: boolean }) => void;
};

export default function UpdateInfoRow({ updateMode, setMode, exam }: UpdateInfoRowType) {
  if (!updateMode.title) {
    return (
      <div
        className={style.row_item__container}
        onDoubleClick={() => setMode({ ...updateMode, title: true })}
      >
        <span>
          Titulo:
        </span>
        <span>
          {exam?.title}
        </span>
      </div>
    );
  }

  return (
    <div
      className={style.row_item__container}
      onDoubleClick={() => setMode({ ...updateMode, title: false })}
    >
      <span>
        Titulo:
      </span>
      <input type="text" />
      <span>
        <button
          className={style.confirm_edit__btn}
        >
          <IoCheckbox />
        </button>
        <button
          className={style.cancel_edit__btn}
          onClick={() => setMode({ ...updateMode, title: false })}
        >
          <IoCloseSharp />
        </button>
      </span>
    </div>
  );
}
