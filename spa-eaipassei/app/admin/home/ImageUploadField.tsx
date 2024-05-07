import React, { forwardRef, useState } from 'react';
import { motion } from "framer-motion";
import { IoCheckbox } from "react-icons/io5";
import { MdCancelPresentation } from "react-icons/md";
import useUpdateUser from '@/app/lib/hooks/useUpdateUser';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface ImageUploadFieldProps {
  label: string;
  userId: string | null;
}

const ImageUploadField = forwardRef<HTMLInputElement, ImageUploadFieldProps>(function({ label, userId }, ref) {
  const { updateUserImage } = useUpdateUser();
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
                onClick={(event) => updateUserImage(event, userId, ref, 'prorfile_img_input')}
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