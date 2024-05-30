import React, { RefObject, InputHTMLAttributes, useState, forwardRef } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { motion } from 'framer-motion';
import useUpdateUser from '@/app/lib/hooks/useUpdateUser';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface EditProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  defaultValue: string;
  userId: string | null;
  field: string;
}

const EditProfileField = forwardRef<HTMLInputElement, EditProfileFieldProps>(function({ label, type, defaultValue, userId, field }, ref) {
  const { updateUser } = useUpdateUser();
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={style.edit_field}>
      <label>{label}</label>
      {
        editMode ? (
          <div className={ style.default_value_field }>
            <input ref={ ref } type={ type } defaultValue={ defaultValue } />
            <div className={ style.buttons_box }>
              <motion.button
                whileTap={ { scale: 0.9, backgroundColor: '#36393e'} }
                onClick={ (event) => updateUser(event, userId, ref, field) }
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
          </div>

        ) : (
          <div className={ style.default_value_field }>
            <p>{defaultValue}</p>
            <div className={ style.buttons_box }>
              <motion.button
                whileTap={{ scale: 0.9, backgroundColor: '#36393e'}}
                onClick={() => setEditMode(true)}
              >
                <FiEdit />
              </motion.button>
            </div>
          </div>
        )
      }
    </div>
  );
});

EditProfileField.displayName = 'EditProfileField';

export default EditProfileField;