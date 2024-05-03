import React, { RefObject } from 'react';
import style from '@/app/ui/admin/home/EditProfileField.module.css';

interface ImageUploadFieldProps {
  label: string;
  ref: RefObject<HTMLInputElement>;
}

function ImageUploadField({ label, ref }: ImageUploadFieldProps) {
  return (
    <div className={`${style.panel_case__edit_profile_field} ${style.panel_case__edit_profile__image}`}>
      <label htmlFor="profile_img_input">{label}</label>
      <input ref={ref} type="file" />
    </div>
  );
}

ImageUploadField.displayName = 'ImageUploadField';

export default ImageUploadField;