import React, { RefObject, InputHTMLAttributes, useState } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface EditProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  ref: RefObject<HTMLInputElement>;
}

function EditProfileField({ label, type, ref, defaultValue }: EditProfileFieldProps) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={style.edit_field}>
      <label>{label}</label>
      {
        editMode ? (
          <div>
            <input ref={ref} type={type} defaultValue={defaultValue} />
            <motion.button
              whileTap={{ scale: 0.9, backgroundColor: '#36393e'}}
            >
              <IoCheckbox />
            </motion.button>
            <motion.button
              onClick={() => setEditMode(false)}
              whileTap={{ scale: 0.9, backgroundColor: '#36393e'}}
            >
              <MdCancelPresentation />
            </motion.button>
          </div>

        ) : (
          <div className={ style.default_value_field }>
            <p>{defaultValue}</p>
            <motion.button
              whileTap={{ scale: 0.9, backgroundColor: '#36393e'}}
              onClick={() => setEditMode(true)}
            >
              <IoCheckbox />
            </motion.button>
          </div>
        )
      }
    </div>
  );
}

EditProfileField.displayName = 'EditProfileField';

export default EditProfileField;