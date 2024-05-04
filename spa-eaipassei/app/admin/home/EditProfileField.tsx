import React, { RefObject, InputHTMLAttributes, useState, forwardRef } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { motion } from 'framer-motion';
import useUpdateUser from '@/app/lib/hooks/useUpdateUser';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface EditProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  defaultValue: string;
  userId: string | null;
}

const EditProfileField = forwardRef<HTMLInputElement, EditProfileFieldProps>(function({ label, type, defaultValue, userId }, ref) {
  const { updateUser } = useUpdateUser();
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={style.edit_field}>
      <label>{label}</label>
      {
        editMode ? (
          <div className={ style.default_value_field }>
            <input ref={ ref } type={ type } defaultValue={ defaultValue } />
            <motion.button
              whileTap={ { scale: 0.9, backgroundColor: '#36393e'} }
              onClick={ () => updateUser(userId, ref) }
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
});

EditProfileField.displayName = 'EditProfileField';

export default EditProfileField;