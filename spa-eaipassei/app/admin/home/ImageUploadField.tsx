import React, { RefObject, forwardRef, useState } from 'react';
import { motion } from "framer-motion";
import { IoCheckbox } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface ImageUploadFieldProps {
  label: string;
}

const ImageUploadField = forwardRef<HTMLInputElement, ImageUploadFieldProps>(function({ label }, ref) {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className={ style.edit_field }>
      <label htmlFor="profile_img_input">{label}</label>
      {
        editMode ?
        <div className={ style.default_value_field }>
          <input ref={ref} type="file" />
          <div className={ style.buttons_box }>
            <motion.button
                whileTap={{ scale: 0.9, backgroundColor: '#36393e'}}
                onClick={() => setEditMode(true)}
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

        :

        <div className={ style.default_value_field }>
          <p>Editar { label }</p>
          <div className={ style.buttons_box }>
            <motion.button
                whileTap={{ scale: 0.9, backgroundColor: '#36393e'}}
                onClick={() => setEditMode(true)}
              >
                <IoCheckbox />
            </motion.button>
          </div>
        </div>
      }
    </div>
  );
});

ImageUploadField.displayName = 'ImageUploadField';

export default ImageUploadField;