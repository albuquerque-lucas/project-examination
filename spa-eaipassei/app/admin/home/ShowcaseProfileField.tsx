import React, { RefObject, InputHTMLAttributes, useState } from 'react';
import { MdCancelPresentation } from "react-icons/md";
import { IoCheckbox } from "react-icons/io5";
import { motion } from 'framer-motion';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface EditProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function ShowcaseProfileField({ label, type, defaultValue }: EditProfileFieldProps) {
  return (
    <div className={style.edit_field}>
      <label>{label}</label>
          <div className={ style.default_value_field  }>
            <p>
              { defaultValue }
            </p>
          </div>
    </div>
  );
}

export default ShowcaseProfileField;